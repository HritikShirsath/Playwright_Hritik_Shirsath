import { test, expect } from '../../fixtures/mock-api.fixture'

test.describe('API Tests', () => {
  test('GET users returns the expected schema', async ({
    request,
    apiBaseURL,
  }) => {
    const response = await request.get(`${apiBaseURL}/users`)

    expect(response.status()).toBe(200)
    await expect(response).toBeOK()
    await expect(response.json()).resolves.toEqual([
      { id: 1, name: 'Test User', email: 'test@example.com' },
    ])
  })

  test('POST users creates a user', async ({ request, apiBaseURL }) => {
    const payload = {
      name: 'John Doe',
      username: 'johndoe',
      email: 'john@example.com',
    }
    const response = await request.post(`${apiBaseURL}/users`, {
      data: payload,
    })

    expect(response.status()).toBe(201)

    await expect(response.json()).resolves.toEqual({ id: 101, ...payload })
  })
})
