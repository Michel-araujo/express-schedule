export const accessLogs = (req, res, next) => {
    res.locals.siteTitle = `Nome do site - ${req.path !== '/' ? req.path : 'home'}`
    console.log(`Requisicao na url: ${req.path !== '/' ? req.path : '/home'}`)
    next()
}

