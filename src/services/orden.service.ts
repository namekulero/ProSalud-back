import conexion from "../providers/database";
import { DatosOrden } from "../interfaces/DatosOrden";


export async function crearOrdenMedica(datosOrden: DatosOrden) {
    try {
        const ordenQuery = 'INSERT INTO ORDENES_MEDICAS (idCita, estado, descripcion, fecha) VALUES (?,?, ?, ?);';
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
            SELECT u.nombre, u.documento,YEAR(CURDATE()) - YEAR(h.fechaNacimiento)AS edad 
            FROM CITAS c
            JOIN USUARIOS u ON c.idUsuarioCC = u.CC
            JOIN HISTORIA_MEDICA h ON u.CC = h.idUsuarioCC
            WHERE c.idCita = ?;
        `;

        const [rows, fields]: [any, any] = await conexion.execute(query, [idCita]);

        if (rows.length === 0) {
            return { success: false, message: 'No se encontró información para el idCita proporcionado.' };
        }

        const infoPaciente = rows.map((row: any) => ({
            nombre: String(row.nombre),
            documento: String(row.documento),
            edad: String(row.edad)
        }));;

        console.log('Información del paciente obtenida exitosamente.', infoPaciente);
        return { success: true, infoPaciente };
    } catch (error) {
        console.error('Error obteniendo información del paciente: ', error);
        return { success: false, message: 'Error obteniendo información del paciente.' };
    }
}

    export async function obtenerDatosOrden(idOrden: DatosOrden) {
        try {
            const query = `
            select O.descripcion, O.estado
            from ORDENES_MEDICAS O
            WHERE O.idOrden_medica = ?;
            `;
    
            const [resultado]= await conexion.execute(query, [idOrden]);

    
            console.log('Información del paciente obtenida exitosamente.', resultado);
            return { success: true, resultado };
        } catch (error) {
            console.error('Error obteniendo información del paciente: ', error);
            return { success: false, message: 'Error obteniendo información del paciente.' };
        }

    }

