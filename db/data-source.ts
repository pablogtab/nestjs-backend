import { DataSource, DataSourceOptions } from 'typeorm';

const dotenv = require('dotenv');
dotenv.config({ path: 'config/.env' });


export const dataSourceOptions: DataSourceOptions = {
    //name:'default', //SOLO SE COLOCA SI NO ES LA PRINCIPAL!!
    type: 'mssql',
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    port: 1433,
    options: {
        trustServerCertificate: true
    },
    entities: [__dirname + '/../**/*.entity.js'], // Aca indicamos que tablas (entidades) van a esta conexion
    migrations: [__dirname + '/../migrations/*default.js'], //Aca indicamos que archivos de migracion debe mirar
}
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;