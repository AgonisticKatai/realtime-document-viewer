# 📄 Real-Time Document Manager

A scalable document management application built with vanilla TypeScript, Web Components, and modern CSS. Features real-time WebSocket notifications, client-side sorting, and dual view modes.

## 🏗️ Architecture

### 🔷 **Hexagonal Architecture + Service Layer**

The application combines **Hexagonal Architecture** (Ports & Adapters) with a **Service Layer** for optimal separation of concerns:

```
src/
├── main.ts                    # 📍 Application entry point (10 lines)
├── services/                  # 🎛️ Application Services Layer
│   ├── AppController.ts       # 🎯 Main application orchestrator
│   ├── DocumentService.ts     # 📄 Document business logic facade
│   ├── UIRenderer.ts          # 🎨 UI rendering service
│   └── NotificationManager.ts # 🔔 Notification handling
├── domain/                    # 🔷 HEXAGON CORE - Business Logic
│   ├── models/               # 📝 Entities: Document, Contributor
│   ├── repositories/         # 🔌 Repository interfaces (PRIMARY PORTS)
│   ├── usecases/            # ⚡ Business use cases
│   ├── errors/              # 🚨 Error handling system
│   └── types/               # 📋 Domain types
├── infrastructure/           # 🔧 SECONDARY ADAPTERS
│   ├── http/                # 🌐 HTTP API adapter
│   └── websocket/           # ⚡ WebSocket adapter
└── ui/                      # 🎨 PRIMARY ADAPTERS
    └── components/          # 🧩 Web Components (UI adapters)
```

### 🔷 **Hexagonal Architecture Layers**

#### 🎯 **Core Domain (Hexagon Center)**
- **Models**: Pure business entities (Document, Contributor)
- **Use Cases**: Business logic operations
- **Repository Interfaces**: Ports for data access
- **Types & Errors**: Domain definitions

#### 🔌 **Primary Ports & Adapters** 
- **Ports**: Repository interfaces, Service interfaces
- **Adapters**: Web Components, Service Layer

#### 🔧 **Secondary Ports & Adapters**
- **Ports**: Repository interfaces (implemented by infrastructure)
- **Adapters**: HttpDocumentRepository, WebSocketNotificationService

### 🎛️ **Service Layer Architecture**

#### 📍 **AppController** - Application Orchestrator
- Coordinates all application services
- Manages application lifecycle and initialization
- Handles high-level event routing and coordination

#### 📄 **DocumentService** - Document Management
- Encapsulates all document-related business logic
- Manages document state and operations (CRUD, sorting)
- Bridges domain use cases with application layer

#### 🎨 **UIRenderer** - Presentation Service
- Handles all DOM manipulation and rendering
- Manages view modes and UI state
- Provides clean interface for UI operations

#### 🔔 **NotificationManager** - Real-time Communication
- Manages WebSocket connections and notifications
- Handles notification display and lifecycle
- Abstracts notification infrastructure

### 🚨 **Error Handling System**

The application uses a functional **InlineError pattern** inspired by Go:

```typescript
// Simple, elegant error handling
export type InlineError<T> = [string | null, T | null];

// Usage examples
const [error, documents] = await documentService.fetchDocuments();
if (error) {
  console.error('Failed to load:', error);
  return;
}
// Use documents safely
```

**Benefits:**
- ✅ **Explicit error handling** - Errors are part of the type system
- ✅ **No exceptions** - Predictable control flow
- ✅ **Simple & readable** - Easy to understand and use
- ✅ **Composable** - Errors propagate naturally through the call stack

### 🔑 Key Architectural Decisions

- **Service-oriented design**: Clear separation between orchestration, business logic, and presentation
- **Functional error handling**: InlineError pattern for explicit, composable error management
- **No frameworks**: Vanilla TypeScript with Web Components for maximum control and learning
- **TDD**: Test-driven development for domain and infrastructure layers
- **Client-side sorting**: Single API call, all operations in memory for performance
- **Immutable entities**: Domain models are readonly after creation
- **Factory pattern**: Controlled entity creation with validation
- **Design System**: Modern CSS architecture with centralized theme, tokens, and Web Component styling

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

### 🎯 Why Service-Oriented Architecture?

**From monolithic main.ts (158 lines) to clean services:**
- 📍 **AppController**: Orchestrates the entire application
- 📄 **DocumentService**: Encapsulates all document logic  
- 🎨 **UIRenderer**: Handles presentation concerns
- 🔔 **NotificationManager**: Manages real-time communication

**Benefits:**
- ✅ **Single Responsibility**: Each service has one clear purpose
- 🧪 **Testable**: Services can be tested independently
- 🔄 **Maintainable**: Changes are localized to specific services
- 📖 **Readable**: Clean, focused code that's easy to understand

### 🚨 Why InlineError Pattern?

**Simple functional error handling:**
```typescript
const [error, data] = await service.operation();
if (error) { /* handle error */ }
// Use data safely
```

**Instead of try/catch:**
- ✅ **Explicit**: Errors are part of the type system
- 🎯 **Predictable**: No hidden exceptions
- 🔄 **Composable**: Errors propagate naturally
- 📖 **Simple**: Easy to read and understand

### 🎯 Why Vanilla TypeScript?

Demonstrates deep understanding of web standards and JavaScript fundamentals without framework abstraction.

### 🔷 Why Hexagonal Architecture + Services?

**Hexagonal Architecture (Ports & Adapters):**
- ✅ Clean separation of concerns
- 🧪 Testable business logic  
- 🔄 Easy to swap implementations
- 🌐 Framework-agnostic domain

**+ Service Layer Benefits:**
- 🎯 **Facade Pattern**: Services simplify complex domain interactions
- 🎛️ **Orchestration**: AppController coordinates without business logic
- 📄 **State Management**: DocumentService manages application state
- 🎨 **Presentation Logic**: UIRenderer handles view concerns

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
- **GetDocumentsUseCase** - Fetch from API with error handling
- **SortDocumentsUseCase** - Sort in memory with validation
- **CreateDocumentUseCase** - Create new documents with validation

Each use case is testable, reusable, and maintainable.

## 🔄 Architecture Evolution

### 📈 **From Monolith to Services**

**Before: Monolithic main.ts (158 lines)**
```typescript
// ❌ Everything mixed together
let allDocuments = [];
let currentViewMode = 'grid';
const sortDocumentsUseCase = new SortDocumentsUseCase();
// ... 150+ lines of mixed concerns
```

**After: Clean Service Architecture (10 lines main.ts)**
```typescript
// ✅ Clean separation
import { AppController } from './services/AppController';
import './styles/main.css';
// Component imports...

const appController = new AppController();
appController.init();
```

### 🎯 **Refactoring Benefits Achieved**

| Aspect | Before | After | Improvement |
|--------|--------|-------|-------------|
| **Lines in main.ts** | 158 lines | 10 lines | 📉 **94% reduction** |
| **Responsibilities** | Mixed (7+ concerns) | Single (initialization) | 🎯 **Clear SRP** |
| **Testability** | Difficult | Each service isolated | ✅ **Fully testable** |
| **Maintainability** | Monolithic changes | Localized changes | 🔧 **Easy maintenance** |
| **Readability** | Complex, nested logic | Clean, focused services | 📖 **Highly readable** |

### 🏗️ **Service Responsibilities**

```typescript
// 🎛️ AppController - Application orchestration
class AppController {
  async init() { /* coordinate services */ }
  private setupEventListeners() { /* handle UI events */ }
}

// 📄 DocumentService - Business logic
class DocumentService {
  async fetchDocuments() { /* API calls */ }
  sortDocuments() { /* sorting logic */ }
  createDocument() { /* creation logic */ }
}

// 🎨 UIRenderer - Presentation
class UIRenderer {
  renderDocuments() { /* DOM manipulation */ }
  setViewMode() { /* view state */ }
}

// 🔔 NotificationManager - Real-time communication
class NotificationManager {
  connect() { /* WebSocket setup */ }
  showNotification() { /* toast display */ }
}
```

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