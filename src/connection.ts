import { ConnectionConfig, Pool } from 'pg'
import "dotenv/config"

const conection: ConnectionConfig = { 
    user: process.env.DB_USER ,
    password: process.env.DB_PSW,
    host: process.env.DB_HOST,
    database: process.env.DATABASE,
    port: Number(process.env.DB_PORT)

}
export const pool = new Pool(conection)