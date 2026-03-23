import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    include: ['**/__tests__/**/*.{test,spec}.{ts,tsx}'],
  },
  resolve: {
    alias: {
      // Resolves the workspace package to its TypeScript source so the package
      // can be imported without a pre-built dist. Individual test files that need
      // component mocks should call vi.mock('@bacsystem/ui', async () => import('@ui-mock'))
      // rather than relying on a global alias override.
      '@bacsystem/ui': resolve(__dirname, '../../packages/ui/src/index.ts'),
      // Convenience alias for the manual mock factory used in vi.mock() calls.
      '@ui-mock': resolve(__dirname, './__mocks__/@bacsystem/ui.tsx'),
    },
  },
})