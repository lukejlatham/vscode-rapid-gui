const esbuild = require('esbuild');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env file in the root directory
dotenv.config({ path: path.join(__dirname, '.env') });

// Create an object to define environment variables for esbuild
const defineEnv = Object.keys(process.env).reduce((acc, key) => {
  acc[`process.env.${key}`] = JSON.stringify(process.env[key]);
  return acc;
}, {});

esbuild.build({
  entryPoints: [path.join(__dirname, 'webview-ui/src/index.tsx')],
  bundle: true,
  outfile: path.join(__dirname, 'out', 'panels', 'MainWebviewPanel.js'),  // Place output in the expected directory
  define: defineEnv,
  platform: 'browser',
  target: 'esnext',
  loader: {
    '.js': 'jsx',
    '.ts': 'tsx',
  },
  resolveExtensions: ['.tsx', '.ts', '.jsx', '.js'],
  sourcemap: true, // Include source maps for easier debugging
}).catch((error) => {
  console.error(error);
  process.exit(1);
});
