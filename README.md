# Sports Data Testing Project

## Getting Started – How to Run the Automated Tests

To run the tests in this repo, follow the steps below:

### Prerequisites

Ensure you have the following installed:

- [Node.js (v16+)](https://nodejs.org/)
- npm (comes with Node.js)

### Setup Instructions

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd <repo-folder>
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the test suite**
   ```bash
   npm test
   ```

This will execute all the automated test scenarios defined for the rugby standings API.

---

## Part 1 – Automation

### API Under Test

**Endpoint:**  
`https://web-cdn.api.bbci.co.uk/wc-poll-data/container/sportstandings?urn=urn:bbc:sportsdata:rugby-union:tournament:six-nations`

This endpoint provides current standings for the Six Nations Rugby Union competition.

### Automated Test Scenarios Implemented

1. **Status Code & Response Time Check**

   - GET request returns `200 OK`
   - Response time is under `1000ms`

2. **Data Validation**

   - Each `id` field is non-null and non-empty
   - `participants` array contains exactly 6 items

3. **Alternate Competition Check**

   - A different competition name returns corresponding data

4. **Invalid Competition Handling**

   - Invalid name returns a `404` with an error message

5. **Header Stripping Verification**
   - Confirms the custom header `x-test-harness=true` is not echoed in the response

---

## Part 2 – Manual Testing

A new feature allows users to upload event photos.

**Base URL Structure:**  
`https://web-cdn.api.bbci.co.uk/wc-uploader/sport/live-events/my-photos?upload=<filename.jpg|png>`

The image list can be accessed at:  
`https://web-cdn.api.bbci.co.uk/wc-uploader/sport/live-events/my-photos`

### 🔍 Manual Test Plan

Located in `/tests/manual-testing-plan.md`, this file includes:

- Five Gherkin-style test scenarios
- Step-by-step instructions for manually validating each one
- Expected outcomes for successful and unsuccessful uploads

---

## Files Included

- `package.json` & `package-lock.json` – project dependencies
- `tests/api-test.js` – automated test definitions
- `tests/manual-testing-plan` – manual test plan
- `README.md` – this file
