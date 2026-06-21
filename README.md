# Portfolio

Personal portfolio website for Haider Sultan, built with Next.js, TypeScript, Tailwind CSS, MongoDB, and the App Router.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- MongoDB
- ESLint

## Environment

Create `.env.local` from `.env.example`:

```bash
MONGODB_URI=mongodb+srv://USER:PASSWORD@CLUSTER.mongodb.net/?retryWrites=true&w=majority
MONGODB_DB=portfolio
ADMIN_API_TOKEN=change-this-token
ADMIN_USERNAME=admin
ADMIN_PASSWORD=change-this-password
JWT_SECRET=change-this-long-random-secret
```

If `MONGODB_URI` is missing, the app renders built-in fallback content.

## Admin

Open `/admin` to edit the portfolio content. Login uses `ADMIN_USERNAME` and
`ADMIN_PASSWORD`, then stores a signed JWT in an HTTP-only cookie using
`JWT_SECRET`.

## Portfolio Content API

```bash
GET /api/portfolio
POST /api/portfolio   # seed defaults into MongoDB
PUT /api/portfolio    # replace all portfolio content
PATCH /api/portfolio  # update part of the content
```

Write requests require:

```bash
Authorization: Bearer $ADMIN_API_TOKEN
```

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Project Structure

```text
src/app/
  layout.tsx   Global app layout and metadata
  page.tsx     Homepage
  globals.css  Global styles
```

## Deployment

This project is ready to deploy on Vercel or any platform that supports Next.js.

For a production build:

```bash
npm run build
```
