import { Router } from "express";
import { TokenValidator } from "../libs/validateToken";

const router : Router = Router();

router
    .post('/newAppointment', newAppointment )
    .get('/getAppointmentOfPatient', TokenValidator, getAppointmentOfPatient )
    .get('/getAppointmentOfMedic', TokenValidator, getAppointmentOfMedic )
    .get('/getAppointment', TokenValidator, getAppointment );

export default router;