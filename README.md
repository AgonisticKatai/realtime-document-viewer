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
- **CSS tokens**: Modern CSS with custom properties, oklch colors, clamp for fluid scaling

## 🛠️ Tech Stack

- **TypeScript 5.x** - Type safety
- **Vite 5.x** - Build tool and dev server
- **Vitest** - Testing framework
- **Web Components** - Native browser APIs
- **WebSocket** - Real-time notifications
- **ESLint + Stylelint** - Code quality

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
- ES2020
- CSS Nesting
- Custom Properties (CSS Variables)
- oklch() color function
- Container Queries (prepared)
- Shadow DOM

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