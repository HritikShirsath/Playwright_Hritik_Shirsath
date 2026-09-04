import { test as base, expect } from '@playwright/test'
import { createServer, type Server } from 'node:http'
import type { AddressInfo } from 'node:net'

type ApiFixtures = {
  apiBaseURL: string
}

function json(
  response: import('node:http').ServerResponse,
  status: number,
  body: unknown,
) {
  response.writeHead(status, { 'content-type': 'application/json' })
  response.end(JSON.stringify(body))
}

function readBody(
  request: import('node:http').IncomingMessage,
): Promise<Record<string, unknown>> {
  return new Promise((resolve, reject) => {
    let data = ''
    request.setEncoding('utf8')
    request.on('data', (chunk) => {
      data += chunk
    })
    request.on('end', () => resolve(data ? JSON.parse(data) : {}))
    request.on('error', reject)
  })
}

function startMockApi(): Promise<Server> {
  const server = createServer(async (request, response) => {
    if (request.method === 'GET' && request.url === '/users') {
      return json(response, 200, [
        { id: 1, name: 'Test User', email: 'test@example.com' },
      ])
    }

    const body = await readBody(request)

    if (request.method === 'POST' && request.url === '/users') {
      return json(response, 201, { id: 101, ...body })
    }

    if (request.method === 'POST' && request.url === '/api/login') {
      return body.username === 'testuser' && body.password === 'password123'
        ? json(response, 200, { token: 'test-token-123' })
        : json(response, 401, { message: 'Invalid credentials' })
    }

    return json(response, 404, { message: 'Not found' })
  })

  return new Promise((resolve) =>
    server.listen(0, '127.0.0.1', () => resolve(server)),
  )
}

export const test = base.extend<ApiFixtures>({
  // Playwright fixtures require an object-destructuring first argument.
  // eslint-disable-next-line no-empty-pattern
  apiBaseURL: async ({}, use) => {
    const server = await startMockApi()
    const { port } = server.address() as AddressInfo
    await use(`http://127.0.0.1:${port}`)
    await new Promise<void>((resolve, reject) =>
      server.close((error) => (error ? reject(error) : resolve())),
    )
  },
})

export { expect }
