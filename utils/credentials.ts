export function sauceCredentials() {
  const username = process.env.SAUCE_USERNAME
  const password = process.env.SAUCE_PASSWORD

  if (!username || !password) {
    throw new Error(
      'SAUCE_USERNAME and SAUCE_PASSWORD are required by tests that log in to SauceDemo.',
    )
  }

  return { username, password }
}
