import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins:
    [
      react(),
      tsconfigPaths({
        root: '..',
        loose: true
      })
    ],
  server: {
    fs: {
      allow: ['..']
    }
  },
  resolve: {
    alias: {
      '@dbtypes': path.resolve(__dirname, './src/dbtypes')
    }
  }
})
