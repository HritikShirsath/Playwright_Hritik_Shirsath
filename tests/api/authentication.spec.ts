import { test, expect } from '../../fixtures/mock-api.fixture'

test.describe('API Authentication Tests', () => {
  test('authenticates valid credentials', async ({ request, apiBaseURL }) => {
    const response = await request.post(`${apiBaseURL}/api/login`, {
      data: { username: 'testuser', password: 'password123' },
    })

    expect(response.status()).toBe(200)
    await expect(response.json()).resolves.toEqual({ token: 'test-token-123' })
  })

  test('rejects invalid credentials', async ({ request, apiBaseURL }) => {
    const response = await request.post(`${apiBaseURL}/api/login`, {
      data: { username: 'wrong-user', password: 'wrong-password' },
    })

    expect(response.status()).toBe(401)
    await expect(response.json()).resolves.toEqual({
      message: 'Invalid credentials',
    })
  })
})
