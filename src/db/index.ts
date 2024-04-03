import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.DB_PORT || '5432';

const connectionType = process.env.DB_CONNECTION_TYPE;

let config: any;

if(connectionType === "URL") {
    config = {
        connectionString: process.env.DATABASE_URL,
    };
} else {
    config = {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: parseInt(port),
    };
}

const pool = new Pool(config);


export default pool;
