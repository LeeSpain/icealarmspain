// This file contains scripts for database maintenance and backup
// You can run these scripts manually or set up cron jobs for automated execution

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// Environment variables
const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const BACKUP_DIR = process.env.BACKUP_DIR || './backups';

// Initialize Supabase client with service role key (has admin privileges)
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

/**
 * Creates a backup of the database
 */
async function createDatabaseBackup() {
  try {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = path.join(BACKUP_DIR, `backup-${timestamp}.sql`);
    
    // Ensure backup directory exists
    if (!fs.existsSync(BACKUP_DIR)) {
      fs.mkdirSync(BACKUP_DIR, { recursive: true });
    }
    
    // Use pg_dump to create a backup
    // Note: This requires pg_dump to be installed and configured
    console.log('Creating database backup...');
    execSync(`pg_dump "${process.env.SUPABASE_DB_URL}" > "${backupPath}"`);
    
    console.log(`Backup created successfully at: ${backupPath}`);
    
    // Optional: Upload backup to storage
    // const file = fs.readFileSync(backupPath);
    // const { data, error } = await supabase.storage
    //   .from('backups')
    //   .upload(`database/${path.basename(backupPath)}`, file);
    
    // if (error) throw error;
    // console.log('Backup uploaded to storage:', data?.path);
    
    // Optional: Delete old backups (keep last 7 for example)
    pruneOldBackups();
    
    return { success: true, path: backupPath };
  } catch (error) {
    console.error('Error creating database backup:', error);
    return { success: false, error };
  }
}

/**
 * Deletes old backups, keeping the most recent ones
 */
function pruneOldBackups(keepCount = 7) {
  try {
    const files = fs.readdirSync(BACKUP_DIR)
      .filter(file => file.startsWith('backup-'))
      .map(file => ({
        name: file,
        path: path.join(BACKUP_DIR, file),
        time: fs.statSync(path.join(BACKUP_DIR, file)).mtime.getTime()
      }))
      .sort((a, b) => b.time - a.time); // Sort by time descending (newest first)
    
    // Delete all but the latest 'keepCount' backups
    if (files.length > keepCount) {
      const filesToDelete = files.slice(keepCount);
      filesToDelete.forEach(file => {
        fs.unlinkSync(file.path);
        console.log(`Deleted old backup: ${file.name}`);
      });
    }
  } catch (error) {
    console.error('Error pruning old backups:', error);
  }
}

/**
 * Runs database health checks
 */
async function databaseHealthCheck() {
  try {
    // Execute a simple query to check database connectivity
    const { data, error } = await supabase.from('profiles').select('id').limit(1);
    
    if (error) throw error;
    
    console.log('Database connection successful');
    
    // Add more health checks as needed:
    // - Table sizes
    // - Index usage
    // - Slow queries
    // - etc.
    
    return { success: true };
  } catch (error) {
    console.error('Database health check failed:', error);
    return { success: false, error };
  }
}

// Export functions to be used in scripts or API endpoints
export {
  createDatabaseBackup,
  pruneOldBackups,
  databaseHealthCheck
};
