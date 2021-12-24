class response{
    checkStatus(req, res, next){
        if(res.status == 200){
            res.json({
                message: 'Ok' ,
                status: 200
            });
        }
        else if(res.status == 400){
            res.json({
                message: 'Bad request',
                status: 400
            });
        }
        else if(res.status == 401){
            res.json({
                message: 'Unauthorized', 
                status: 401
            });
        }
        else if(res.status == 404){
            res.json({
                message: 'Not found', 
                status: 404
            });
        }
        else if(res.status == 500){
            res.json({
                message: 'Internal Server Error', 
                status: 500
            })
        }
        else{
            res.json({
                message: 'Status other', 
                status: res.status
            })
        }
    }
}
module.exports = new response;