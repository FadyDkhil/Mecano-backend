export interface Message<T = any> {
  id: string;
  timestamp?: number;
  props: T;
}
