# Playwright MCP Test Generation Guide

This guide will help you get started with using Playwright MCP (Model-Controlled Playwright) to generate high-quality, maintainable test cases for your project. It is designed for users who are new to Playwright MCP and want to automate the creation of robust test suites.

---

## Pre-requisites

- Node.js v24 or higher

- Playwright installed (npm install @playwright/test)

- A configured test data factory and shared helpers in the project

- Access to Playwright Model Context Protocol (MCP) via CLI or Cursor

- Configured Playwright Model Context Protocol in your IDE(Cursor/Windsurf)(Refer to official documentation of Microsft's Playwright MCP).


## Configure Environment Variables

Configuring the .env file is crucial for running test cases. Here is the attached [sample.env](sample.env) which includes the key variables to be added.

## Configure Playwright testing library

After installing, we need to configure the playwright environment in the local repository. Here are the steps:
The easiest way to get started with Playwright Test is to run the init command.

```Shell
# Run from your project's root directory
npm init playwright@latest
```
This will create a configuration file, optionally add examples, a GitHub Action workflow and a first test example.spec.ts. You can now jump directly to writing assertions section. 
Make sure to name the subdirectory to test instead of e2e

Add dependency and install browsers.

```Shell
npm i -D @playwright/test
# install supported browsers
npx playwright install
```

## 2. How to Use Playwright MCP

### **Step 1: Prepare Your Prompt**
Use the following template prompt to instruct Playwright MCP to generate test cases for a specific feature. Replace `{target}` with your target feature as needed, and add more steps that are required to generate tests for the feature.

```
Generate playwright test cases for the {target} feature, covering positive, negative, security, performance, UI/UX, and data-driven scenarios.

First visit the url thats defined in the .env file. The test cases should be made by analyzing the DOM elements and their interactions instead of taking a snapshot. These steps should be done using Playwright MCP tools.

Strictly follow the project’s modular test structure, steps and best practices as outlined below:

Try to avoid external libraries as much as possible. Use methods known to playwright library for assertions and other operations.

1. Generating Page Object Model:
- Generate the Page Object Model for all UI interactions which should strictly define the structure.
- Every function defined in Page Object Model must have parameters. Nothing should be hardcoded. Especially any environment variable must not be hardcoded.
- Utilize any existing Page Object Model for recurring UI interactions (e.g. for edit user feature, utilize already made login Page Object Model if it exists for login instead of regenerating whole login logic code, then generate logic for testing edit user feature.)

2. Test Data and Shared helpers:
- Use shared helpers and test data factories for setup and data management. No hard coded data for testing.
- Test data factories should involve different types of data(Valid, Invalid, Random) for different scenarios of the same feature.

3. Generating Test Files:
- Generate seperate files for different scenarios of the same feature.
- For every files there should be a test.describe block that has a clear description. Within that block there should be multiple test blocks that have clear descriptions and tags.
- Strictly use tags (e.g., [@smoke], [@regression], [@edge], [@security], [@ui], [@performance], [@data] etc.) in test titles(strictly this pattern -> e.g. test([@ui][@smoke] Login form fields have correct labels and roles)) for filtering and reporting. Test titles should have atleast 1 tag, 2 tags are not preferred.
- Strictly avoid adding tags to test.describe blocks.
- Strictly use resilient selectors (like getByRole, getByLabel, getByTestId) for stability and accessibility. Preferably use getByRole and getByTestId selectors.
- Include test assertions for all the test cases wherever required.
- Ensure comprehensive coverage of edge cases.
- Test files, page objects and data factories should be placed under a single subdirectory(/tests/{feature}/).

4. Test Data Cleanup:
- Clean up any test data after tests run.

5. Environment Variables:
- Include accessibility checks if applicable.
- Use sample.env or .env file for seeing environment variables or valid data.
- Strictly import .env file in test files and not any other files.
```

#### **Customizable Fields:**
- **Feature Name:** Change `{target}` to any feature you want to generate tests for (e.g., "register", "add job", "edit profile").
- **Test Types:** You can specify which types of tests to generate (e.g., omit performance or UI/UX if not needed).

---

## 3. Expected Output

- **Test Files:** Playwright MCP will generate test files in the appropriate subdirectory (e.g., `tests/login/`, `tests/addjob/`).
- **Test Structure:** Each file will follow the modular structure, using the Page Object Model and shared helpers/factories.
- **Test Coverage:** The output will include positive, negative, security, performance, UI/UX, and data-driven scenarios, each tagged for easy filtering.
- **Comments & Naming:** Tests will have clear, descriptive names and comments explaining their purpose.
- **Selectors:** Resilient selectors (getByRole, getByLabel, getByTestId) will be used for stability and accessibility.

---

**Note: Always go through the code first after the code generation since it might be inconsistent and most likely will throw an error.**

## 4. Important Notes & Best Practices

- **Reuse Page Objects:** Always use existing Page Object Models for recurring UI interactions to avoid code duplication.
- **No Hardcoded Data:** Use shared helpers and test data factories for all test data. Avoid hardcoding values in your tests.
- **Assertions:** Assert both UI changes and network responses where applicable.
- **Tags:** Use tags like [@smoke], [@regression], [@edge], [@security], [@ui], [@performance], [@data] in test titles for filtering and reporting.
- **Accessibility:** Include accessibility checks (e.g., using `expect(page).toHaveAccessibleName()`) if relevant.
- **Test Data Cleanup:** Ensure any data created during tests is cleaned up after the test run.
- **Edge Cases:** Cover edge cases and error scenarios, not just the happy path.

---

## 5. What is Valid Data for Positive Test Cases?

Example:
For the **login** feature, valid data for positive test cases typically includes:
- A registered user email that exists in the system.
- The correct password associated with that email.
- The account is active and not locked or disabled.
- The email and password fields are filled in with valid formats (e.g., a properly formatted email address).

**Example:**
- Email: `user@example.com` (already registered)
- Password: `ValidPassword123!`

> **Note:** For other features, define what constitutes valid data in the context of that feature (e.g., for registration, valid data might be a unique email, strong password, and required profile fields filled).

## 6. What to Watch Out For

- **Selector Stability:** Avoid brittle selectors (e.g., based on CSS classes or text that may change).
- **Test Data Isolation:** Ensure tests do not depend on each other and can run independently.
- **Environment:** Make sure your test environment is set up with the necessary data and configurations.
- **Review Output:** Always review generated tests for accuracy and completeness before running them in CI/CD.

---

## 7. Example Prompt (Copy & Use)

```
Generate playwright test cases for the "login" feature, covering positive, negative, security, performance, UI/UX, and data-driven scenarios.

First visit the url thats defined in the .env file. The test cases should be made by analyzing the DOM elements and their interactions instead of taking a snapshot. These steps should be done using Playwright MCP tools.

Strictly follow the project’s modular test structure, steps and best practices as outlined below:

Try to avoid external libraries as much as possible. Use methods known to playwright library for assertions and other operations.

1. Generating Page Object Model:
- Generate the Page Object Model for all UI interactions which should strictly define the structure.
- Every function defined in Page Object Model must have parameters. Nothing should be hardcoded. Especially any environment variable must not be hardcoded.
- Utilize any existing Page Object Model for recurring UI interactions (e.g. for edit user feature, utilize already made login Page Object Model if it exists for login instead of regenerating whole login logic code, then generate logic for testing edit user feature.)

2. Test Data and Shared helpers:
- Use shared helpers and test data factories for setup and data management. No hard coded data for testing.
- Test data factories should involve different types of data(Valid, Invalid, Random) for different scenarios of the same feature.

3. Generating Test Files:
- Generate seperate files for different scenarios of the same feature.
- For every files there should be a test.describe block that has a clear description. Within that block there should be multiple test blocks that have clear descriptions and tags.
- Strictly use tags (e.g., [@smoke], [@regression], [@edge], [@security], [@ui], [@performance], [@data] etc.) in test titles(strictly this pattern -> e.g. test([@ui][@smoke] Login form fields have correct labels and roles)) for filtering and reporting. Test titles should have atleast 1 tag, 2 tags are not preferred.
- Strictly avoid adding tags to test.describe blocks.
- Strictly use resilient selectors (like getByRole, getByLabel, getByTestId) for stability and accessibility. Preferably use getByRole and getByTestId selectors.
- Include test assertions for all the test cases wherever required.
- Ensure comprehensive coverage of edge cases.
- Test files, page objects and data factories should be placed under a single subdirectory(/tests/{feature}/).

4. Test Data Cleanup:
- Clean up any test data after tests run.

5. Environment Variables:
- Include accessibility checks if applicable.
- Use sample.env or .env file for seeing environment variables or valid data.
- Strictly import .env file in test files and not any other files.

```

---

## 8. Running the test cases

By default tests will be run on all 3 browsers, Chromium, Firefox and WebKit using several workers. This can be configured in the [playwright.config file](playwright.config.ts). Tests are run in headless mode meaning no browser will open up when running the tests. Results of the tests and test logs will be shown in the terminal.

```Shell
#runs all the .ts test scripts created
npx playwright test
```

To visually see how Playwright interacts with the website run the below command:

```Shell
npx playwright test --headed
```

### Run specific test cases

To run a single test file, pass in the name of the test file that you want to run.

```Shell
npx playwright test yourtest.spec.ts
```
To run a set of test files from different directories, pass in the names of the directories that you want to run the tests in.

```Shell
npx playwright test tests/todo-page/ tests/landing-page/
```
To run files that have ```landing``` or ```login``` in the file name, simply pass in these keywords to the CLI.

```Shell
npx playwright test landing login
```
To run a test with a specific title, use the -g flag followed by the title of the test.

```Shell
npx playwright test -g "add a todo item"
```

### Generate Report

If all the test cases are passed, run the below command to generate report of the test cases.

```Shell
# runs a server at localhost:9323 which shows detailed report.
npx playwright show-report
```

If some of the test cases failed, Playwright will automatically spin up a server at the same port.

---

## 9. Debugging & Tracing

### Debug test in UI Mode
Playwright recommends debugging your tests with UI Mode for a better developer experience where you can easily walk through each step of the test and visually see what was happening before, during and after each step.

```Shell
npx playwright test --ui
```
### Debug tests with the Playwright Inspector
This command will open up a Browser window as well as the Playwright Inspector. You can use the step over button at the top of the inspector to step through your test. Or, press the play button to run your test from start to finish. Once the test has finished, the browser window will close.

```Shell
npx playwright test example.spec.ts --debug
```

If you want to start from specific line

```Shell
npx playwright test example.spec.ts:10 --debug
```
### Tracing

