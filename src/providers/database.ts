import dotenv from 'dotenv';
dotenv.config();

import mysql from 'mysql2/promise';

const conexion = mysql.createPool({
    host      :  process.env.MYSQL_ADDON_HOST,
    port      :  3306,
    database  :  'ProyectoIntegrador1',
    user      :  process.env.MYSQL_ADDON_USER,
    password  :  process.env.MYSQL_ADDON_PASSWORD
})

console.log('Conexión exitosa a la base de datos.');

export default conexion;