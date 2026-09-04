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

Environment files are excluded from version control, so never commit real credentials. SauceDemo credentials are validated only when a test requests the `loggedInPage` fixture; API, iframe, and visual tests remain runnable without them.

## Project structure

```text
.
├── fixtures/             Reusable Playwright fixtures
├── pages/                Page Object Model classes
├── test-data/             Local HTML pages for iframe and API mocking tests
├── tests/
│   ├── api/               API and authentication tests
│   └── ui/                Browser-based UI and visual tests
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

- GET and POST user requests against a deterministic local API server
- Successful and unsuccessful authentication responses from that local server

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
npm run test:api
npm run test:visual
```

Other useful commands:

```powershell
npm run test:list   # List discovered tests without running them
npm run test:ui     # Open Playwright UI mode
npm run report      # Open the latest HTML report
npm run typecheck   # Check TypeScript without emitting files
npm run lint        # Run ESLint
npm run format:check # Verify Prettier formatting
```

The UI suite runs in Chromium, Firefox, WebKit, and iPhone 17 Pro Max emulation. API tests run once in a dedicated project because they do not need cross-browser rendering coverage. Tests run headlessly by default. On failure, Playwright retains screenshots, traces, and videos for diagnosis.

### Firefox on Windows

Some Windows security configurations prevent Firefox from creating its sandboxed content process. The Firefox project applies a Windows-only compatibility setting that disables Firefox content and GPU sandboxing for local automated tests. It is not applied on CI/Linux or to other browsers. If the local security policy is adjusted to permit Firefox child processes, remove this workaround.

### QA environment

To run against the values in `.env.qa` from PowerShell:

```powershell
$env:ENV_FILE='.env.qa'
npm test
Remove-Item Env:ENV_FILE
```

The configuration defaults to `.env` when `ENV_FILE` is not set.

### Visual baselines

The visual test runs only in Chromium and compares the local API demo page with its committed screenshot baseline. Its viewport, color scheme, scale, animations, and caret behavior are fixed so screenshots do not vary by machine defaults. If the page intentionally changes, regenerate the baseline with:

```powershell
npx playwright test tests/ui/visual.spec.ts --project=chromium --update-snapshots
```

## Docker execution

Build and run the test container:

```powershell
docker compose up --build
```

The container uses the matching official Playwright image and runs as its non-root `pwuser`. It mounts the generated HTML report, test results, and Allure results into the project directory. Credentials are supplied at runtime through `.env` and are excluded from the Docker build context.

## Test design

The project uses the Page Object Model to keep selectors and user actions in `pages/`. The custom `loggedInPage` fixture in `fixtures/test.fixture.ts` performs the SauceDemo login automatically for tests that require an authenticated session. API tests use Playwright's request fixture with a local in-process server, so they remain deterministic and do not rely on public services. Visual coverage is limited to Chromium because screenshot rendering varies between browser engines.
