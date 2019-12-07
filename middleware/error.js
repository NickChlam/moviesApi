// error handling 
module.exports = function(err, req, res, next){
    return res.status(500).send('Internal Server Error, Try later ')
};