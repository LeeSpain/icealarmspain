
/**
 * Deployment helper script
 * 
 * Usage:
 *   node deploy.js [environment]
 * 
 * Where environment is one of:
 *   - development (default)
 *   - staging
 *   - production
 * 
 * Example:
 *   node deploy.js production
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Get environment from command line arguments
const args = process.argv.slice(2);
const targetEnv = args[0] || 'development';

// Validate environment
const validEnvironments = ['development', 'staging', 'production'];
if (!validEnvironments.includes(targetEnv)) {
  console.error(`Error: Invalid environment '${targetEnv}'`);
  console.error(`Valid environments: ${validEnvironments.join(', ')}`);
  process.exit(1);
}

console.log(`Deploying to ${targetEnv} environment...`);

// Copy the appropriate .env file
const envFile = `.env.${targetEnv}`;
if (!fs.existsSync(envFile)) {
  console.error(`Error: Environment file '${envFile}' not found`);
  process.exit(1);
}

console.log(`Using environment configuration from ${envFile}`);
fs.copyFileSync(envFile, '.env');

// Build the application
console.log('Building application...');
try {
  execSync('npm run build', { stdio: 'inherit' });
} catch (error) {
  console.error('Build failed');
  process.exit(1);
}

console.log('Build completed successfully');

// If you're using a specific deployment command for different environments,
// you can run it here.
// For example:
// if (targetEnv === 'production') {
//   console.log('Deploying to production...');
//   execSync('firebase deploy --only hosting:production', { stdio: 'inherit' });
// } else if (targetEnv === 'staging') {
//   console.log('Deploying to staging...');
//   execSync('firebase deploy --only hosting:staging', { stdio: 'inherit' });
// }

console.log(`Deployment to ${targetEnv} completed!`);
