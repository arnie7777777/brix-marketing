# Brix Marketing Website

A super modern, futuristic marketing website featuring animated Brix characters. This website showcases a friendly character made out of building blocks representing a marketing agency's approach to constructing strong, personalized marketing campaigns.

## Features

- 🧱 Interactive Brix characters with unique animations
- 🌈 Modern, futuristic UI with gradient effects
- 🎭 Fluid animations using Framer Motion
- 📱 Fully responsive design that works on all devices
- 🌟 Creative, constructive, and systematic visual approach

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Framer Motion
- GSAP animations
- Three.js (for potential 3D elements)

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `/app` - Next.js App Router pages and components
- `/app/components` - Reusable UI components
- `/public` - Static assets

## Brix Characters

The website features three animated Brix characters:
1. A walking character showcasing motion
2. A character with a lightbulb representing ideas and innovation
3. A character holding a glass of milk showing a friendly, approachable personality

## Customization

You can customize the colors, animations, and content in the respective component files:

- Character customization: `app/components/BrixCharacter.tsx`
- Color themes: `tailwind.config.js`
- Content sections: Individual section components in `/app/components` 