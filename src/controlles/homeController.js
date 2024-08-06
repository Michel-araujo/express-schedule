
export const homeController = (req, res) => {
    if(!req.session.user) return res.redirect('/')
    res.render('home')
}