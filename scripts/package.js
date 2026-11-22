/**
 * Packaging Script for TaskFlow API
 * Creates the dist directory and packages the application using npm pack.
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

console.log('=== TaskFlow Application Packaging ===');

// 1. Ensure dist directory exists
if (!fs.existsSync(distDir)) {
  console.log('Creating dist/ directory...');
  fs.mkdirSync(distDir, { recursive: true });
} else {
  // Clean prior packages from dist
  const existingFiles = fs.readdirSync(distDir);
  for (const file of existingFiles) {
    if (file.endsWith('.tgz')) {
      fs.unlinkSync(path.join(distDir, file));
    }
  }
}

// 2. Run npm pack targeting the dist directory
console.log('Executing npm pack...');
try {
  const output = execSync('npm pack --pack-destination dist', {
    cwd: rootDir,
    encoding: 'utf-8'
  });

  const generatedPackage = output.trim().split('\n').pop().trim();
  console.log(`Package generated successfully: dist/${generatedPackage}`);
  console.log('Packaging complete.');
} catch (error) {
  console.error('Packaging failed:', error.message);
  process.exit(1);
}
