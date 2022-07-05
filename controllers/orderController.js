import { db } from '../dbStrategy/mongo.js'
import joi from 'joi';
import dayjs from 'dayjs';
import { ObjectId } from 'mongodb';

export async function orderGet(req, res) {

    const session = res.locals.session;
    const ordersList = await db
        .collection('wallets')
        .find({ userId: session.userId })
        .toArray();

    const user = await db.collection("users").findOne({ _id: session.userId});
    res.status(201).send({lista: ordersList, name: user.name});
}

export async function createOrder(req, res) {
    const session = res.locals.session;
    let order = req.body;

    const orderSchema = joi.object({
        descricao: joi.string().required(),
        valor: joi.number().required(),
        type: joi.string().valid('entrada', 'saida').required()
    });
    const { error } = orderSchema.validate(order);

    if (error) {
        return res.sendStatus(422);
    }
    await db.collection("wallets").insertOne({... order, userId: session.userId, dia: dayjs().format('DD/MM')});
    const ordersList = await db.collection("wallets").find({userId: session.userId}).toArray();
    res.status(201).send(ordersList);
}
export async function deleteOrder(req, res){
    const order = req.body;
    console.log(order)
    const id = order._id;
    try {
        await db.collection("wallets").deleteOne({ _id: new ObjectId(id) })
        console.log()
        const ordersList = await db
        .collection('wallets')
        .find({ userId: new ObjectId(order.userId) })
        .toArray();
        console.log(ordersList)
        return res.status(201).send(ordersList);
    } catch (error) {
        res.status(401).send(error);
    }
}