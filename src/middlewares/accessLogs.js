export const accessLogs = (req, res, next) => {
    res.locals.siteTitle = `Nome do site - ${req.path !== '/' ? req.path : 'home'}`
    res.locals.user = req.session.user
    console.log(`Requisicao na url: ${req.path !== '/' ? req.path : '/home'}`)
    next()
}

