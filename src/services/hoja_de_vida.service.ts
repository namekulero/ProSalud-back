import conexion from "../providers/database";
import { HojaDeVida } from "../interfaces/HojaDeVida";

export async function crearHojaVida(datos: HojaDeVida) {
    try {
        const query = `
            INSERT INTO HOJAS_VIDA (
                direccion, estadoUsuario, telefonoUsuario, idEps
            ) VALUES (?, ?, ?, ?);
        `;
        const [resultado] = await conexion.query(query, [
            datos.direccion,
            datos.estadoUsuario,
            datos.telefonoUsuario,
            datos.idEps
        ]);

        if (!resultado) {
            return { success: false, message: 'Error creando hoja de vida.' };
        }

        const insertId = (resultado as any).insertId;
        
        if (!insertId) {
            return { success: false, message: 'Error creando hoja de vida.' };
        }

        console.log('Hoja de vida creada exitosamente.', resultado);
        return { success: true, message: 'Hoja de vida creada exitosamente.', hojaVidaId: insertId };
    } catch (error) {
        console.error('Error creando hoja de vida: ', error);
        return { success: false, message: 'Error creando hoja de vida.' };
    }
}
export async function modificarHojaVida(idHoja_Vida: HojaDeVida, datos: HojaDeVida) {
    try {
        const query = `
            UPDATE HOJAS_VIDA
            SET direccion = ?, estadoUsuario = ?, telefonoUsuario = ?, idEps = ?
            WHERE idHoja_Vida = ?;
        `;
        const [resultado] = await conexion.query(query, [
            datos.direccion,
            datos.estadoUsuario,
            datos.telefonoUsuario,
            datos.idEps,
            idHoja_Vida
        ]);

        if ((resultado as any).affectedRows === 0) {
            return { success: false, message: 'Hoja de vida no encontrada o sin cambios.' };
        }

        console.log('Hoja de vida modificada exitosamente.', resultado);
        return { success: true, message: 'Hoja de vida modificada exitosamente.' };
    } catch (error) {
        console.error('Error modificando hoja de vida: ', error);
        return { success: false, message: 'Error modificando hoja de vida.' };
    }
}

export async function eliminarHojaVida(idHoja_Vida: HojaDeVida) {
    try {
        const query = 'DELETE FROM HOJAS_VIDA WHERE idHoja_Vida = ?;';
        const [resultado] = await conexion.execute(query, [idHoja_Vida]);

        if ((resultado as any).affectedRows === 0) {
            return { success: false, message: 'Hoja de vida no encontrada o ya eliminada.' };
        }

        console.log('Hoja de vida eliminada exitosamente.', resultado);
        return { success: true, message: 'Hoja de vida eliminada exitosamente.' };
    } catch (error) {
        console.error('Error eliminando hoja de vida: ', error);
        return { success: false, message: 'Error eliminando hoja de vida.' };
    }
}
