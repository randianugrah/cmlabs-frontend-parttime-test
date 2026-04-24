# MealMaster - Frontend Technical Test (cmlabs)

MealMaster is a premium web application built as part of the frontend technical test for **cmlabs**. It allows users to explore a vast library of culinary ingredients and discover delicious recipes.

## 🚀 Key Features

- **Dynamic Ingredient Library**: Search and filter through hundreds of ingredients.
- **Recipe Discovery**: Detailed meal views with instructions and measures.
- **Premium UI/UX**:
  - **Brand Identity**: Custom SVG-based branding and splash screen experience.
  - **Motion Design**: Smooth image unveils with skeleton loaders using `framer-motion`.
  - **Glassmorphism**: Modern, translucent UI elements with backdrop filters.
  - **Responsive Layout**: Fully optimized for mobile, tablet, and desktop.
  - **Smart Navigation**: Persistent breadcrumbs and custom scroll-to-top functionality.

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **API**: TheMealDB API

## 🏁 Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open https://mealmaster-five.vercel.app/ with your browser to see the result.

## 📄 Structure

- `/src/components/atoms`: Reusable low-level components (Logo, PremiumImage, ScrollToTop, etc.)
- `/src/components/molecules`: Composite components (Cards, Breadcrumbs)
- `/src/components/organisms`: Complex UI sections (Grids, Header, Detail Views)
- `/src/app`: Page routing and metadata configuration

---
*Created by Randi Andria Nugrah*
