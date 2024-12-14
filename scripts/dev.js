import { spawn } from 'child_process';

// Function to run a command
function runCommand(command, args) {
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

console.log('🚀 Starting development servers...\n');

// Start backend
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
}, 2000);