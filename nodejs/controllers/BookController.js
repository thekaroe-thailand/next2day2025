const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    BookController: {
        list: async (req, res) => {
            const books = await prisma.book.findMany();
            res.send(books);
        },
        create: async (req, res) => {
            const book = await prisma.book.create({
                data: req.body
            });
            res.send(book);
        },
        update: async (req, res) => {
            const book = await prisma.book.update({
                where: { id: parseInt(req.params.id) },
                data: req.body
            });
            res.send(book);
        },
        delete: async (req, res) => {
            const book = await prisma.book.delete({
                where: { id: parseInt(req.params.id) }
            });
            res.send(book);
        }
    }
}