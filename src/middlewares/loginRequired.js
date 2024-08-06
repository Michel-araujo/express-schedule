export const loggedArea = (req, res, next) => {
    if (!req.session.user) {
        req.flash('errors', 'Por favor, faça login para acessar!')
        req.session.save(() => {
            res.redirect('/')
        })
    } else {
        next();
    }
}
export const loggedOutArea = (req, res, next) => {
    if (req.session.user) {
        res.redirect('/home')
    } else {
        next()
    }
}