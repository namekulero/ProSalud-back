import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { TokenValidator } from "../libs/validateToken";
import { DatosUsuario } from "../interfaces/DatosUsuario";
import { InsertUsuario, Usuario } from "../interfaces/Usuario";
import { crearUsuario, getUsuarioPorCorreo, getUsuarioPorID, validarClave } from "../services/usuario.service";

export const signup = async (req: Request, res: Response) => {
    const direccionDato = req.body.direccion;
    const vivoDato: boolean = true;
    const telefonoDato = req.body.telefono;
    const epsDato: number = req.body.eps;

    const datos: DatosUsuario = {
        direccion: direccionDato,
        vivo: vivoDato,
        telefono: telefonoDato,
        idEps: epsDato
    };
    
    const cedulaUsuario = req.body.cedula;
    const nombreUsuario = req.body.nombre;
    const apellidoUsuario = req.body.apellido;
    const correoUsuario = req.body.correo;
    const claveUsuario = req.body.clave;
    const sedeUsuario: number = 4;
    const estadoUsuario: boolean = true;
    const tPaciente: number = req.body.tipo;
    const tUsuario: number = 1;

    const usuario: InsertUsuario = {
        cedula: cedulaUsuario,
        nombre: nombreUsuario,
        apellido: apellidoUsuario,
        correo: correoUsuario,
        clave: claveUsuario,
        sede: sedeUsuario,
        estado: estadoUsuario,
        tipoPaciente: tPaciente,
        tipoUsuario: tUsuario
    }

    try {
        const respuesta = await crearUsuario(datos, usuario);
        if (respuesta.success == true) {
            console.log("Respuesta de registro ", respuesta);
            res.status(200).header('auth-token', respuesta.token).json({ success: true, message: 'Usuario creado exitosamente.', usuario: respuesta.usuario });
        } else {
            res.status(500).json({ success: false, message: 'Error creando usuario.' });
        }
    } catch (error) {
        console.error("Error creando usuario: ", error);
        res.status(500).json({ success: false, message: 'Error creando usuario.' });
    }
}

export const signin = async (req: Request, res: Response) => {
    try {
        const correo = req.body.correo;
        const clave = req.body.clave;
        const usuario: any = await getUsuarioPorCorreo(correo);

        console.log(usuario);
        if (!usuario) {
            return res.status(404).json({ success: false, message: 'El usuario no existe.' });
        }

        const correctPassword: boolean = await validarClave(clave, usuario?.pwdUsuario || '');

        if (!correctPassword) {
            return res.status(404).json({ success: false, message: 'La contraseña no es correcta.' });
        }
        
        const token: string = jwt.sign({ _id: usuario.CC }, process.env.TOKEN_SECRET || ' ', {
            expiresIn: 60 * 60 
        });

        res.cookie("token", token);

        return res.status(200).header('auth-token', token).json({ usuario });

    } catch (error) {
        console.error("Error durante inicio de sesión: ", error);
        return res.status(500).json({ success: false, message: 'Error interno del servidor.' });
    }
}

export const profile = async (req: Request, res: Response) => {
    console.log(req.id);
    const usuario: Usuario | null = await getUsuarioPorID(req.id);

    if (!usuario) {
        console.log(usuario)
        return res.status(404).json({ success: false, message: 'Usuario no encontrado.' });
    }

    res.status(200).json({ success: true, usuario });
}