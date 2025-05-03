import { z } from 'zod';

// Define the shape of environment variables
const envSchema = z.object({
  apiUrl: z.string(),
  apiTimeout: z.number(),
  enableAnalytics: z.boolean(),
  enableLogging: z.boolean(),
  appName: z.string(),
  appVersion: z.string(),
});

type Env = z.infer<typeof envSchema>;

// Validate required environment variables
const requiredEnvVars = [
  'REACT_APP_API_URL',
  'REACT_APP_API_TIMEOUT',
  'REACT_APP_ENABLE_ANALYTICS',
  'REACT_APP_ENABLE_LOGGING',
  'REACT_APP_APP_NAME',
  'REACT_APP_VERSION',
] as const;

requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
});

// Type-safe environment variables
export const env: Env = {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  apiUrl: process.env.REACT_APP_API_URL!,
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  apiTimeout: parseInt(process.env.REACT_APP_API_TIMEOUT!),
  enableAnalytics: process.env.REACT_APP_ENABLE_ANALYTICS === 'true',
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  enableLogging: process.env.REACT_APP_ENABLE_LOGGING! === 'true',
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  appName: process.env.REACT_APP_APP_NAME!,
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  appVersion: process.env.REACT_APP_VERSION!,
};

// Helper function to check if we're in development mode
export const isDevelopment = process.env.NODE_ENV === 'development';

// Helper function to check if we're in production mode
export const isProduction = process.env.NODE_ENV === 'production';

// Helper function to check if we're in staging mode
export const isStaging = process.env.REACT_APP_STAGING === 'true';

// import { env, isDevelopment } from '../utils/env';
