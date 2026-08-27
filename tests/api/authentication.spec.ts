import { test, expect } from '@playwright/test';

test.describe('API Authentication Tests', () => {

  test('should authenticate user with valid credentials', async ({ page }) => {

    await page.goto('/');

    await page.route('**/api/login', async route => {

      const request = route.request();
      const body = request.postDataJSON();

      if (
        body.username === 'testuser' &&
        body.password === 'password123'
      ) {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            token: 'test-token-123',
          }),
        });
      } else {
        await route.fulfill({
          status: 401,
          contentType: 'application/json',
          body: JSON.stringify({
            message: 'Invalid credentials',
          }),
        });
      }
    });

    const response = await page.evaluate(async () => {

      const response = await fetch('/api/login', {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          username: 'testuser',
          password: 'password123',
        }),
      });

      return {
        status: response.status,
        body: await response.json(),
      };
    });

    expect(response.status).toBe(200);
    expect(response.body.token).toBe('test-token-123');
  });


  test('should reject invalid credentials', async ({ page }) => {

    await page.goto('/');

    await page.route('**/api/login', async route => {

      await route.fulfill({
        status: 401,
        contentType: 'application/json',
        body: JSON.stringify({
          message: 'Invalid credentials',
        }),
      });
    });

    const response = await page.evaluate(async () => {

      const response = await fetch('/api/login', {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          username: 'wrong-user',
          password: 'wrong-password',
        }),
      });

      return {
        status: response.status,
        body: await response.json(),
      };
    });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Invalid credentials');
  });

});