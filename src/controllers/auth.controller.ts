import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { TokenValidator } from "../libs/validateToken";
import { DatosUsuario } from "../interfaces/DatosUsuario";
import { InsertUsuario } from "../interfaces/Usuario";
import { crearUsuario } from "../services/usuario.service";

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
    const hojaUsuario: number = req.body.pwdUser;
    const tPaciente: number = req.body.siteUser;
    const tUsuario: number = 1;

    const usuario: InsertUsuario = {
        cedula: cedulaUsuario,
        nombre: nombreUsuario,
        apellido: apellidoUsuario,
        correo: correoUsuario,
        clave: claveUsuario,
        sede: sedeUsuario,
        estado: estadoUsuario,
        hojaVida: hojaUsuario,
        tipoPaciente: tPaciente,
        tipoUsuario: tUsuario
    }

    try {
        const respuesta = await crearUsuario(datos, usuario);
        if (respuesta) {
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

}

export const profile = async (req: Request, res: Response) => {

}