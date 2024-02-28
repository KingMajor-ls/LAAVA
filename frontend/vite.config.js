// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//     esbuild: {
//     jsxInject: `import React from 'react';`,
//     jsxFactory: 'React.createElement',
//   },
// })


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    jsxInject: `import React from 'react';`,
    jsxFactory: 'React.createElement',
  },
  optimizeDeps: {
    exclude: [
      'babel-runtime/core-js/json/stringify',
      'babel-runtime/core-js/object/values',
      'babel-runtime/helpers/toConsumableArray'
    ]
  }
})
