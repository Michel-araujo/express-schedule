export const tokenValidation = (err, req, res, next) => {
    console.table(err)
    if (err && err.code === 'EBADCSRFTOKEN') {
        res.locals.siteTitle = `Erro`
        return res.render('404')
    }
}

export const csrfValidation = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken()
    console.log(res.locals.csrfToken)
    next()
}