declare module "@testing-library/jest-dom" {
  export interface Matchers<R = void> {
    toBeInTheDocument(): R;
    toHaveTextContent(text: string): R;
  }
}
