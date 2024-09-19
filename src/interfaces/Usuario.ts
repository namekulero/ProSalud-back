export interface Usuario {
    cedula: string,
    nombre: string,
    apellido: string,
    correo: string,
    clave: string,
    sede?: number,
    estado: boolean,
    tipoPaciente: number,
    tipoUsuario: number,
    hojaVida: number
}

export interface InsertUsuario {
    cedula: string,
    nombre: string,
    apellido: string,
    correo: string,
    clave: string,
    sede?: number,
    estado?: boolean,
    tipoPaciente: number,
    tipoUsuario: number,
    hojaVida?: number
}