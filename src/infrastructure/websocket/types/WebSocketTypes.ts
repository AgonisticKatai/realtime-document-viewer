export interface WebSocketConfig {
  readonly url: string;
  readonly reconnectInterval?: number;
  readonly maxReconnectAttempts?: number;
}

export interface WebSocketClientConfig {
  readonly url: string;
  readonly protocols?: string[];
  readonly reconnectInterval?: number;
}
