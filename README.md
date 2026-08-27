# Playwright Automation Framework

Playwright and TypeScript test automation project covering SauceDemo UI workflows, API testing, API mocking, and iframe interactions.

## Prerequisites

- Node.js 20 or later
- npm
- Playwright browser binaries
- Docker (optional, for containerized execution)

## Installation

Install dependencies:

```powershell
npm ci
```

Install Playwright browsers if they are not already installed:

```powershell
npx playwright install
```

## Environment configuration

Copy `.env.example` to `.env` and provide the required values:

```text
TEST_ENV=local
BASE_URL=https://www.saucedemo.com
SAUCE_USERNAME=your_saucedemo_username
SAUCE_PASSWORD=your_saucedemo_password
```

PowerShell:

```powershell
Copy-Item .env.example .env
```

The global setup validates `BASE_URL`, `SAUCE_USERNAME`, and `SAUCE_PASSWORD` before tests run. Environment files are excluded from version control, so never commit real credentials.

## Project structure

```text
.
├── fixtures/             Reusable Playwright fixtures
├── pages/                Page Object Model classes
├── test-data/             Local HTML pages for iframe and API mocking tests
├── tests/
│   ├── api/               API and authentication tests
│   └── ui/                Browser-based UI and visual tests
├── global-setup.ts        Environment validation
├── playwright.config.ts   Test runner and browser configuration
├── Dockerfile             Playwright container image
└── docker-compose.yml     Containerized test execution
```

## Test coverage

### UI tests

- Valid and invalid SauceDemo login
- Adding a product to the shopping cart
- Successful checkout
- Checkout validation errors
- Interacting with an iframe
- Mocking a user API response and verifying the rendered result
- Comparing a deterministic local page with a Chromium visual baseline

### API tests

- GET users from JSONPlaceholder
- POST a new user to JSONPlaceholder
- Successful and unsuccessful authentication responses using route mocking

## Running tests

Run the complete suite:

```powershell
npm test
```

Run tests in a specific browser:

```powershell
npm run test:chromium
npm run test:firefox
npm run test:webkit
npm run test:mobile
```

Other useful commands:

```powershell
npm run test:list   # List discovered tests without running them
npm run test:ui     # Open Playwright UI mode
npm run report      # Open the latest HTML report
```

The configured browser projects are Chromium, Firefox, WebKit, and iPhone 17 Pro Max emulation. Tests run headlessly by default. On failure, Playwright retains screenshots, traces, and videos for diagnosis.

### QA environment

To run against the values in `.env.qa` from PowerShell:

```powershell
$env:ENV_FILE='.env.qa'
npm test
Remove-Item Env:ENV_FILE
```

The configuration defaults to `.env` when `ENV_FILE` is not set.

### Visual baselines

The visual test runs in Chromium and compares the local API demo page with its committed screenshot baseline. If the page intentionally changes, regenerate the baseline with:

```powershell
npx playwright test tests/ui/visual.spec.ts --project=chromium --update-snapshots
```

## Docker execution

Build and run the test container:

```powershell
docker compose up --build
```

The container uses the official Playwright image and mounts the generated test report and test results into the project directory. Credentials are supplied at runtime through `.env` and are excluded from the Docker build context.

## Test design

The project uses the Page Object Model to keep selectors and user actions in `pages/`. The custom `loggedInPage` fixture in `fixtures/test.fixture.ts` performs the SauceDemo login automatically for tests that require an authenticated session. API tests use Playwright's request fixture, while mocked responses use route interception so they remain deterministic. Visual coverage is limited to Chromium because screenshot rendering varies between browser engines.
