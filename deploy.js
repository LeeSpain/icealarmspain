
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

// Read the environment variables
const envVars = {};
const envContent = fs.readFileSync(envFile, 'utf-8');
envContent.split('\n').forEach(line => {
  line = line.trim();
  if (line && !line.startsWith('#')) {
    const [key, ...valueParts] = line.split('=');
    const value = valueParts.join('=').trim();
    envVars[key.trim()] = value;
    
    // Set in process.env for child processes
    process.env[key.trim()] = value;
  }
});

// Create a verbose environment file for debugging
if (targetEnv === 'production') {
  const debugEnvContent = Object.entries(envVars)
    .map(([key, value]) => {
      // Mask sensitive values in logs
      if (key.includes('KEY') || key.includes('SECRET') || key.includes('PASSWORD')) {
        return `${key}=***MASKED***`;
      }
      return `${key}=${value}`;
    })
    .join('\n');
  
  fs.writeFileSync('build-env-debug.log', `Building with environment:\n${debugEnvContent}`);
  console.log('Created build environment debug log');
}

// Build the application with explicit environment variables
console.log('Building application...');
try {
  // Prepare environment variables for the build
  const envString = Object.entries(envVars)
    .map(([key, value]) => `${key}=${value}`)
    .join(' ');
  
  // Run the build with environment variables
  if (targetEnv === 'production') {
    // For production, use a more verbose build process
    console.log('Running production build with debugging enabled...');
    execSync(`${envString} NODE_ENV=production vite build --mode production`, { 
      stdio: 'inherit',
      env: { ...process.env, ...envVars, NODE_ENV: 'production' }
    });
  } else {
    // Standard build for other environments
    execSync(`${envString} vite build --mode ${targetEnv}`, { 
      stdio: 'inherit',
      env: { ...process.env, ...envVars }
    });
  }
} catch (error) {
  console.error('Build failed', error);
  process.exit(1);
}

console.log('Build completed successfully');

// Add build info file in dist
try {
  const buildInfo = {
    timestamp: new Date().toISOString(),
    environment: targetEnv,
    nodeEnv: process.env.NODE_ENV || 'unknown'
  };
  
  if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist');
  }
  
  fs.writeFileSync('dist/build-info.json', JSON.stringify(buildInfo, null, 2));
  console.log('Added build info to output directory');
} catch (error) {
  console.error('Warning: Could not write build info', error);
  // Non-fatal error, continue
}

console.log(`Deployment to ${targetEnv} completed!`);
