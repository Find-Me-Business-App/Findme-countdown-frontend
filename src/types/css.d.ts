// Ambient module declarations for CSS files.
// This tells TypeScript to treat CSS imports as valid modules,
// preventing "Cannot find module" errors for side-effect imports like:
//   import "./globals.css"
//   import styles from "./styles.module.css"

declare module "*.css" {
  const styles: { [className: string]: string };
  export default styles;
}
