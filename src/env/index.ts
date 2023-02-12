import envDevelopment from './env.development';
import envProduction from './env.production';

export interface Env {
  API_URL: string;
  API_KEY: string;
}

const env = !__DEV__ ? envDevelopment : envProduction;

export default env;
