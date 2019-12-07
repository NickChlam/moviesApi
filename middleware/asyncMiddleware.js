module.exports = function asnycMiddleware(handler) {
    // return an async function 
    return async ( req , res, next) => {
        try{
            await handler(req, res);
        }
        catch(ex) {
            // TODO: set up logging
            next(ex);
        }
    }
}