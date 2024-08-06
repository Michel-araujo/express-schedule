import UserAccountModel from "../models/accountModel.js";

export const registerController = (req, res) => {
    res.render('register')
}

export const accountCreateController = async (req, res) => {
    const user = new UserAccountModel(req.body)
    try {
        await user.userCreate()
        if (user.errors.length !== 0) {
            req.flash('errors', user.errors)
            req.session.save(() => {
                res.redirect('/register')
            })
        } else {
            req.flash('success', 'Cadastro concluído com sucesso!')
            req.session.save(() => {
                res.redirect('/')
            })
        }
    } catch (error) {
        console.log(error)
        res.render('404')
    }
}