function admin(req, res, next) {
    // req.user is set in previous middleware do we have a isAdmin and is it true - forbidden
    if( !req.user.isAdmin) return res.status(403).send('Access denied')

    // if is admin pass control to the next middleware
    next()
}

module.exports = admin