# Cravory-KE
A modern, responsive food delivery and restaurant discovery web application built with vanilla HTML, CSS, and JavaScript.

## Overview

Cravory-KE is a frontend project showcasing a food ordering platform with features like restaurant browsing, menu exploration, user authentication, and order management. The project emphasizes clean code architecture, modern UI/UX patterns, and responsive design.

## Features

- **Responsive Design** - Mobile-first approach with breakpoints for tablet and desktop
- **Restaurant Discovery** - Browse and search restaurants with filtering options
- **Menu Exploration** - View detailed menus with categories, pricing, and descriptions
- **User Authentication** - Login/register flows with form validation
- **Shopping Cart** - Add/remove items, quantity management, price calculations
- **Order Management** - Track order status and history
- **Interactive UI** - Smooth animations, transitions, and micro-interactions
- **Accessibility** - Semantic HTML, ARIA labels, keyboard navigation support

## Project Structure

```
Cravory-KE/
├── index.html          # Main entry point
├── css/
│   ├── main.css        # Core styles and variables
│   ├── components.css  # Reusable component styles
│   ├── layout.css      # Grid/flex layouts
│   └── utilities.css   # Utility classes
├── js/
│   ├── main.js         # Application entry point
│   ├── components/     # UI component modules
│   ├── services/       # API and data services
│   ├── utils/          # Helper functions
│   └── state/          # State management
├── img/                # Static assets (images, icons)
└── .gitignore          # Git ignore rules
```

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Optional: Local development server (VS Code Live Server, `npx serve`, etc.)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Kiamapatrick/Cravory-KE.git
   cd Cravory-KE
   ```

2. Open `index.html` directly in your browser, or serve it locally:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (serve)
   npx serve
   
   # Using PHP
   php -S localhost:8000
   ```

3. Navigate to `http://localhost:8000` in your browser.

## Development

### Code Style

- **HTML**: Semantic elements, proper nesting, accessibility attributes
- **CSS**: BEM methodology, CSS custom properties for theming, mobile-first media queries
- **JavaScript**: ES6+ modules, async/await, event delegation, separation of concerns

### CSS Architecture

The project uses a modular CSS structure:
- `main.css` - Global variables, resets, typography
- `components.css` - Buttons, cards, forms, modals, navigation
- `layout.css` - Grid systems, flex containers, page sections
- `utilities.css` - Spacing, visibility, text utilities

### JavaScript Modules

```
js/
├── components/
│   ├── Header.js       # Navigation, search, user menu
│   ├── RestaurantCard.js
│   ├── MenuItem.js
│   ├── Cart.js
│   └── Modal.js
├── services/
│   ├── api.js          # Mock API service
│   └── storage.js      # LocalStorage wrapper
├── utils/
│   ├── dom.js          # DOM helpers
│   ├── format.js       # Currency, date formatting
│   └── validation.js   # Form validation
└── state/
    └── store.js        # Global state management
```

## Customization

### Theming

Modify CSS custom properties in `css/main.css`:

```css
:root {
  --color-primary: #ff6b35;
  --color-secondary: #2d3436;
  --color-accent: #fdcb6e;
  --font-family: 'Inter', system-ui, sans-serif;
  --border-radius: 8px;
  --transition-base: 0.2s ease;
}
```

### Adding New Components

1. Create component file in `js/components/`
2. Add styles in `css/components.css`
3. Import and register in `js/main.js`

## Browser Support

| Browser | Version |
|---------|---------|
| Chrome  | 90+     |
| Firefox | 88+     |
| Safari  | 14+     |
| Edge    | 90+     |

## Performance

- Optimized images (WebP with fallbacks)
- Minified CSS/JS for production
- Lazy loading for images
- Efficient CSS selectors
- Debounced event handlers

## Accessibility

- WCAG 2.1 AA compliant
- Semantic HTML5 elements
- Focus indicators
- ARIA labels and roles
- Color contrast ratios
- Keyboard navigation
- Screen reader support

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Design inspiration from modern food delivery platforms
- Icons from [Heroicons](https://heroicons.com/)
- Fonts from [Google Fonts](https://fonts.google.com/)

## Contact

Project Link: [https://github.com/Kiamapatrick/Cravory-KE](https://github.com/Kiamapatrick/Cravory-KE)