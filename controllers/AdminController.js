const { User, Profile, Post, Category, PostHasCategories } = require("../models/index");
const { Op } = require("sequelize");
const sequelize = require("sequelize");

class AdminController {

    static async adminDashboard(req, res) {
        try {
            const dashboard = await User.findAll();
            // console.log(dashboard);
            // res.send(dashboard)
            res.render('admin-pages/admin-dashboard', {dashboard})
        }
        catch(error) {
            console.log(error)
            res.send(error);
        }
    }
}

module.exports = AdminController;