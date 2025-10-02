/// <reference types="vite/client" />

// Type declarations for CSS imports with ?inline
declare module '*.css?inline' {
  const content: string;
  export default content;
}

// Type declarations for regular CSS imports
declare module '*.css' {
  const content: string;
  export default content;
}
