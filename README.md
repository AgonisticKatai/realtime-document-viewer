# 📄 Real-Time Document Manager

A scalable document management application built with vanilla TypeScript, Web Components, and modern CSS. Features real-time WebSocket notifications, client-side sorting, and dual view modes.

## 📋 Table of Contents

- [🏗️ Architecture](#️-architecture)
  - [🔷 Hexagonal Architecture + Service Layer](#-hexagonal-architecture--service-layer)
  - [🔷 Hexagonal Architecture Layers](#-hexagonal-architecture-layers)
  - [🏗️ Type Organization Strategy](#️-type-organization-strategy)
  - [🎛️ Service Layer Architecture](#️-service-layer-architecture)
- [🚨 Error Handling System](#-error-handling-system)
  - [🚨 InlineError Pattern](#-inlineerror-pattern---functional-error-handling)
- [🛠️ Tech Stack](#️-tech-stack)
- [✨ Features](#-features)
- [♿ Accessibility & Inclusive Design](#-accessibility--inclusive-design)
- [🎨 CSS Architecture & Design System](#-css-architecture--design-system)
- [📋 Prerequisites](#-prerequisites)
- [🚀 Setup](#-setup)
- [💻 Development](#-development)
- [🧪 Testing Strategy](#-testing-strategy)
- [🤔 Key Architectural Decisions](#-key-architectural-decisions)

## 🏗️ Architecture

### 🔷 **Hexagonal Architecture + Service Layer**

The application combines **Hexagonal Architecture** (Ports & Adapters) with a **Service Layer** for optimal separation of concerns:

```
src/
├── main.ts                    # 📍 Application entry point
├── services/                  # 🎛️ Application Services Layer
│   ├── AppController.ts       # 🎯 Main application orchestrator
│   ├── DocumentService.ts     # 📄 Document business logic facade
│   ├── UIRenderer.ts          # 🎨 UI rendering service
│   ├── NotificationManager.ts # 🔔 Notification handling
│   └── types/                # 📋 Service configuration types
│       ├── ServiceTypes.ts   # 🎛️ Service interfaces & configs
│       └── DomainTypes.ts    # 🔗 Domain-related service types
├── domain/                    # 🔷 HEXAGON CORE - Business Logic
│   ├── models/               # 📝 Business entities
│   ├── repositories/         # 🔌 Repository interfaces (PRIMARY PORTS)
│   ├── usecases/            # ⚡ Business use cases
│   ├── services/            # 🔌 Domain service interfaces
│   ├── errors/              # 🚨 InlineError functional pattern
│   └── types/               # 📋 Domain types & enums
├── infrastructure/           # 🔧 SECONDARY ADAPTERS
│   ├── http/                # 🌐 HTTP API adapter
│   │   ├── HttpDocumentRepository.ts # 🌐 Repository implementation
│   │   ├── dtos/            # 📦 HTTP Data Transfer Objects
│   │   ├── mappers/         # 🔄 DTO ↔ Domain conversion
│   │   │   └── types/       # 📋 Mapper-specific interfaces
│   │   └── types/           # 📋 HTTP configuration types
│   └── websocket/           # ⚡ WebSocket adapter
│       ├── WebSocketNotificationService.ts # ⚡ Notification implementation
│       ├── dtos/            # 📦 WebSocket DTOs
│       ├── mappers/         # 🔄 DTO ↔ Domain conversion
│       │   └── types/       # 📋 Mapper-specific interfaces
│       └── types/           # 📋 WebSocket configuration types
├── ui/                      # 🎨 PRIMARY ADAPTERS (Web Components)
│   ├── components/          # 🧩 Web Components (*.ts + *.css + *.test.ts)
│   └── types/               # 📋 UI component interfaces
└── styles/                  # 🎨 Global styles & design system
    ├── main.css             # 🌐 Global styles
    ├── component-theme.css  # 🧩 Web Components base theme
    └── tokens/              # 🎨 Design system tokens
```

### 🔷 **Hexagonal Architecture Layers**

#### 🎯 **Core Domain (Hexagon Center)**
- **Models**: Pure business entities (Document, Contributor)
- **Use Cases**: Business logic operations (Create, Get, Sort)
- **Repository Interfaces**: Ports for data access
- **Service Interfaces**: Domain service contracts (NotificationService)
- **Types & Errors**: Domain definitions and functional error handling

#### 🎛️ **Service Layer (Application Orchestration)**
- **Controllers**: Application orchestration (AppController)
- **Services**: Business facades (DocumentService, UIRenderer, NotificationManager)
- **Types**: Service configuration interfaces organized by responsibility

#### 🔌 **Primary Ports & Adapters (Driving Side)** 
- **Ports**: Service interfaces, Repository interfaces
- **Adapters**: Web Components (UI), Service Layer (Application logic)

#### 🔧 **Secondary Ports & Adapters (Driven Side)**
- **Ports**: Repository interfaces, Domain service interfaces
- **Adapters**: HttpDocumentRepository, WebSocketNotificationService
- **Infrastructure Types**: Configuration interfaces organized by adapter type

### 🏗️ **Type Organization Strategy**

#### 📋 **Types Organized by Architectural Responsibility**

```
📁 Domain Types (src/domain/types/)
├── SortTypes.ts              # Business logic enums
└── index.ts                  # Domain type exports

📁 Service Types (src/services/types/)
├── ServiceTypes.ts           # Service configuration interfaces
├── DomainTypes.ts           # Domain-related service types
└── index.ts                  # Service type exports

📁 Infrastructure Types (src/infrastructure/*/types/)
├── http/types/HttpTypes.ts   # HTTP adapter configuration
├── websocket/types/WebSocketTypes.ts # WebSocket adapter configuration
└── */mappers/types/MapperTypes.ts # Mapper-specific interfaces

📁 UI Types (src/ui/types/)
├── UITypes.ts               # UI component interfaces
└── index.ts                 # UI type exports
```

#### ✅ **Benefits of This Organization**
- **🎯 Single Responsibility**: Each type file has one clear purpose
- **🔍 Easy Discovery**: Types are where you expect them architecturally
- **📦 Clean Imports**: Barrel exports provide semantic import paths
- **🔒 Encapsulation**: Infrastructure types stay in infrastructure layer
- **🧪 Testable**: Type definitions are isolated and mockable

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

## 🚨 Error Handling System

### 🚨 InlineError Pattern - Functional Error Handling

The application uses a functional approach to error handling inspired by Go's error handling pattern. Instead of throwing exceptions, functions return a tuple `[error, data]`.

#### 🔧 Core Type Definition

```typescript
type InlineError<T> = [string | null, T | null];
```

This creates a tuple where:
- **First element**: Error message (string) or null if success
- **Second element**: Data of type T or null if error

#### 🎯 Basic Usage

```typescript
// For operations returning data
const [error, documents] = await documentService.fetchDocuments();
if (error) {
  console.error('Failed to fetch documents:', error);
  return; // Handle error gracefully
}
// Use documents safely - TypeScript knows it's Document[]

// For void operations (no return data)
const [error, success] = uiRenderer.renderDocuments(docs, callback);
if (error) {
  console.error('Render failed:', error);
  return;
}
// success is true - operation completed successfully
```

#### 🛠️ Helper Functions

```typescript
// Success cases
const success = <T>(data: T): InlineError<T> => [null, data];
const successResult = success(['doc1', 'doc2']); // [null, string[]]
const voidSuccess = success(true); // [null, true] for void operations

// Error cases  
const error = <T>(message: string): InlineError<T> => [message, null];
const errorResult = error('Network connection failed'); // [string, null]
```

#### 🏗️ Real-world Examples

```typescript
// Repository layer
class HttpDocumentRepository {
  async getAll(): Promise<InlineError<Document[]>> {
    try {
      const response = await fetch('/api/documents');
      if (!response.ok) {
        return error('Failed to fetch documents');
      }
      const data = await response.json();
      return success(data.documents);
    } catch (err) {
      return error('Connection error');
    }
  }
}

// Service layer  
class DocumentService {
  async fetchDocuments(): Promise<InlineError<Document[]>> {
    const [err, documents] = await this.repository.getAll();
    if (err) return error(err); // Propagate error
    return success(documents);   // Propagate success
  }
}

// Controller layer
class AppController {
  async init(): Promise<void> {
    const [fetchError, documents] = await this.documentService.fetchDocuments();
    if (fetchError) {
      this.notificationManager.showNotification({ message: fetchError });
      return;
    }
    // Both operations successful - continue initialization
  }
}
```

#### ✅ Advantages over try/catch

- **Explicit**: Errors are part of the function signature
- **Composable**: Errors propagate naturally through the call stack
- **Type-safe**: TypeScript knows when you have handled the error case
- **Predictable**: No hidden exceptions or silent failures
- **Functional**: Encourages immutable error handling patterns



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

## 🤔 Key Architectural Decisions

### 🔷 Why Hexagonal Architecture + Service Layer?

**Hexagonal separates business logic from infrastructure**, while **Service Layer provides application orchestration**:

- ✅ **Clean separation** - Domain isolated from UI/HTTP/WebSocket concerns
- 🧪 **Testable** - Business logic tested without external dependencies  
- 🔄 **Swappable** - Easy to replace HTTP with GraphQL, etc.
- � **Single responsibility** - Services handle one concern each

### 🚨 Why InlineError Pattern?

**Functional error handling instead of exceptions**:

- ✅ **Explicit** - Errors are part of the function signature
- � **Predictable** - No hidden exceptions or silent failures
- � **Composable** - Errors propagate naturally through the call stack
- 📖 **Simple** - Easy to read: `const [error, data] = await operation()`

### 🧩 Why Web Components?

- 🌐 **Native standard** - No framework dependencies
- 🛡️ **True encapsulation** - Shadow DOM isolates styles and behavior
- ♻️ **Reusable** - Works with any framework or none at all

### ⚡ Why Client-Side Sorting?

Server returns random order on each request. Client-side provides:
- 🚫 **No extra HTTP calls** - Sort in memory after single fetch
- 📊 **Consistent state** - User's sort preference maintained
- ⚡ **Instant response** - No network latency for sorting

### 🎯 Why Vanilla TypeScript?

Demonstrates **deep understanding of web standards** without framework abstraction - perfect for showcasing fundamental skills.

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