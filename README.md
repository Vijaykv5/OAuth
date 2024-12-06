# OAuth Client Demo

This repository demonstrates how to implement a client-side OAuth 2.0 flow in a React.js application. It includes a client library (`OAuthClient`) that handles the authorization and token exchange processes, as well as a demo React application to showcase how to integrate the library.

## Features

- Implements OAuth 2.0 Authorization Code Flow (Client-Side)
- Simple React application to demonstrate login and user info fetching

## Getting Started

Follow these steps to run the demo locally.

### Prerequisites

- [Node.js](https://nodejs.org/) (v16.x or later)
- [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/) (for managing dependencies)

### Installation

1. Clone this repository to your local machine:

```bash
git clone https://github.com/your-username/OAuth.git
cd OAuth
```

2. Install dependencies:

```bash
yarn install # or npm install
```

### Configuration

To run the demo, update the `OAuthClient` configuration in `src/oauthClient.ts` with your OAuth provider details:

```typescript
const client = new OAuthClient({
  clientId: "your-client-id",
  clientSecret: "your-client-secret",
  redirectUri: "http://localhost:5173/callback",
  authorizationEndpoint: "https://your-auth0-domain/authorize",
  tokenEndpoint: "https://your-auth0-domain/oauth/token",
});
```

Replace `"your-client-id"`, `"your-client-secret"`, and `"your-auth0-domain"` with your own OAuth credentials from your identity provider (e.g., Auth0, Okta, etc.).

### Running the Demo

After configuring the `OAuthClient`, run the demo application:

```bash
yarn dev # or npm run dev
```

This will start the development server, and you can open the app in your browser at `http://localhost:5173`.

## How it Works

1. The user clicks on the **Login** button to initiate the OAuth flow.
2. The OAuth client redirects the user to the authorization server's login page.
3. Once the user authenticates, the authorization code is sent back to the application via a redirect.
4. The app exchanges the authorization code for access and refresh tokens.
5. The access token is used to fetch user information from the API (e.g., `userinfo` endpoint).

## Demo Application

The demo application consists of:

* `LoginButton.tsx`: A button component that initiates the login flow.
* `UserInfo.tsx`: A component that displays the user information fetched using the access token.
* `App.tsx`: The main application component that manages authentication state and displays either the login button or user info.

## API Endpoints

In the demo, the `userinfo` endpoint is used to retrieve user details once the access token is acquired. Replace the URL `https://your-auth0-domain/userinfo` with the actual endpoint provided by your OAuth provider.


## Challenges Faced

While implementing the client-side OAuth flow, I encountered a few key challenges:

### 1. **Issue with Auth Providers**
I first tried **Clerk OAuth Provider**, but it gave me errors like
`invalid_grant` or `invalid_code` although my credentials matched and user is registered in the clerk dashboard. 
After few debugging, I thought of exploring Auth0.

### 2. **Constructors in JS/TS**
I had an issue with the code related to constructors and async/await. I had to review the documentation to better understand how constructors initialize objects.

### 3. **CSRF Protection with State**
Since it was mentioned in the assignment to have secure authentication practices, I read through many docs to prevent security risks like CSRF attacks, and came up with a way that the `state` parameter is used to verify the request's legitimacy.

Thanks to Kavindu Dodanduwa for the wonderful explanation on Stack Overflow: [Understanding CSRF Protection in OAuth2 Authentication](https://stackoverflow.com/questions/58823560/what-kind-of-csrf-attack-does-state-parameter-prevent-in-oauth2-based-authentica)

