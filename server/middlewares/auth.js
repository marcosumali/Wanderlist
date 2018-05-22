const jwt = require('jsonwebtoken');
const ModelUser = require('../models/m_users');
const ModelTodo = require('../models/m_todos');

module.exports = {

    authentication: (req, res, next) => {

        let token = req.headers.authkey;
        // console.log(req.headers)

        if (!token) {

            let err = new Error('You are not authenticated yet, please login !')
            next(err)

        } else {

            let decoded = jwt.decode(token);
    
            req.decoded = decoded; // result: id, email, role
    
            next()
    
        }

    },

    authorisation: (req, res, next) => {

        let { _id, role } = req.decoded;
        // console.log('from authorisation',req.decoded)

        if (role == 'Admin') {

            next();

        } else {

            ModelUser.findOne({ _id }, (err,result) => {

                if (err) {
    
                    let error = new Error('You are not authorised !')
                    next(error)
    
                } else {
    
                    next();
    
                }
    
            })    

        }

    },

    authorisation_admin: (req, res, next) => {
        
        let role = req.decoded.role;

        if (role != 'Admin') {
            
            let err = new Error('You are not authorised !')
            next(err)

        } else {
            
            next();

        }

    },

    authorisation_todo: (req, res, next) => {

        let { email, role } = req.decoded;
        let userId = req.decoded._id;
        let _id = req.query.id || req.body._id;
        // console.log(req.decoded)
        // console.log(_id)

        ModelTodo.findOne({ _id }, (err,result) => {

            // console.log(result, 'ini result');
            // console.log('ini check id', result.userId, userId )

            if (err) {

                let error = new Error('Error: related todo are not found !')
                next(error)

            } else {

                if (result.userId == userId || role == 'Admin') {

                    next();

                } else {

                    let error = new Error('You are not authorised to edit/delete related todo ! !')
                    next(error)

                }

            }

        })    
   
    },

    autherror: (err, req, res, next) => {

        if (err) {

            let indexEx = err.stack.indexOf('!')
            let errMessage = err.stack.slice(0,indexEx+1)

            res.status(403).json({
                message: errMessage,
                err
            })

        } else {

            next();

        }


    } 
}