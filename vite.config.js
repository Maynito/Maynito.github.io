import { execSync } from 'node:child_process'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Hash du commit : fourni par la CI, sinon lu dans le dépôt local.
function commitSha() {
  if (process.env.GITHUB_SHA) return process.env.GITHUB_SHA
  try {
    return execSync('git rev-parse HEAD').toString().trim()
  } catch {
    return 'inconnu'
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    __BUILD__: JSON.stringify({
      version: process.env.npm_package_version ?? '0.0.0',
      sha: commitSha(),
      date: new Date().toISOString(),
    }),
  },
})
