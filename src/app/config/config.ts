import {PostgresConnectionOptions} from "typeorm/driver/postgres/PostgresConnectionOptions";
import sgMail from "@sendgrid/mail";

export const jwtConfig = {
    secret: process.env.JWT_SECRET,
    config: {
        expiresIn: process.env.JWT_DURATION,
    },
};

export const dataSourceConfig: PostgresConnectionOptions = {
    type: "postgres",
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: process.env.DB_LOGGING === "true",
    synchronize: true,
    ssl:
        process.env.DB_NAME === "postgres"
            ? false
            : {
                rejectUnauthorized: false,
            },
};

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export interface SendgridConfig {
    sgMail: typeof sgMail;
    from: string;
}

export const sendgridConfig: SendgridConfig = {
    sgMail,
    from: process.env.SENDGRID_EMAIL_FROM,
};