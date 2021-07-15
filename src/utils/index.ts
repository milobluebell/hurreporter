export { default as checkWindow } from './checkWindow.hof';

// ts-utils
export type ElementOf<A> = A extends (infer E)[] ? E : A extends readonly (infer E)[] ? E : never