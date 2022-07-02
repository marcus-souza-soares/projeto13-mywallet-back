import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { db } from '../dbStrategy/mongo.js';
import joi from 'joi';

export async function loginUser(req, res){
    const { user } = req.body;

    try {
        await db.collection("sessions").insertOne({usuario: user});
        res.send("logou");
    } catch (error) {
        res.status(401);
    }
}