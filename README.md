# Emils Samoilovs Portfolio

A modern, SEO-friendly personal portfolio website built with React, TypeScript, and Vite.

## Live Preview

Visit the live website at: [https://emilssamoilovs.com/](https://emilssamoilovs.com/)

## Features

- Responsive design with Tailwind CSS
- SEO optimization with React Helmet
- Clean contact information display
- Modern React best practices
- TypeScript for type safety

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, React Helmet Async
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: React Icons

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start development server:
   ```
   .\start-dev.ps1 or .\start-dev.bat
   ```
   Or run directly:
   ```
   npm run dev
   ```

## Building for Production

```
npm run build
```

This will create a `dist` folder with optimized production build.

## Deployment

The website is currently deployed and live at [https://emilssamoilovs.com/](https://emilssamoilovs.com/)

The static files in the `dist` folder can be deployed to any static hosting service like Netlify, Vercel, GitHub Pages, etc.

To preview the production build locally:
```
npm run preview
```

## Project Structure

- `/src` - React application source code
  - `/components` - React components
  - `/data` - Data files for portfolio content
  - `/types` - TypeScript type definitions
- `/public` - Static assets

## SEO Features

- Meta tags for social sharing (OpenGraph, Twitter)
- Semantic HTML structure
- React Helmet for dynamic meta tags
- robots.txt and sitemap.xml
- Proper heading hierarchy
- Accessible markup with ARIA attributes

## License

All rights reserved © Emils Samoilovs
