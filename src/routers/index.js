const userRouter = require('../routers/user');
const userActivityRouter = require('../routers/userActivity');
function router(app){
    app.use('/', userRouter);
    app.use('/', userActivityRouter);
}
module.exports = router;