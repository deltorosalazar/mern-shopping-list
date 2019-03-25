const jwt = require('jsonwebtoken')
const config = require('config')

function auth(req, res, next) {
  const token = req.header('X-AUTH-TOKEN')

  if (!token) return res.status(401).json({msg: 'No token, authorization denied'})

  try {
    const decoded = jwt.verify(token, config.get('JWTSecret'))
  
    req.user = decoded
  
    next()    
  } catch (error) {
    return res.status(400).json({msg: 'Token is not valid'}) 
  }
}


module.exports = auth