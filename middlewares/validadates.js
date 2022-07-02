import { db } from "../dbStrategy/mongo.js";
import joi from "joi";

//Para validações de usuário e do token
export async function validateUser(req, res, next) {
    const { authorization } = req.headers;

    const token = authorization?.replace('Bearer ', '');
    const session = await db.collection('sessoes').findOne({ token });
    if(!session){
        return res.sendStatus(401);
    }
    res.locals.session = session;
    next();
}
//Para validações do login
export async function validateLogin(req, res, next){
    const user = req.body;

    const loginSchema = joi.object({
        email: joi.string().regex(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+/).required(),
        password: joi.string().required().min(6)
    });

    const { error } = loginSchema.validate(user);

    if(error){
        return res.sendStatus(422);
    }
    const verifyUser = await db.collection("users").findOne({email: user.email});

    if(!verifyUser){
        return res.status(404).send("Usuário não encontrado!")
    }
    if (verifyUser.email !== user.email || verifyUser.password !== user.password){
        return res.send("E-mail ou senha incorretos!");
    }
}

export function validateOrder(req, res, next){
    const { order } = req.body;
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

}

