const jwt = require('jsonwebtoken')
const config = require('config')

function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('access denied. no token provided')
    
    try{
        const decodedPayload = jwt.verify(token, config.get('jwtPrivateKey')); // returns a decoded token or an error if it can not verify - gets private key from env variable 
        req.user = decodedPayload;
       
        next();
    }
    catch(ex){
        
        res.status(400).send({'error': ex.message});
    }
}

module.exports = auth