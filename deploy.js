
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
  console.error('Creating an example file with required variables...');
  
  // Create an example file with placeholder values
  const exampleEnvContent = `
# Example ${targetEnv} environment file
# Replace these values with actual credentials
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
VITE_FIREBASE_PROJECT_ID=your_project_id_here
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
VITE_FIREBASE_APP_ID=your_app_id_here
VITE_ENVIRONMENT=${targetEnv}
`;
  
  fs.writeFileSync(envFile, exampleEnvContent);
  console.error(`Created example ${envFile} file. Please update it with actual values.`);
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

// Validate required environment variables
const requiredVars = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_ENVIRONMENT'
];

const missingVars = requiredVars.filter(varName => !envVars[varName]);
if (missingVars.length > 0) {
  console.error(`Error: Missing required environment variables: ${missingVars.join(', ')}`);
  console.error(`Please update ${envFile} with the required values.`);
  process.exit(1);
}

// Create a verbose environment file for debugging
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

// Add build verification to the start of the main file
try {
  console.log('Adding build verification to enhance debugging...');
  const mainFilePath = 'src/main.tsx';
  if (fs.existsSync(mainFilePath)) {
    const mainContent = fs.readFileSync(mainFilePath, 'utf-8');
    const importLine = "import './utils/build-verification';";
    
    if (!mainContent.includes(importLine)) {
      const updatedContent = `${importLine}\n${mainContent}`;
      fs.writeFileSync(mainFilePath, updatedContent);
      console.log('Added build verification to main.tsx');
    }
  }
} catch (error) {
  console.error('Warning: Could not add build verification:', error);
  // Non-fatal error, continue
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
    
    // Set NODE_ENV explicitly in case it's not being picked up
    process.env.NODE_ENV = 'production';
    
    execSync(`${envString} NODE_ENV=production VITE_DEBUG_BUILD=true vite build --mode production`, { 
      stdio: 'inherit',
      env: { ...process.env, ...envVars, NODE_ENV: 'production', VITE_DEBUG_BUILD: 'true' }
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
    nodeEnv: process.env.NODE_ENV || 'unknown',
    viteMode: targetEnv,
    builtWith: 'deploy.js script'
  };
  
  if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist');
  }
  
  fs.writeFileSync('dist/build-info.json', JSON.stringify(buildInfo, null, 2));
  console.log('Added build info to output directory');
  
  // Create a test HTML file that can be used to verify the build
  const testHtml = `
<!DOCTYPE html>
<html>
<head>
  <title>Build Verification</title>
  <meta charset="UTF-8">
</head>
<body>
  <h1>Build Verification Page</h1>
  <p>If you can see this page, the build was generated correctly.</p>
  <p>Environment: ${targetEnv}</p>
  <p>Build Time: ${new Date().toISOString()}</p>
  <script>
    document.write('<p>JavaScript is working in this build.</p>');
    console.log('Build verification page loaded');
  </script>
</body>
</html>
`;
  fs.writeFileSync('dist/verify.html', testHtml);
  console.log('Added verification page to dist/ folder');
  
} catch (error) {
  console.error('Warning: Could not write build info', error);
  // Non-fatal error, continue
}

console.log(`Deployment to ${targetEnv} completed!`);
console.log(`Next steps:
1. Verify that .env.${targetEnv} contains all required environment variables
2. Test the build locally with: npx serve dist
3. If issues persist, check build-env-debug.log and browser console logs
`);
