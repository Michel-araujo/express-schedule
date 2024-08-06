import UserAccountModel from "../models/accountModel.js";

export const logoutController = (req, res) => {
    req.session.destroy();
    res.redirect('/')

}
export const loginController = (req, res) => {
    res.render('login')
}
export const authController = async (req, res) => {
    const user = new UserAccountModel(req.body)
    try {
        await user.userLogin()
        if (user.errors.length !== 0) {
            req.flash('errors', user.errors)
            req.session.save(() => {
                res.redirect('/')
            })
        } else {
            req.flash('success', 'login correto!')
            req.session.user = user.data;
            req.session.save(() => {
                res.redirect('/home')
            })
        }
    } catch (error) {
        console.log(error)
        res.render('404')
    }
}
