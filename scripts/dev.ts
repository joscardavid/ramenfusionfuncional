import { spawn } from 'child_process';
import { config } from 'dotenv';

// Load environment variables
config();

// Function to run a command with proper error handling
function runCommand(command: string, args: string[]) {
  const child = spawn(command, args, {
    stdio: 'inherit',
    shell: true,
    env: { ...process.env, FORCE_COLOR: 'true' }
  });

  child.on('error', (error) => {
    console.error(`Error running ${command}:`, error);
    process.exit(1);
  });

  return child;
}

// Start backend first, then frontend
console.log('🚀 Starting development servers...\n');

const backend = runCommand('npm', ['run', 'dev:server']);

// Wait a bit before starting frontend to ensure backend is ready
setTimeout(() => {
  const frontend = runCommand('npm', ['run', 'dev:client']);

  // Handle process termination
  const cleanup = () => {
    console.log('\n👋 Shutting down development servers...');
    backend.kill();
    frontend.kill();
    process.exit(0);
  };

  process.on('SIGTERM', cleanup);
  process.on('SIGINT', cleanup);

  // Handle child process errors
  frontend.on('exit', (code) => {
    if (code !== 0 && code !== null) {
      console.error('Frontend process exited with code:', code);
      cleanup();
    }
  });
}, 2000);

backend.on('exit', (code) => {
  if (code !== 0 && code !== null) {
    console.error('Backend process exited with code:', code);
    process.exit(1);
  }
});