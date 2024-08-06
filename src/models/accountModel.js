"use strict";

import bcryptjs from 'bcryptjs';
import mongoose from 'mongoose';
import { emailValidation, passwordValidation } from '../utils/DataValidations.js';

const UserSchema = new mongoose.Schema({
    name: { type: String, require: true },
    phone: { type: String, require: false },
    email: { type: String, require: true },
    password: { type: String, require: true },
})

const AccountModel = mongoose.model('Users', UserSchema)

class UserAccountModel {
    constructor(user) {
        this.body = user;
        this.data = null;
        this.errors = []
    }
    cleanUp() {
        for (const key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = ''
            }
        }
        this.fromTo();
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
    async userConsult() {
        this.data = await AccountModel.findOne({ email: this.body.email });
    }
    async userValidation(login = true) {
        this.cleanUp();
        await this.userConsult();
        if (passwordValidation(this.body.password)) this.errors.push('Senha inválida!');

        if (emailValidation(this.body.email)) {
            this.errors.push('E-mail inválido!')
        } else {
            if ((!login) && this.data) this.errors.push(`Usuário (${this.body.email}) já é cadastrado!`)
            if ((login) && !this.data) {
                this.errors.push(`Usuário não encontrado!`)
                this.data = null
            }
        };


    }
    async userLogin() {
        await this.userValidation();
        if (this.errors.length !== 0) return
        if (!bcryptjs.compareSync(this.body.password, this.data.password)) {
            this.errors.push('Usuário ou senha inválido!');
            this.data = null;
        }
    }
    async userCreate() {
        const login = false
        await this.userValidation(login);
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
export default UserAccountModel