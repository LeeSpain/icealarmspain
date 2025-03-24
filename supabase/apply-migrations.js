
/**
 * Script to apply database migrations to your Supabase project
 * 
 * Usage:
 *   node apply-migrations.js [environment]
 * 
 * Where environment is one of:
 *   - development (default)
 *   - staging
 *   - production
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Get environment from command line arguments
const args = process.argv.slice(2);
const targetEnv = args[0] || 'development';

// Load environment variables from the appropriate .env file
const envFile = `.env.${targetEnv}`;
if (!fs.existsSync(envFile)) {
  console.error(`Error: Environment file '${envFile}' not found`);
  process.exit(1);
}

dotenv.config({ path: envFile });

// Check if required variables are set
const requiredVars = ['SUPABASE_PROJECT_ID', 'SUPABASE_ACCESS_TOKEN', 'SUPABASE_DB_PASSWORD'];
const missingVars = requiredVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error(`Error: Missing required environment variables: ${missingVars.join(', ')}`);
  console.error('Please set these variables in your .env file or environment');
  process.exit(1);
}

// Define the migrations directory
const migrationsDir = path.join(__dirname, 'migrations');

// Function to apply a single migration file
function applyMigration(filePath) {
  const sql = fs.readFileSync(filePath, 'utf8');
  const fileName = path.basename(filePath);
  
  console.log(`Applying migration: ${fileName}`);
  
  try {
    // You may need to adjust this command based on how you connect to your Supabase database
    // This example uses the Supabase CLI, but you could also use a direct psql connection
    const command = `echo "${sql}" | supabase db execute -f - --project-ref ${process.env.SUPABASE_PROJECT_ID}`;
    execSync(command, { stdio: 'inherit' });
    console.log(`Successfully applied migration: ${fileName}`);
    return true;
  } catch (error) {
    console.error(`Error applying migration ${fileName}:`, error.message);
    return false;
  }
}

// Function to apply all migrations in order
function applyAllMigrations() {
  if (!fs.existsSync(migrationsDir)) {
    console.error(`Error: Migrations directory not found at ${migrationsDir}`);
    process.exit(1);
  }
  
  // Get all SQL files and sort them alphabetically
  const migrationFiles = fs.readdirSync(migrationsDir)
    .filter(file => file.endsWith('.sql'))
    .sort();
    
  if (migrationFiles.length === 0) {
    console.log('No migration files found');
    return;
  }
  
  console.log(`Found ${migrationFiles.length} migration files`);
  
  // Apply each migration in order
  let successCount = 0;
  let failCount = 0;
  
  for (const file of migrationFiles) {
    const filePath = path.join(migrationsDir, file);
    const success = applyMigration(filePath);
    
    if (success) {
      successCount++;
    } else {
      failCount++;
      // Optionally, you can choose to exit early on failure
      // break;
    }
  }
  
  console.log('\nMigration Summary:');
  console.log(`- Total migrations: ${migrationFiles.length}`);
  console.log(`- Successfully applied: ${successCount}`);
  console.log(`- Failed: ${failCount}`);
  
  if (failCount > 0) {
    console.error('\nSome migrations failed. Please check the errors above.');
    process.exit(1);
  } else {
    console.log('\nAll migrations applied successfully!');
  }
}

// Run the migrations
console.log(`Applying migrations for ${targetEnv} environment...`);
applyAllMigrations();
