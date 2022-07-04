import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { db } from '../dbStrategy/mongo.js';

//Controle de Login
export async function loginUser(req, res) {
    const user = req.body;
    const now = Date.now();
    try {
        const userDB = await db.collection('users').findOne({ email: user.email });
        if (userDB && bcrypt.compareSync(user.password, userDB.password)) {
            const token = uuid();

            await db.collection('sessions').insertOne({
                token,
                userId: userDB._id,
                lastStatus: now
            });

            return res.status(201).send({ token });
        } else {
            return res.status(401).send('Senha ou email incorretos!');
        }
    } catch (error) {
        res.status(401);
    }
}
//Controle de sign-up
export async function createUser(req, res) {
    const newUser = req.body;
    let { name, email, password } = newUser;
    name = name.toLowerCase();
    name = name[0].toLocaleUpperCase() + name.slice(1);

    const criptoPassword = bcrypt.hashSync(password, 5);

    try {
        await db.collection("users").insertOne({ name, email, password: criptoPassword });
        res.send("Usuário criado!")
    } catch (error) {
        res.status(409);
    }
}
//controle de sign-out
export async function userLogout(req, res) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    try {
        await db.collection("sessions").remove({token});
        res.status(201).send("Logout efetuado com sucesso!");
    } catch (error) {
        res.status(500).send("Não foi possível efetuar o logout");
    }
}
