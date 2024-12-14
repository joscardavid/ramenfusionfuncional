import { createClient } from '@supabase/supabase-js';
import { logger } from '../utils/logger';

const supabaseUrl = 'https://vsoswdxjkuhjxghhdgnd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzb3N3ZHhqa3VoanhnaGhkZ25kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQxMzU0MjEsImV4cCI6MjA0OTcxMTQyMX0.LR6kbLljsp9mfZufu1YhS1paMMF7hgXIK4v2rNWISuQ';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Test connection
supabase.from('tables').select('count(*)', { count: 'exact' })
  .then(({ count, error }) => {
    if (error) {
      logger.error('Supabase connection test failed:', error);
    } else {
      logger.info('Supabase connection test successful. Table count:', count);
    }
  });