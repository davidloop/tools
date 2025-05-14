# React Tools

A collection of useful web development tools built with React.js. This application provides a clean, modern interface for various utilities that web developers commonly need.

## Features

- **Navigation System**: Seamlessly switch between different tools using the top button navigation
- **Responsive Design**: Works well on both desktop and mobile devices
- **Modern UI**: Clean and intuitive interface

## Tools Included

### PX to REM Converter
Convert between pixel and rem units easily. Set your base font size and see conversions instantly.

### Ratio Calculator
Calculate dimensions based on aspect ratios. Useful for responsive design and maintaining proper proportions.

### Modular Scale
Generate a typographic scale based on a base size and ratio. Helps create harmonious typography systems.

### Image Compressor
Compress images directly in the browser. Adjust quality settings and download the compressed result.

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm start
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Production Build

To create a production build and serve it locally:

```
npm run serve
```

This will build the application and start a local server at [http://localhost:3000](http://localhost:3000) (or another port if 3000 is in use).

## Technologies Used

- React.js
- CSS3
- HTML5
- JavaScript ES6+

## Project Structure

- `src/components/` - Individual tool components
- `src/App.js` - Main application component
- `src/components/Header.js` - Application header
- `src/components/Navigation.js` - Tool navigation system

## How It Works

The application uses React's state management to handle tool switching. Each tool is implemented as a separate component, and the navigation system controls which tool is currently displayed.

The tools are designed to be self-contained and reusable, making it easy to add new tools in the future.
