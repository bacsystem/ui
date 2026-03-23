import { defineConfig } from 'tsup'
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: false,
  clean: true,
  external: ['react', 'react-dom'],
  banner: {
    js: '"use client";',
  },
  injectStyle: false,
  onSuccess: async () => {
    const __dirname = dirname(fileURLToPath(import.meta.url))
    // Merge tokens (globals.css) + component rules (components.css) → dist/styles.css
    const distDir = resolve(__dirname, 'dist')
    if (!existsSync(distDir)) mkdirSync(distDir, { recursive: true })
    const tokens = readFileSync(resolve(__dirname, 'src/styles/globals.css'), 'utf8')
    const components = readFileSync(resolve(__dirname, 'src/styles/components.css'), 'utf8')
    writeFileSync(resolve(distDir, 'styles.css'), `${tokens}\n\n${components}`)
    console.log('✔ dist/styles.css written (tokens + component styles)')
  },
})
