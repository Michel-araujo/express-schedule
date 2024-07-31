import UsersModel from '../models/usersModel.js'

export const loginController = (req, res) => {
    res.render('index')
}

export const autentication = (req, res) => {
    console.log(req.body)
    res.redirect('/home')
}

export const homeController = (req, res) => {
    res.render('home')
}
export const showcaseController = (req, res) => {
    req.session.user = 'user123'
    req.flash('info', 'Mensagem ok!')
    res.redirect('/show-message')
}
export const showMsgController = (req, res) => {
    const msg = req.flash('info')
    console.log(req.session.user)
    res.send(msg.length > 0 ? msg[0] : 'nenhuma mensagem por enquanto!')
}