declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV?: 'development' | 'production';
      PORT?: number;

      DATABASE_URI: string;

      ADMIN_EMAIL: string;
      ADMIN_PHONE_NUMBER: string;
      ADMIN_PASSWORD: string;

      EMAIL_SERVICE: string;
      EMAIL_USER: string;
      EMAIL_PASSWORD: string;
    }
  }
}

export {};
