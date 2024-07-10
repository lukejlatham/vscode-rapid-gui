const esbuild = require('esbuild');
const path = require('path');

esbuild.build({
  entryPoints: [path.join(__dirname, 'webview-ui/src/index.tsx')],
  bundle: true,
  outfile: path.join(__dirname, 'out', 'panels', 'MainWebviewPanel.js'),  // Place output in the expected directory
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
