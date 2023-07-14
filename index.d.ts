
declare {
    namespace Express {
      interface Request {
        user: {};
      }
    }
    namespace NodeJS {
        interface ProcessEnv {
          DATABASE_URL: string;
          PORT: string;
          NODE_ENV: string;
          JWT_SECRET: string;
          JWT_EXPIRES_IN: string;
          JWT_REFRESH_SECRET: string;
          JWT_REFRESH_EXPIRES_IN: string;
          BCRYPT_SALT: string;
        }
    }
}