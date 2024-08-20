

# Career Compass AI Chatbot

Welcome to the Career Compass AI Chatbot! This is a Next.js application integrated with Auth0 for authentication. The application is designed to provide virtual assistant support and is deployed on Vercel.

## Features

- **Authentication**: Secure login and logout using Auth0.
- **Virtual Assistant**: Interact with an AI-driven chatbot.
- **Responsive Design**: Optimized for both desktop and mobile views.

## Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- npm or Yarn

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/career-ai-chatbot.git
   cd career-ai-chatbot
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

3. **Set Up Environment Variables**

   Create a `.env.local` file in the root directory of the project and add the following environment variables:

   ```plaintext
   AUTH0_SECRET=your-random-secret
   AUTH0_BASE_URL=https://career-ai-chatbot.vercel.app
   AUTH0_ISSUER_BASE_URL=https://your-tenant.auth0.com
   AUTH0_CLIENT_ID=your-client-id
   AUTH0_CLIENT_SECRET=your-client-secret
   ```

   - `AUTH0_SECRET`: A securely generated random string for encryption.
   - `AUTH0_BASE_URL`: Your application's base URL.
   - `AUTH0_ISSUER_BASE_URL`: Your Auth0 tenant's base URL.
   - `AUTH0_CLIENT_ID`: Your Auth0 application Client ID.
   - `AUTH0_CLIENT_SECRET`: Your Auth0 application Client Secret.

4. **Run the Development Server**

   ```bash
   npm run dev
   ```

   or

   ```bash
   yarn dev
   ```

   Your application will be available at `http://localhost:3000`.

## Deployment

The application is deployed on Vercel. Any changes pushed to the main branch of this repository will trigger an automatic deployment to Vercel.

## Auth0 Configuration

1. **Log in to Auth0 Dashboard** and create a Single Page Web Application.
2. **Configure Allowed Callback URLs**: `https://career-ai-chatbot.vercel.app/api/auth/callback`
3. **Configure Allowed Logout URLs**: `https://career-ai-chatbot.vercel.app/`
4. **Configure Allowed Web Origins**: `https://career-ai-chatbot.vercel.app/`

Ensure that these URLs match the configuration in your `.env.local` file.

## Contributing

If you’d like to contribute to the project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

