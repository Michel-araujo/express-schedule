"use strict";

import bcryptjs from 'bcryptjs';
import mongoose from 'mongoose'

const UsersSchema = new mongoose.Schema({
    name: { type: String, require: true },
    phone: { type: String, require: false },
    email: { type: String, require: true },
    password: { type: String, require: true },
})

const AccountModel = mongoose.model('Users', UsersSchema)


class UsersModel {
    constructor(user) {
        this.body = user;
        this.data = null;
        this.errors = []
    }
    fromTo() {
        this.body = {
            email: this.body.email,
            name: this.body.name,
            phone: this.body.phone,
            password: this.body.password,
        }
    }
    passworEncrypt() {
        const salt = bcryptjs.genSaltSync()
        this.body.password = bcryptjs.hashSync(this.body.password, salt);
    }
    cleanUp() {
        for (const key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = ''
            }
        }
        this.fromTo();
    }
    async userConsult() {
        this.data = await AccountModel.findOne({ email: this.body.email });
    }
    async userValidarion(login = true) {
        const emailFormat = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
        this.cleanUp();
        await this.userConsult();

        if (!emailFormat.test(this.body.email)) {
            this.errors.push('E-mail inválido!'); 
            return
        }
        if (this.body.password.length < 8) {
            this.errors.push('Senha inválida!'); 
            return
        }
        if ((!login) && this.data) {
            this.errors.push(`Usuário (${this.body.email}) já é cadastrado!`)
        }
        if ((login) && !this.data) {
            this.errors.push(`Usuário não encontrado!`)
            this.data = null
        }
    }
    async userLogin() {
        await this.userValidarion();
        if (this.errors.length !== 0) return
        if (!bcryptjs.compareSync(this.body.password, this.data.password)) {
            this.errors.push('Usuário ou senha inválido!');
            this.data = null;
        }
    }
    async userCreate() {
        const login = false
        await this.userValidarion(login);
        if (this.errors.length !== 0) return
        this.passworEncrypt();
        try {
            this.data = await AccountModel.create(this.body)
            return this.data
        } catch (error) {
            console.log(error)
        }
    }
}
export default UsersModel