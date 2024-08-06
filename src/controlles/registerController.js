import UserAccountModel from "../models/accountModel.js";

export const registerController = (req, res) => {
    if(req.session.user) return res.redirect('/home')
    res.render('register')
}

export const accountCreateController = async (req, res) => {
    const user = new UserAccountModel(req.body)
    try {
        await user.userCreate()
        if (user.errors.length !== 0) {
            req.flash('errors', user.errors)
            req.session.save(() => {
                return res.redirect('/register')
            })
            return
        } else {
            req.flash('success', 'Cadastro concluído com sucesso!')
            req.session.save(() => {
                return res.redirect('/')
            })
        }
    } catch (error) {
        console.log(error)
        return res.render('404')
    }
}