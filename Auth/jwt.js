const jwt = require('jsonwebtoken')
const { token } = require('morgan')
const createError = require('http-errors')
const generateToken = user => {
    const Token = jwt.sign(user, 'secrete-key')
    return Token
}

const authenticateToken = (req, res, next) => {
    try {
        if (req.headers.cookie == undefined) {
            return res.status(401).send(createError.Unauthorized())
        }
        const authHeader = req.headers.cookie.split('=')
        const token = authHeader[1]
        const decoded = jwt.verify(token, 'secrete-key')
        req.userDetail = decoded
        next()
    } catch (error) {
        console.log( 'message :',error);

    }




}

module.exports = { generateToken, authenticateToken };