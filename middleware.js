module.exports.isLoggedIn = (req, res, next) => {
        if(!req.isAuthenticated()){
            req.flash('error','you must be singed in first');
            return res.redirect('/login');
        }
        next();
    }