import { HandlerContext } from 'messages-core';

export interface EventJson<T = any> {
  readonly id: string;
  readonly name: string;
  readonly timestamp: number;
  readonly namespace: string;
  readonly version: number;
  readonly context: HandlerContext;
  readonly payload: T;
}
