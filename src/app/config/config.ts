import {PostgresConnectionOptions} from "typeorm/driver/postgres/PostgresConnectionOptions";
import { parse } from 'pg-connection-string';
import * as dotenv from 'dotenv';

dotenv.config();

export const jwtConfig = {
    secret: process.env.JWT_SECRET,
    config: {
        expiresIn: process.env.JWT_DURATION
    },
}
function requiredEnv(variable: string, defaultValue?: string): string {
    const value = process.env[variable];
    if (value === undefined && defaultValue === undefined) {
        throw new Error(`Environment variable ${variable} is required but not set.`);
    }
    return value || defaultValue!;
}

export const dingConfiguration = {
    secretToken: process.env.DING_API_KEY,
    url: process.env.DING_URL,
    customerUUID: process.env.DING_CUSTOMER_UUID,
    bypass: process.env.SMS_OTP_BYPASS === "true",
    otpCodeBypass: process.env.SMS_CODE_OTP_BYPASS
}
const dbConfig = parse(requiredEnv('DATABASE_URL'));
export const dataSourceConfig: PostgresConnectionOptions = {
    type: "postgres",
    host: dbConfig.host || "localhost",
    port: parseInt(dbConfig.port || "5432", 10),
    username: dbConfig.user || "postgres",
    password: dbConfig.password || "password",
    database: dbConfig.database || "postgres",
    logging: process.env.DB_LOGGING === "true",
    synchronize: process.env.NODE_ENV !== "production",
};



export const contentCount = +process.env.CONTENT_COUNT ? +process.env.CONTENT_COUNT : 1;