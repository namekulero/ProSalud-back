import { Router } from "express";
import { signup, signin, profile } from "../controllers/auth.controller";
import { TokenValidator } from "../libs/validateToken";

const router : Router = Router();

router
    .post('/signup', signup )
    .post('/signin', signin )
    .get('/profile', TokenValidator, profile );

export default router;