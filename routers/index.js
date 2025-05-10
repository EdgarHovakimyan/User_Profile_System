const express = require('express');
const router = express.Router();
const { MainController } = require('../controllers/MainController');
const passport = require('passport');
const { User } = require('../models');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require("bcrypt")

router.get('/', MainController.getLogin);
router.get('/signup', MainController.getSignup);


router.post('/register', MainController.register)

router.get('/verify', MainController.isVerify)

router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/user/profile',
        failureRedirect: '/'    })
);
passport.use(new LocalStrategy(
    async (username, password, done) => {
        const user = await User.findOne({ where: { email: username } })
        console.log(user);
        
        if (user) {
            if (bcrypt.compareSync(password, user.password)){
                return done(null, user);
            } else {
                return done(null, false)
            }
        } else {
            return done(null, false)
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
    const user = await User.findByPk(id);
    done(null, user);
});

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });
module.exports = { router };
