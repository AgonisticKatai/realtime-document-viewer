# 📄 Real-Time Document Manager

A scalable document management application built with vanilla TypeScript, Web Components, and modern CSS. Features real-time WebSocket notifications, client-side sorting, and dual view modes.

## 🏗️ Architecture

### 🔷 Hexagonal Architecture (Ports & Adapters)

The project follows a clean hexagonal architecture separating business logic from external dependencies:

- **domain/** - Business logic (framework-agnostic)
  - models/ - Entities: Document, Contributor
  - repositories/ - Repository interfaces (ports)
  - services/ - Service interfaces
  - usecases/ - Business use cases
- **infrastructure/** - External adapters
  - http/ - HTTP API integration
  - websocket/ - WebSocket integration
- **ui/** - Presentation layer
  - components/ - Web Components

### 🔑 Key Architectural Decisions

- **No frameworks**: Vanilla TypeScript with Web Components for maximum control and learning
- **TDD**: Test-driven development for domain and infrastructure layers
- **Client-side sorting**: Single API call, all operations in memory for performance
- **Immutable entities**: Domain models are readonly after creation
- **Factory pattern**: Controlled entity creation with validation
- **Design System**: Modern CSS architecture with centralized theme, tokens, and Web Component styling
- **CSS tokens**: Custom properties, oklch colors, fluid scaling with clamp(), native CSS nesting

## 🛠️ Tech Stack

- **TypeScript 5.x** - Type safety
- **Vite 5.x** - Build tool and dev server
- **Vitest** - Testing framework
- **Web Components** - Native browser APIs
- **WebSocket** - Real-time notifications
- **ESLint + Stylelint** - Code quality
- **WCAG 2.1 AA Compliance** - Full accessibility support

## ✨ Features

### 📋 Required
- 📊 Display documents in list/grid views
- ⚡ Real-time notifications via WebSocket
- ➕ Create documents (client-side only)
- 🔄 Sort by name, version, or creation date

### 🎯 Implementation Highlights
- Shadow DOM for style encapsulation
- Custom Events for component communication
- Separation of concerns (sorting as separate use case)
- Proper DTO mapping from API to domain entities

## ♿ Accessibility & Inclusive Design

This application implements comprehensive accessibility features following **WCAG 2.1 AA** guidelines and modern web standards:

### 🎹 **Keyboard Navigation**
- **Full keyboard support** - Navigate entire app using Tab, Arrow keys, Enter, Escape
- **Focus management** - Visible focus indicators with proper contrast
- **Focus trapping** - Modal dialogs contain focus within boundaries
- **Skip links** - Quick navigation to main content

### 🖥️ **Screen Reader Support**
- **Semantic HTML** - Proper use of `<article>`, `<section>`, `<header>`, heading hierarchy
- **ARIA labels** - Descriptive labels for interactive elements
- **Live regions** - Real-time announcements for dynamic content changes
- **Screen reader utilities** - `.sr-only` class for additional context

### 📱 **Responsive & Adaptive**
- **Flexible layouts** - Works across different screen sizes and orientations
- **Touch targets** - Minimum 44px click areas for mobile accessibility
- **Zoom support** - Functional up to 200% zoom level

### 🎨 **Visual Accessibility**
- **High contrast support** - `prefers-contrast: more` media query
- **Reduced motion** - Respects `prefers-reduced-motion` user preference
- **Color independence** - Information not conveyed by color alone
- **Scalable typography** - Relative units and clamp() for fluid scaling

### 🔧 **Implementation Details**
- **Web Components accessibility** - Proper ARIA in Shadow DOM contexts
- **Form validation** - Real-time feedback with `aria-invalid` and `role="alert"`
- **Toast notifications** - `role="alert"` and `aria-live="assertive"` for immediate announcements
- **Component isolation** - Each component imports accessibility utilities as needed

### ✅ **Standards Compliance**
- **HTML validation** - Semantic, valid markup
- **ARIA best practices** - Proper roles, states, and properties
- **Keyboard patterns** - Following established interaction patterns
- **Focus indicators** - 2px minimum outline with adequate contrast ratios

## 🎨 CSS Architecture & Design System

### 🏗️ **Modular Structure**
```
src/styles/
├── component-theme.css    # Base theme for Web Components
├── main.css              # Global document styles
├── accessibility.css     # Accessibility utilities
└── tokens/               # Design tokens
    ├── colors.css        # Color palette with oklch()
    ├── spacing.css       # Spacing scale (rem units)
    ├── typography.css    # Font scales and weights
    ├── radius.css        # Border radius tokens
    └── shadows.css       # Shadow scale
```

### 🧩 **Web Components Theme**
- **Centralized base** - All components import `component-theme.css`
- **Shadow DOM reset** - Proper box-sizing and base styles
- **Token inheritance** - Design tokens available in all components
- **DRY principle** - No repeated imports or resets

### 🎯 **Modern CSS Features**
- **Native CSS nesting** - Hierarchical organization without preprocessors
- **Custom properties** - Dynamic theming and consistent tokens
- **oklch() colors** - Perceptually uniform color space
- **Fluid typography** - `clamp()` for responsive scaling
- **Container queries** - Component-based responsive design (prepared)

### 📐 **Design Tokens**
- **Semantic naming** - `--color-primary`, `--space-4`, `--font-size-lg`
- **Consistent scales** - Mathematical progression for spacing and typography
- **Accessibility first** - Color contrast and touch target considerations
- **Future-proof** - Easy theme switching and dark mode implementation

## 📋 Prerequisites

1. 🟢 **Node.js 20+** (specified in .nvmrc)
2. 🐹 **Go runtime** for the backend server

## 🚀 Setup

### 1️⃣ Install dependencies

```bash
npm install
```

### 2️⃣ Setup the server

Download the server from the challenge repository and place it in a server/ directory at the project root.

### 3️⃣ Run the server

```bash
npm run server
```

🌐 Server will be available at http://localhost:8080

### 4️⃣ Run the application

```bash
npm run dev
```

🎉 Application will be available at http://localhost:5173

## 💻 Development

### 📜 Available Scripts

- 🚀 `npm run dev` - Start dev server
- 📦 `npm run build` - Build for production
- 👀 `npm run preview` - Preview production build
- 🐹 `npm run server` - Start the Go backend server
- 🧪 `npm test` - Run tests in watch mode
- ✅ `npm test:run` - Run tests once
- 🎨 `npm test:ui` - Run tests with UI interface
- 🔍 `npm run lint` - Lint TypeScript
- 🔧 `npm run lint:fix` - Fix linting issues
- 💅 `npm run lint:css` - Lint CSS
- ✨ `npm run lint:css:fix` - Fix CSS issues
- 🎯 `npm run lint:all` - Lint everything

### 🔧 VS Code Setup

For optimal development experience, add to your workspace settings (.vscode/settings.json):

{
  "eslint.useFlatConfig": true
}

## 🧪 Testing Strategy

- 🔬 **Unit tests**: Domain models and use cases
- 🔗 **Integration tests**: Infrastructure adapters (HTTP, WebSocket)
- 🧩 **Component tests**: Web Components with JSDOM

Coverage focuses on business logic and critical paths. UI components have basic smoke tests.

## 🤔 Project Decisions

### 🎯 Why Vanilla TypeScript?

Demonstrates deep understanding of web standards and JavaScript fundamentals without framework abstraction.

### 🔷 Why Hexagonal Architecture?

- ✅ Clean separation of concerns
- 🧪 Testable business logic
- 🔄 Easy to swap implementations
- 🌐 Framework-agnostic domain

### 🧩 Why Web Components?

- 🌐 Native browser standard
- 🛡️ True encapsulation with Shadow DOM
- 📦 No build-time dependencies for components
- ♻️ Reusable across any framework

### ♿ Why Accessibility First?

- 🌍 **Inclusive Design**: Creates a better experience for everyone
- 📏 **WCAG 2.1 AA Compliance**: Professional standard for web applications  
- ⌨️ **Keyboard Navigation**: Essential for power users and accessibility
- 📱 **Screen Reader Support**: Semantic HTML with proper ARIA implementation
- 🎯 **Quality Indicator**: Demonstrates attention to detail and professional standards

### ⚡ Why Client-Side Sorting?

The API returns random documents on each request. Client-side sorting:
- 🚫 Eliminates unnecessary HTTP calls
- 📊 Maintains data consistency
- 🏃‍♂️ Improves performance
- 😊 Better UX (instant response)

### 🎯 Why Separate Use Cases?

Following Single Responsibility Principle:
- GetDocumentsUseCase - Fetch from API
- SortDocumentsUseCase - Sort in memory
- CreateDocumentUseCase - Create new documents

Each use case is testable, reusable, and maintainable.

## 🌐 Browser Support

Tested in the latest two versions of Chrome as per requirements. Uses modern web features:

### 🚀 **JavaScript/Web APIs**
- ES2020 modules and features
- Web Components with Shadow DOM
- Custom Elements v1
- WebSocket API

### 🎨 **CSS Features**
- **CSS Nesting** (Chrome 112+, Firefox 117+, Safari 16.5+)
- **Custom Properties** - Dynamic theming
- **oklch() colors** - Perceptually uniform color space
- **Container Queries** - Component-responsive design (prepared)
- **CSS Grid** and **Flexbox** - Modern layouts

## 🔌 API Integration

### 🌐 HTTP Endpoint

```
GET http://localhost:8080/documents
```

Returns array of documents with contributors and attachments.

### ⚡ WebSocket Endpoint

```
ws://localhost:8080/notifications
```

Emits notifications when documents are created by other users (simulated by server).

## 🏆 Code Quality

- 🔍 **ESLint**: Enforces consistent code style, import ordering, TypeScript best practices
- 💅 **Stylelint**: Ensures CSS quality, property ordering, modern CSS compliance
- 🎨 **Prettier-compatible**: No formatting conflicts
- 🛡️ **Strict TypeScript**: All type checks enabled