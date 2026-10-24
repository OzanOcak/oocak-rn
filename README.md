# oocakrn

A React Native CLI application built with TypeScript, focused on native mobile development, API integration, and secure authentication.

## Overview

`oocakrn` is a native React Native project designed to bring authentication and API functionality into a dedicated mobile application rather than relying on a WebView.

The project explores mobile-specific authentication, secure credential storage, token lifecycle management, and integration with a backend API.

## Tech Stack

- **React Native CLI** — Native iOS and Android application
- **TypeScript** — Type-safe application development
- **Axios** — HTTP requests and API interceptors
- **Zustand** — Client-side authentication state
- **React Native Keychain** — Secure refresh-token storage
- **OAuth 2.0** — Google authentication flow
- **PKCE** — Protection for the OAuth authorization-code flow
- **Deep Linking** — Return from browser-based authentication to the mobile app
- **JWT** — Access-token authentication
- **REST API** — Backend communication

## Authentication Architecture

### Email and Password

The application integrates with the backend's email/password authentication endpoints for account registration and login.

### Google OAuth 2.0

The mobile OAuth flow is designed around the authorization-code flow with PKCE.

1. Generate a code verifier and code challenge.
2. Request an authorization URL from the backend.
3. Open the Google authorization page.
4. Receive the backend callback through a mobile deep link.
5. Exchange the one-time application authorization code and verifier with the backend.
6. Receive application authentication credentials.

The backend handles Google authorization-code exchange and application-user resolution.

### Token Management

The mobile API client uses Axios interceptors to attach access tokens and handle authentication failures.

- **Access token:** Kept in Zustand application state and attached to protected API requests.
- **Refresh token:** Stored securely using React Native Keychain.
- **Refresh-token ID:** Maintained in application state and sent to the backend during token refresh.
- **Automatic refresh:** On eligible `401 Unauthorized` responses, the interceptor attempts to refresh credentials and retry the original request.
- **Credential cleanup:** Authentication state is cleared when refresh fails or credentials are unavailable.

The refresh flow depends on successful backend validation and token rotation. End-to-end behavior should be verified on the target mobile platforms.

## Project Structure

The exact structure may evolve as development continues.

```text
oocakrn/
├── src/
│   ├── api/              # API clients and interceptors
│   ├── stores/           # Zustand state management
│   ├── components/       # Reusable UI components
│   ├── screens/          # Application screens
│   ├── navigation/       # Navigation and deep-link handling
│   └── ...
├── android/              # Native Android project
├── ios/                  # Native iOS project
├── App.tsx
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js and npm
- React Native CLI development environment
- Android Studio and Android SDK for Android development
- Xcode and CocoaPods for iOS development on macOS
- A running backend API with the required authentication endpoints configured

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/OzanOcak/oocakrn.git
cd oocakrn
npm install
```

For iOS, install CocoaPods dependencies if required by the project:

```bash
cd ios
pod install
cd ..
```

### Run the Application

Start Metro:

```bash
npm start
```

Run on Android:

```bash
npm run android
```

Run on iOS:

```bash
npm run ios
```

Use the scripts defined in `package.json` if they differ from these commands.

## Backend Configuration

The application communicates with a backend API. In development, the API base URL must point to an address reachable from the emulator or physical device.

The current Axios configuration uses:

- Development: `http://localhost:3000/api`
- Production: `https://api.oocak.com/api`

**Important:** `localhost` refers to the device or emulator itself. Android emulators and physical devices may require a different development host address.

Configure the backend's Google OAuth credentials, mobile callback URL, deep-link scheme, and application endpoints in the backend environment. Never commit client secrets, signing keys, or environment files containing credentials.

## Security Considerations

- Keep refresh tokens in secure native storage rather than ordinary application storage.
- Avoid logging access tokens, refresh tokens, authorization codes, or sensitive authentication responses.
- Validate OAuth `state` and PKCE values on the backend.
- Use HTTPS in production.
- Ensure refresh-token rotation invalidates previously used credentials.
- Use persistent, appropriately shared storage for pending OAuth state and authorization codes if deploying multiple backend instances.
- Configure production deep links and OAuth redirect URIs explicitly.

## Current Development Status

The project includes the mobile authentication architecture and API-client token-refresh implementation.

| Feature | Status |
|---|---|
| Email/password authentication integration | Implemented |
| Axios API client and access-token attachment | Implemented |
| Zustand authentication state | Implemented |
| Secure refresh-token storage | Implemented |
| Google OAuth mobile flow with PKCE | In development / integration verification required |
| Deep-link callback and authorization-code exchange | Integration verification required |
| Automatic refresh and request retry | Implemented; end-to-end verification pending |

## Goals

- Complete and validate Google OAuth on iOS and Android.
- Verify access-token expiration and refresh-token rotation.
- Expand native mobile integrations using Swift and Kotlin where appropriate.
- Improve automated testing, error handling, and authentication reliability.

## Author

**Ozan Ocak**

- Website: https://oocak.com
- GitHub: https://github.com/OzanOcak

