
const responseHandler = (req, res, next) => {

    if (res.statusCode && res.statusCode > 299 || res.statusCode < 200) next()
    res.json({
        isError: false,
        statusCode: res.statusCode,

    })


}


module.exports = { responseHandler }