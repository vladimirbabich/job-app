const ApiError = require('../error/ApiError')
const { User } = require('../models/models')

class UserController {
    async registration(req, res) {
        
        console.log(req.body)
        const { id, name, email, phone, pass } = req.query;
        const user = await User.create({ id, name, email, phone, pass })

        return res.json(user);
    }
    async login(req, res) {

    }
    async check(req, res, next) {
        console.log(req.query)
        // console.log(res)
        const { id } = req.query
        if (!id) {
            return next(ApiError.badRequest('Не задан ID'))
        }
        console.log(111);
        res.json(id);
    }
}

module.exports = new UserController();