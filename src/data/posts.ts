export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  url: string;
}

export const posts: BlogPost[] = [
  {
    slug: 'custom-jwt-authentication',
    title: 'Building Custom Authentication with JWT, Refresh Tokens, and MFA',
    description:
      'How I built a custom authentication system for my Next.js application using JWTs, HttpOnly refresh-token cookies, rotating refresh-token IDs, Google OAuth 2.0 with PKCE, email OTP, TOTP, and role-based access control.',
    url: 'https://oocak.com/blogpost/custom-jwt-authentication',
  },
  {
    slug: 'functional-component-ref-warning',
    title: 'Demystifying React Refs',
    description:
      'Demystifying React Refs — Why Functional Components Need forwardRef.',
    url: 'https://oocak.com/blogpost/functional-component-ref-warning',
  },
  {
    slug: 'zustand-store-in-tauri',
    title:
      'Implementing Theme Switching in Tauri From Buttons to Zustand Persistence',
    description:
      'Implementing Theme Switching in Tauri From Buttons to Zustand Persistence.',
    url: 'https://oocak.com/blogpost/zustand-store-in-tauri',
  },
  {
    slug: 'tauri-sqlx',
    title: 'Setting Up and Using Sqlx with SQLite in Tauri Rust',
    description: 'Setting Up and Using sqlx with SQLite in Tauri Rust.',
    url: 'https://oocak.com/blogpost/tauri-sqlx',
  },
  {
    slug: 'setup-pm2',
    title: 'How to Set Up PM2 for a Node.js Application on a Raspberry Pi',
    description: 'Setting Up and Using sqlx with SQLite in Tauri Rust.',
    url: 'https://oocak.com/blogpost/setup-pm2',
  },
  {
    slug: 'raspberry-pi-cloudflare-vercel-architecture',
    title:
      'Building a Secure and Scalable Architecture with Raspberry Pi, Cloudflare, and Vercel',
    description:
      'Learn how to build a secure and scalable architecture using Raspberry Pi, Cloudflare Tunnels, and Vercel. Understand why switching to DNS only in Cloudflare is crucial for performance and reliability.',
    url: 'https://oocak.com/blogpost/raspberry-pi-cloudflare-vercel-architecture',
  },
  // ===== stubs — replace URL when you have them =====
  {
    slug: 'ssl-tls',
    title: 'Understanding SSL/TLS and Why You Need Them',
    description:
      'A practical look at SSL/TLS and why they matter for secure communication.',
    url: 'https://oocak.com/blogpost/ssl-tls', // TODO
  },
  {
    slug: 'nginx-reverse-proxy',
    title: 'Why Use NGINX as a Reverse Proxy?',
    description:
      'This blog post explores the benefits of using NGINX as a reverse proxy server.',
    url: 'https://oocak.com/blogpost/nginx-reverse-proxy', // TODO
  },
  {
    slug: 'secure-jwt-auth',
    title: 'Secure JWT Token-Based Authentication',
    description:
      'Building a Secure JWT Token-Based Authentication and Role-Based Authorization System.',
    url: 'https://oocak.com/blogpost/secure-jwt-auth', // TODO
  },
  {
    slug: 'tanstack-react-query',
    title: 'Tanstack React Query',
    description: 'Understanding Tanstack React Query.',
    url: 'https://oocak.com/blogpost/tanstack-react-query', // TODO
  },
  {
    slug: 'zustand',
    title: 'Zustand',
    description: 'Understanding zustand.',
    url: 'https://oocak.com/blogpost/zustand', // TODO
  },
  {
    slug: 'advanced-typescript-types',
    title: 'Understanding Advanced Types in TypeScript',
    description: 'Understanding Typescript.',
    url: 'https://oocak.com/blogpost/advanced-typescript-types', // TODO
  },
  {
    slug: 'json-rpc-api',
    title: 'Building a JSON-RPC API with TypeScript and Express',
    description: 'Understanding JSON-RPC.',
    url: 'https://oocak.com/blogpost/json-rpc-api', // TODO
  },
  {
    slug: 'drizzle-rpc-server',
    title: 'Setting Up Drizzle on an RPC Server',
    description: 'Learning RPC server with Postgres and drizzle.',
    url: 'https://oocak.com/blogpost/drizzle-rpc-server', // TODO
  },
  {
    slug: 'react-router',
    title: 'Understanding React Router: Complete Guide to createBrowserRouter',
    description: 'Understanding React Router.',
    url: 'https://oocak.com/blogpost/react-router', // TODO
  },
  {
    slug: 'express-postgres-docker',
    title:
      'Setting Up a Simple Node.js Express Api and PostgreSql database with Docker',
    description: 'Comprehensive guide on learning SQL and drizzle.',
    url: 'https://oocak.com/blogpost/express-postgres-docker', // TODO
  },
  {
    slug: 'c-programming-tutorial',
    title: 'C Programming Tutorial',
    description:
      'Comprehensive guide on learning C programming from basics to advanced topics.',
    url: 'https://oocak.com/blogpost/c-programming-tutorial', // TODO
  },
];
