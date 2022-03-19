export interface EventHandler<T> {
  (e: T): void;
}
