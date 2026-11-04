# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

1. Why do we store the token in localStorage? What is one security risk of doing so, and what is a more secure alternative?
We store the JSON Web Token (JWT) in localStorage so that the user's authentication session persists across browser refreshes and tabs without requiring them to re-login every time. However, a major security risk of localStorage is its vulnerability to Cross-Site Scripting (XSS) attacks, as any malicious script executed on the client side can easily read the stored token. A more secure alternative is storing tokens in httpOnly, Secure, and SameSite cookies. This approach prevents client-side JavaScript from accessing the token entirely while allowing the browser to attach it automatically to API requests.

2. What is the purpose of the AuthContext? Why not just pass the token as a prop to each component?
AuthContext creates a centralized global state in React for managing authentication details like token storage, user info, and login/logout functions across the application. Passing the token as a prop to each component leads to "prop drilling," requiring intermediary components to pass down data they do not actually need. Prop drilling makes the codebase tightly coupled, difficult to refactor, and prone to maintenance errors as the component tree expands. Using AuthContext allows any component to access or update authentication state directly through a clean custom hook like useAuth.

3. What happens on the frontend when the JWT expires? Describe the user experience you would want to implement.
When a JWT expires, any subsequent API requests sent with that token will fail with a 401 Unauthorized response from the server. To deliver a clean user experience, the frontend should catch 401 errors globally using an API fetch wrapper or interceptor. Upon detecting an expired token, the application should clear the invalid token from localStorage, reset the auth context state, and seamlessly redirect the user to /login. Displaying a friendly alert or notification—such as "Your session has expired. Please log in again."—ensures the user understands why they were logged out.

4. What is the difference between the backend's requireAuth middleware and the frontend's ProtectedRoute component? Why do we need both?
The frontend ProtectedRoute component handles user navigation by checking if a token exists and redirecting unauthenticated users away from private views. The backend requireAuth middleware enforces actual security by validating the token signature on every incoming HTTP request before granting access to server routes or database records. We need both because client-side routing can be bypassed or manipulated by users, meaning ProtectedRoute only offers UI convenience rather than true data security. The requireAuth middleware provides strict server-level protection, while ProtectedRoute improves the user experience by guiding users to the correct screens.
