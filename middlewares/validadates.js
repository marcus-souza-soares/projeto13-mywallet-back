import { db } from "../dbStrategy/mongo.js";
import joi from "joi";

//Para validações de usuário e do token
export async function validateUser(req, res, next) {
    const { authorization } = req.headers;
    console.log(authorization)
    const token = authorization?.replace('Bearer ', '');
    const session = await db.collection('sessions').findOne({ token });
    // if(!session){
    //     return res.sendStatus(409);
    // }
    res.locals.session = session;
    next();
}
//Para validação da criação do usuário
export async function validateSignUp(req,res,next){
    const sign_up = req.body;

    const signupSchema = joi.object({
        name: joi.string().min(3).required(),
        email: joi.string().regex(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+/).required(),
        password: joi.string().min(6).required()
    });
    const { error } = signupSchema.validate(sign_up);
    if(error){
        return res.sendStatus(422);
    }
    try {
        const verifySignUp = await db.collection('users').findOne({email: sign_up.email});
        if (verifySignUp){
            return res.status(401).send("Usuário já existe!");
        }
    } catch (error) {
        return res.sendStatus(422);
    }
    next();
}

//Para validações do login
export async function validateLogin(req, res, next){
    const login = req.body;

    const loginSchema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required().min(6)
    });
    const { error } = loginSchema.validate(login);
    if(error){
        return res.sendStatus(422);
    }
    try {
        const verifyUser = await db.collection("users").findOne({email: login.email});
        if(!verifyUser){
            return res.status(404).send("Usuário não encontrado!")
        }
    } catch (error) {
        return res.status(404).send(error.details);
    }
    next();
}

export function validateOrder(req, res, next){
    const order = req.body;
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    const orderSchema = joi.object({

    })
}

