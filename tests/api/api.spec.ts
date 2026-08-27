import { test, expect } from '@playwright/test'

test.describe('API Tests', () => {

  test('GET API should return users', async ({ request }) => {

    const response = await request.get(
      'https://jsonplaceholder.typicode.com/users'
    )

    expect(response.status()).toBe(200)

    const users = await response.json()

    expect(users.length).toBeGreaterThan(0)

    expect(users[0]).toHaveProperty('id')
    expect(users[0]).toHaveProperty('name')
    expect(users[0]).toHaveProperty('email')
  })


  test('POST API should create a user', async ({ request }) => {

    const response = await request.post(
      'https://jsonplaceholder.typicode.com/users',
      {
        data: {
          name: 'John Doe',
          username: 'johndoe',
          email: 'john@example.com',
        },
      }
    )

    expect(response.status()).toBe(201)

    const responseBody = await response.json()

    expect(responseBody.name).toBe('John Doe')
    expect(responseBody.username).toBe('johndoe')
    expect(responseBody.email).toBe('john@example.com')
  })

})