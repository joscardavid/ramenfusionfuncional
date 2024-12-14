const LOG_LEVELS = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
} as const;

type LogLevel = keyof typeof LOG_LEVELS;

class Logger {
  private level: number = LOG_LEVELS.INFO;

  setLevel(level: LogLevel) {
    this.level = LOG_LEVELS[level];
  }

  private log(level: LogLevel, message: string, ...args: any[]) {
    if (LOG_LEVELS[level] >= this.level) {
      const timestamp = new Date().toISOString();
      const formattedArgs = args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : arg
      );
      
      console.log(`[${timestamp}] ${level}: ${message}`, ...formattedArgs);
    }
  }

  debug(message: string, ...args: any[]) {
    this.log('DEBUG', message, ...args);
  }

  info(message: string, ...args: any[]) {
    this.log('INFO', message, ...args);
  }

  warn(message: string, ...args: any[]) {
    this.log('WARN', message, ...args);
  }

  error(message: string, ...args: any[]) {
    this.log('ERROR', message, ...args);
  }
}

export const logger = new Logger();

// Set log level based on environment
if (import.meta.env.DEV) {
  logger.setLevel('DEBUG');
}