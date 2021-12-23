const userRouter = require('../routers/user')
function router(app){
    app.use('/', userRouter)   
}
module.exports = router;