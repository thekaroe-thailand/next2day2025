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
        },
        save: async (req, res) => {
            try {
                const book = await prisma.book.findFirst({
                    where: { barcode: req.body.barcode }
                })
                if (!book) {
                    res.status(404).send({ message: 'book not found' });
                    return;
                }
                // แก้จาดตรงนี้
                let order = await prisma.order.findFirst({
                    where: { status: 'pending' }
                });
                if (!order) {
                    order = await prisma.order.create();
                }
                // ถึงตรงนี้
                await prisma.orderItem.create({
                    data: {
                        quantity: 1,
                        bookId: book.id,
                        price: book.price,
                        orderId: order.id
                    }
                });
                res.send({ message: 'success' });
            } catch (error) {
                res.status(500).send(error.message);
            }
        },
        orderList: async (req, res) => {
            const items = await prisma.orderItem.findMany({
                orderBy: {
                    id: 'desc'
                },
                include: {
                    book: true
                },
                where: {
                    order: {
                        status: 'pending'
                    }
                }
            });
            res.send(items);
        },
        deleteOrderItem: async (req, res) => {
            const item = await prisma.orderItem.delete({
                where: { id: parseInt(req.params.id) }
            });
            res.send({ message: 'success' });
        },
        confirmOrder: async (req, res) => {
            await prisma.order.updateMany({
                where: { status: 'pending' },
                data: { status: 'paid' }
            });
            res.send({ message: 'success' });
        },
        // บิลขาย
        countOrder: async (req, res) => {
            const count = await prisma.order.count({
                where: { status: 'paid' }
            });
            res.send({ count });
        },
        // รวมผลยอดขายทั้งหมด
        totalSale: async (req, res) => {
            // arrgregate = SUM,MAX,MIN,AVG
            const total = await prisma.orderItem.aggregate({
                _sum: { price: true },
                where: {
                    order: {
                        status: 'paid'
                    }
                }
            });
            res.send({ total: total._sum.price });
        }
    }
}