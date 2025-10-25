export class Container {
  private factories = new Map<string, () => unknown>();
  private singletons = new Map<string, unknown>();

  register<T>(key: string, factory: () => T): void {
    this.factories.set(key, factory);
  }

  resolve<T>(key: string): T {
    if (this.singletons.has(key)) {
      return this.singletons.get(key) as T;
    }

    const factory = this.factories.get(key);
    if (!factory) {
      throw new Error(`No registration found for: ${key}`);
    }

    const instance = factory() as T;
    this.singletons.set(key, instance);

    return instance;
  }

  has(key: string): boolean {
    return this.factories.has(key);
  }

  clear(): void {
    this.factories.clear();
    this.singletons.clear();
  }
}
