# Simple Diagram Builder

This is a Next.js 14 application built with the App Router, designed as a simple, accessible tool for visualizing ideas, processes, or plans.

## Features

- **Intuitive Canvas:** Drag, drop, and connect basic shapes to create flowcharts, mind maps, and diagrams.
- **Client-Side Storage:** All diagrams are saved, loaded, and managed directly within your browser using `localStorage`.
- **Stunning UI:** Features a dark theme with vibrant gradient accents, glassmorphic cards, and smooth transitions.
- **Responsive Design:** Works well on various screen sizes.

## Pages

- **Home:** An introduction to the application, highlighting the problem it solves and its solution.
- **Editor:** The main canvas where users create and manipulate diagrams.
- **My Diagrams:** A page to view, load, and delete previously saved diagrams.
- **Export:** Allows users to export their diagrams as JSON or a simple text representation.

## Getting Started

To run this project locally:

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd diagram-builder-app
    ```
2.  Install dependencies:
    ```bash
    npm install
    # or yarn install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    # or yarn dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Technologies Used

-   Next.js 14 (App Router)
-   React 18
-   CSS (Vanilla CSS for styling)
-   `uuid` for unique ID generation
