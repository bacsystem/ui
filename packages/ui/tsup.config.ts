import { defineConfig } from 'tsup'
import { copyFileSync, mkdirSync, existsSync } from 'node:fs'
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
    // Copy globals.css → dist/styles.css
    const distDir = resolve(__dirname, 'dist')
    if (!existsSync(distDir)) mkdirSync(distDir, { recursive: true })
    copyFileSync(
      resolve(__dirname, 'src/styles/globals.css'),
      resolve(distDir, 'styles.css')
    )
    console.log('✔ dist/styles.css copied')
  },
})
