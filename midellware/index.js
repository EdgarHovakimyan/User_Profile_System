module.exports = {
    isLogin:(req,res,next) => {
        if(req.user && req.user.isVerify == 1){
            return next()
        }else{
            res.redirect('/')
        }
    },
    isLoginAdmin:(req,res,next) => {
        if(req.user && req.user.role == 2){
            return next()
        }else{
            res.redirect('/')
        }
    },
    isLoginManager:(req,res,next) => {
        if(req.user && req.user.role == 1){
            return next()
        }else{
            res.redirect('/')
        }
    }
    
}