import 'module-alias/register'
import mongoose from "mongoose";
import app from "./app";
import { Server } from "http";
import config from './config';

process.on("uncaughtException", (error) => {
  console.error(error);
  process.exit(1);
});

let server: Server;


async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log(`🛢   Database is connected successfully`);

    app.listen(config.port, () => {
      console.log(`Application  listening on port ${config.port}`);
    });
  } catch (err) {
    console.error("Failed to connect database", err);
  }

  process.on("unhandledRejection", (error) => {
    if (server) {
      server.close(() => {
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

bootstrap();
