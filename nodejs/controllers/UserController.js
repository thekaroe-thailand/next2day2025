const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    UserController: {
        signin: async (req, res) => {
            try {
                const key = process.env.SECRET_KEY;
                const user = await prisma.user.findUnique({
                    where: {
                        username: req.body.username,
                        password: req.body.password,
                        status: "active"
                    },
                    select: {
                        id: true
                    }
                });
                if (!user) {
                    res.status(401).send("user not found");
                }
                const token = jwt.sign(user, key);
                res.send({ token: token });
            } catch (error) {
                res.status(500).send(error.message);
            }
        },
        info: async (req, res) => {
            try {
                const token = req.headers.authorization;
                const decoded = jwt.verify(token, process.env.SECRET_KEY);
                const id = decoded.id;
                const user = await prisma.user.findUnique({
                    where: { id: id },
                    select: { name: true }
                });
                res.send(user);
            } catch (error) {
                res.status(500).send(error.message);
            }
        }
    }
}
