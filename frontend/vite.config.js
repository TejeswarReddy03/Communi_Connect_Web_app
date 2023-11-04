import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    fallback: {
      util: require.resolve('util/'),
      stream: require.resolve('stream-browserify'),
      buffer: require.resolve('buffer/'),
      "http": require.resolve("stream-http"),
      "fs": false, // Or provide your own polyfill if necessary
      // Add more fallbacks as needed
    },
  },
  
})
