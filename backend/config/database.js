import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const connectionString =
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL ||
  process.env.DATABASE_URL_UNPOOLED;

let sequelize;

if (connectionString) {
  const isSslRequired =
    connectionString.includes("neon.tech") ||
    connectionString.includes("sslmode=require") ||
    process.env.DB_SSL === "true";

  sequelize = new Sequelize(connectionString, {
    dialect: "postgres",
    logging: false,
    dialectOptions: isSslRequired
      ? {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        }
      : {},
  });
} else {
  const host =
    process.env.DB_HOST ||
    process.env.PGHOST ||
    process.env.POSTGRES_HOST;
  const dbName =
    process.env.DB_NAME ||
    process.env.PGDATABASE ||
    process.env.POSTGRES_DATABASE;
  const user =
    process.env.DB_USER ||
    process.env.PGUSER ||
    process.env.POSTGRES_USER;
  const password =
    process.env.DB_PASSWORD ||
    process.env.PGPASSWORD ||
    process.env.POSTGRES_PASSWORD;
  const port =
    process.env.DB_PORT ||
    process.env.PGPORT ||
    5432;

  const isSslRequired =
    host?.includes("neon.tech") ||
    process.env.DB_SSL === "true";

  sequelize = new Sequelize(dbName, user, password, {
    host,
    port,
    dialect: "postgres",
    logging: false,
    dialectOptions: isSslRequired
      ? {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        }
      : {},
  });
}

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to PostgreSQL successfully!");
    await sequelize.sync({
      alter: process.env.NODE_ENV === "development",
    });
    console.log("Table Synchronized!");
  } catch (error) {
    console.error("Connection failed", error);
    process.exit(1);
  }
};

export { sequelize, connectDB };
