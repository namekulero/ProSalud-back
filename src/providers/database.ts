import mysql from 'mysql2/promise';

const conexion = mysql.createPool({
    host      :  process.env.MYSQL_ADDON_HOST,
    user      :  process.env.MYSQL_ADDON_USER,
    password  :  process.env.MYSQL_ADDON_PASSWORD,
    database  :  process.env.MYSQL_ADDON_DB,
    port      :  3306
})

export default conexion;