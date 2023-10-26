const { User, Profile, Post, Category, PostHasCategories } = require("../models/index");
const { Op } = require("sequelize");
const sequelize = require("sequelize");
const bcrypt = require('bcryptjs');

class UserController {

    // Registration Form
    static registerForm(req, res) {
        try {
            res.render('auth-pages/register-form')
        } catch (error) {
            res.send(error);
            console.log(error);
        }
    }

    // Processing user registration
    static postRegister(req, res) {
        try {
            const {email, password, role} = req.body
            User.create({email, password, role}) 
            res.redirect('/');
        } catch (error) {
            res.send(error)
            console.log(error);
        }
    }

    // Login form
    static loginForm(req, res) {
        try {
            const {error} = req.query;
            res.render('auth-pages/login-form',{error})
        } catch (error) {
            res.send(error)
            console.log(error);
        }
    }

    // Login process (validating user email and password)
    static async postLogin(req, res) {
        try {
            const {email, password} = req.body;
            const user = await User.findOne({
                where: {email}
            })
            if(user) {
                const isValidPassword = bcrypt.compareSync(password, user.password)
                if(isValidPassword) {
                    if(user.role === "Admin") {
                        req.session.userId = user.id;
                        return res.redirect('/admin')
                    } else {
                        req.session.id = user.id;
                        return res.redirect('/')
                    }
                } else {
                    const error = "Invalid email or password"
                    return res.redirect(`/login?error=${error}`)
                }
            }
        } catch (error) {
            res.send(error)
            console.log(error);
        }
    }

    static landingPage(req, res) {
        try {
            res.render('landing-page/landingPage')
        } catch(error) {
            res.send(error)
            console.log(error);
        }
    }
}

module.exports = UserController