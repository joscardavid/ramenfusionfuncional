import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vsoswdxjkuhjxghhdgnd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzb3N3ZHhqa3VoanhnaGhkZ25kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQxMzU0MjEsImV4cCI6MjA0OTcxMTQyMX0.LR6kbLljsp9mfZufu1YhS1paMMF7hgXIK4v2rNWISuQ';

export const supabase = createClient(supabaseUrl, supabaseKey);