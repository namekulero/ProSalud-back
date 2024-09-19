import { hash } from "crypto";
import { DatosUsuario } from "../interfaces/DatosUsuario";
import { InsertUsuario, Usuario } from "../interfaces/Usuario";
import conexion from "../providers/database";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function crearUsuario(datos: DatosUsuario, usuario: InsertUsuario) {
    try {
        const datosQuery = 'INSERT INTO HOJAS_VIDA (direccion, estadoUsuario, telefonoUsuario, idEps) VALUES (?, ?, ?, ?);';
        var vivoNumero: number = 1;
        if (!datos.vivo) {
            vivoNumero = 0;
        }
        const [datosResultado] = await conexion.query(datosQuery, [datos.direccion, vivoNumero, datos.telefono, datos.idEps]);
        const datosId = (datosResultado as any).insertId;

        const hashClave = await encriptarClave(usuario.clave);

        const nuevoUsuario: InsertUsuario = {
            cedula: usuario.cedula,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            correo: usuario.correo,
            clave: hashClave,
            sede: usuario.sede,
            estado: usuario.estado,
            tipoPaciente: usuario.tipoPaciente,
            tipoUsuario: usuario.tipoUsuario,
            hojaVida: datosId
        };

        const usuarioQuery = 'INSERT INTO USUARIOS SET CC=?, nombreUsuario=?, apellidoUsuario=?, emailUsuario=?, pwdUsuario=?, idSede=?, estadoUsuario=?, idHoja_Vida=?, idTipoPaciente=?, idTipoUsuario=?';
        var estadoNumero: number = 1;
        if (!nuevoUsuario.estado) {
            estadoNumero = 0;
        }
        const usuarioResultado: any = await conexion.query(usuarioQuery, [nuevoUsuario.cedula, nuevoUsuario.nombre, nuevoUsuario.apellido, nuevoUsuario.correo, nuevoUsuario.clave, nuevoUsuario.sede, estadoNumero, datosId, nuevoUsuario.tipoPaciente, nuevoUsuario.tipoUsuario]);
        const token = jwt.sign({_id: usuarioResultado[0].insertId}, process.env.TOKEN_SECRET || '');
        if (!usuarioResultado) {
            return { success: false, message: 'Error creando usuario.', token: token, usuario: nuevoUsuario };
        }
        console.log('Usuario creado exitosamente.', usuarioResultado);
        return { success: true, message: 'Datos y usuario creados exitosamente.', token: token, usuario: { nuevoUsuario, datos } };
    } catch (error) {
        console.error('Error creando datos del usuario: ', error);
        return { success: false, message: 'Error creando usuario.' };
    }
}

export async function encriptarClave(clave: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(clave, salt);
}