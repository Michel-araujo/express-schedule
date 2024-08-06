import UsersModel from "../models/accountModel.js";

export const loginController = (req, res) => {
    if(req.session.user) return res.redirect('/home')
    res.render('login')
}
export const logoutController = (req, res) => {
    req.flash('success', 'Deslogado!')
    req.session.destroy();
    res.redirect('/')

}

export const authController = async (req, res) => {
    const user = new UsersModel(req.body)
    try {
        await user.userLogin()
        if (user.errors.length !== 0) {
            req.flash('errors', user.errors)
            req.session.save(() => {
                return res.redirect('/')
            })
            return
        } else {
            req.flash('success', 'login correto!')
            req.session.user = user.data;
            req.session.save(() => {
                return res.redirect('/home')
            })
        }
    } catch (error) {
        console.log(error)
        return res.render('404')
    }
}
export const registerController = (req, res) => {
    res.render('register')
}
export const registrationController = async (req, res) => {
    const user = new UsersModel(req.body)
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
        // res.send([{ ...user.data }])
    } catch (error) {
        console.log(error)
        return res.render('404')
    }
}