export interface HttpRepositoryConfig {
  readonly baseUrl: string;
}

export interface HttpClientConfig {
  readonly baseUrl: string;
  readonly timeout?: number;
  readonly headers?: Record<string, string>;
}
