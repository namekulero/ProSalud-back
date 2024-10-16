import { hash } from "crypto";
import { DatosUsuario } from "../interfaces/DatosUsuario";
import { InsertUsuario, Usuario } from "../interfaces/Usuario";
import conexion from "../providers/database";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { DatosOrden } from "../interfaces/DatosOrden";


export async function crearOrdenMedica(datosOrden: DatosOrden) {
    try {
        const ordenQuery = 'INSERT INTO ORDENES_MEDICAS (idPaciente, descripcion, fecha) VALUES (?, ?, ?);';
        const [ordenResultado] = await conexion.query(ordenQuery, [datosOrden.idOrden, datosOrden.descripcion, datosOrden.fecha]);
        
        if (!ordenResultado) {
            return { success: false, message: 'Error creando orden médica.' };
        }
        
        console.log('Orden médica creada exitosamente.', ordenResultado);
        return { success: true, message: 'Orden médica creada exitosamente.', orden: datosOrden };
    } catch (error) {
        console.error('Error creando orden médica: ', error);
        return { success: false, message: 'Error creando orden médica.' };
    }
}



export async function eliminarOrdenMedica(idOrden: DatosOrden) {
    try {
        const deleteQuery = 'DELETE FROM ORDENES_MEDICAS WHERE idOrden = ?;';
        const [resultado] = await conexion.execute(deleteQuery, [idOrden]);
        
        if ((resultado as any).affectedRows === 0) {
            return { success: false, message: 'Error eliminando orden médica o no encontrada.' };
        }
        
        console.log('Orden médica eliminada exitosamente.', resultado);
        return { success: true, message: 'Orden médica eliminada exitosamente.' };
    } catch (error) {
        console.error('Error eliminando orden médica: ', error);
        return { success: false, message: 'Error eliminando orden médica.' };
    }
}


export async function obtenerInfoPacientePorCita(idCita: DatosOrden) {
    try {
        const query = `
            SELECT p.nombre, p.documento, 
            YEAR(CURDATE()) - YEAR(p.fechaNacimiento) - 
            IF(STR_TO_DATE(CONCAT(YEAR(CURDATE()), '-', MONTH(p.fechaNacimiento), '-', DAY(p.fechaNacimiento)), '%Y-%c-%e') > CURDATE(), 1, 0) AS edad 
            FROM CITAS c
            JOIN PACIENTES p ON c.idPaciente = p.idPaciente
            WHERE c.idCita = ?;
        `;
        
        const [rows,fields]:[any,any] = await conexion.execute(query, [idCita]);
        
        if (rows.length === 0) {
            return { success: false, message: 'No se encontró información para el idCita proporcionado.' };
        }
        
        const infoPaciente =rows.map((row: any) => ({
                    nombre: String(row.nombre),
                    documento: String(row.documento),
                    edad: String(row.edad)
                })); ;
        
        console.log('Información del paciente obtenida exitosamente.', infoPaciente);
        return { success: true, infoPaciente };
    } catch (error) {
        console.error('Error obteniendo información del paciente: ', error);
        return { success: false, message: 'Error obteniendo información del paciente.' };
    }
}


