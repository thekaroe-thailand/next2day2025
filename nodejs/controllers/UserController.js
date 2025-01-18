const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    UserController: {
        login: (req, res) => {
            const key = process.env.SECRET_KEY;
            const data = {
                id: 1
            }
            const token = jwt.sign(data, key);
            res.send(token);
        }
    }
}
