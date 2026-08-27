import dotenv from 'dotenv'

export default async function globalSetup() {

  dotenv.config({ path: process.env.ENV_FILE || '.env' })

  console.log('Running global setup...')

  if (!process.env.SAUCE_USERNAME) {
    throw new Error('SAUCE_USERNAME is not defined')
  }

  if (!process.env.SAUCE_PASSWORD) {
    throw new Error('SAUCE_PASSWORD is not defined')
  }

  if (!process.env.BASE_URL) {
    throw new Error('BASE_URL is not defined')
  }

  console.log('Environment variables validated successfully')
}