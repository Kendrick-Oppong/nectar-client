# 🛒 Nectar - Grocery Delivery App (Client)

A beautiful, performant, and highly optimized mobile application for grocery shopping, built with **React Native** and **Expo**.

## 📸 App Preview

Below are the core screens driving the user experience. All images are securely located in `/assets/screenshots`.

<div style="display: flex; gap: 10px; overflow-x: auto;">
  <img src="./assets/screenshots/onbording.png" alt="Onboarding" width="200" />
  <img src="./assets/screenshots/log in.png" alt="Login" width="200" />
  <img src="./assets/screenshots/Home Screen.png" alt="Home Screen" width="200" />
  <img src="./assets/screenshots/Product Detail.png" alt="Product Detail" width="200" />
  <img src="./assets/screenshots/My Cart.png" alt="My Cart" width="200" />
</div>

## 🚀 Tech Stack

- **Framework**: [Expo](https://expo.dev/) & [React Native](https://reactnative.dev/)
- **Routing**: [Expo Router](https://docs.expo.dev/router/introduction/) (File-based routing)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Data Fetching**: [TanStack React Query](https://tanstack.com/query/latest) & Axios
- **Styling**: [Uniwind](https://uniwind.dev/) (Tailwind-like utility classes)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **Storage**: Expo SecureStore (Encrypted local persistence)

## 📦 Installation & Setup

1. **Clone and Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env` file at the root of the project:
   ```env
   # Android Emulator Alias
   EXPO_PUBLIC_API_URL=http://10.0.2.2:3000/api
   
   # Physical Device / iOS Simulator (Use your local network IP)
   # EXPO_PUBLIC_API_URL=http://192.168.1.X:3000/api
   ```

3. **Start the Application**
   ```bash
   npx expo start -c
   ```
   *Note: Always use `-c` to clear the cache when changing environment variables!*

## 🔐 Architecture Features

### 1. Global Auth Guard
We utilize a root `_layout.tsx` to handle authentication routing dynamically checking `isHydrated` and `isAuthenticated` via **Zustand**.
- **Logged Out**: Confined to the Welcome and `(auth)` screens.
- **Incomplete Profile**: Gated to the `/(auth)/location` screen to ensure onboarding finishes.
- **Fully Authenticated**: Seamlessly transferred to the `/(tabs)` application view.

### 2. Silent Token Rotation
The global `axios.ts` client utilizes automatic request and response interceptors.
- Injects the `Bearer` token securely.
- If a `401 Unauthorized` fires, it pauses all concurrent queries, silently hits the backend `/auth/refresh` endpoint using the `refreshToken`, and perfectly resumes the traffic without the user ever noticing.

## 📂 Folder Structure
```text
nectar-client/
├── app/               # Expo Router pages (Auth, Tabs, etc.)
├── assets/            # Fonts, Images, Screenshots
├── components/        # Reusable UI components
├── hooks/             # Custom React Query & logic hooks
├── lib/               # Utilities (Axios, Endpoints, Zustand Store, Validators)
└── types/             # Centralized TypeScript definitions
```
