const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ModelUser = require('../models/m_users');

const secret_key = Number(process.env.SECRETKEY);
const private_key = process.env.PRIVATEKEY;

module.exports = {
    
    signup: (req,res,next) => {
        const { email, password, role } = req.body;
        // console.log(req.body)

        let hash = bcrypt.hashSync(password, secret_key);
        // console.log(hash)

        let newObj = {
            email,
            password: hash,
            role: role || 'Users'
        }
        // console.log('=====',newObj)

        let newUser = new ModelUser(newObj);
        // console.log('>>>>>',newUser);

        newUser.save(function (err, result) {
            if (err) {

                // console.log(err)
                res.status(400).json({
                    message: 'Error: incorrect user saving process',
                    err
                })

            } else {

                let userJwt = {
                    _id: result._id,
                    email: result.email,
                    role: result.role
                }
                // console.log(userJwt)

                let token = jwt.sign(userJwt, private_key);    

                res.status(201).json({
                    message: 'Sign up new user successful !',
                    user: result,
                    token
                })

            }
        })

        // newUser.save()
        //     .then(result => {

        //         let userJwt = {
        //             _id: result._id,
        //             email: result.email,
        //             role: result.role
        //         }
        //         // console.log(userJwt)

        //         let token = jwt.sign(userJwt, private_key);    

        //         res.status(201).json({
        //             message: 'Sign up new user successful !',
        //             user: result,
        //             token
        //         })

        //     })
        //     .catch(function(err) {

        //         // assert.equal(error.errors['password'].message,
        //         //     'Path `password` is required.');

        //         // error = User.validateSync();
        //         // assert.equal(error.errors['password'].message,
        //         // 'Path `password` is required.');
        //         console.log(err)
        //         res.status(400).json({
        //             message: 'Error: incorrect user saving process',
        //             err
        //         })

        //     })

    },

    signin: (req,res,next) => {

        const { email, password } = req.body;

        ModelUser.findOne({ email: email }, (err,result) => {
            if (!result) {

                return res.status(404).json({
                    message: 'Error: user not found'
                })

            } else {

                let checkHash = bcrypt.compareSync(password, result.password);
                
                if (checkHash == true) {

                    let userJwt = {
                        _id: result._id,
                        email: result.email,
                        role: result.role
                    }
                    // console.log(userJwt)
    
                    let token = jwt.sign(userJwt, private_key);    

                    return res.status(200).json({
                        message: 'User found',
                        user: result,
                        token
                    })
      
                } else {

                    return res.status(403).json({
                        message: 'Error: incorrect email or password'
                    })
    
                }

            }
        })

    },

    getUsers: (req, res, next) => {

        ModelUser.find()
            .exec()
            .then(result => {

                res.status(200).json({
                    message: 'Get all users by admin successful !',
                    users: result
                })

            })
            .catch(err => {

                res.status(400).json({
                    message: 'Get all users by admin NOT successful !',
                    errors: err
                })

            })

    },

    getUser: (req, res, next) => {

        const { _id, email, role } = req.decoded;

        ModelUser.findOne({ _id }, (err,result) => {

            if (err) {

                return res.status(404).json({
                    message: 'Error: user not found'
                })

            } else {

                return res.status(200).json({
                    message: 'Single user profile found',
                    user: result,
                })
    
            }

        })

    },

    createUser: (req, res, next) => {

        const { email, password } = req.body;

        let hash = bcrypt.hashSync(password, secret_key);

        let newObj = {
            email,
            password: hash,
            role: 'User'
        }

        let newUser = new ModelUser(newObj);

        newUser.save()
            .then(result => {

                res.status(201).json({
                    message: 'Sign up new user by admin successful !',
                    user: result
                })

            })
            .catch(err => {

                res.status(400).json({
                    message: 'Error: incorrect user saving process by admin'
                })

            })

    },

    deleteUser: (req, res, next) => {

        const { userId } = req.body;

        const { _id, role } = req.decoded;

        if (role == 'Admin') {

            ModelUser.findOneAndRemove({ _id: userId }, (err, result) => {

                if (err) {
    
                    res.status(400).json({
                        message: 'Delete user by admin error',
                        err
                    })
    
                } else {
    
                    res.status(200).json({
                        message: 'Delete user by admin successful',
                        deleted_user: result,
                    })
    
                }
    
            })    
        
        } else if (role == 'Users') {

            ModelUser.findOneAndRemove({ _id }, (err, result) => {

                if (err) {
    
                    res.status(400).json({
                        message: 'Delete user error',
                        err
                    })
    
                } else {
    
                    res.status(200).json({
                        message: 'Delete user successful',
                        deleted_user: result,
                    })
    
                }
    
            })
                
        }
        
    },

    updateUser: (req, res, next) => {

        const { email, password, userId } = req.body;

        const { _id, role } = req.decoded;

        let hash = bcrypt.hashSync(password, secret_key);

        let newObj = {
            email,
            password: hash,
        }

        if (role == 'Admin') {
            
            ModelUser.findOneAndUpdate({ _id: userId }, newObj, (err, result) => {

                if (err) {
    
                    res.status(400).json({
                        message: 'Update user by admin error',
                        err
                    })
    
                } else {
    
                    res.status(200).json({
                        message: 'Update user by admin successful',
                        updated_user: result,
                    })
    
                }
    
            })

        } else if (role == 'Users')  {
         
            ModelUser.findOneAndUpdate({ _id }, newObj, (err, result) => {

                if (err) {
    
                    res.status(400).json({
                        message: 'Update user error',
                        err
                    })
    
                } else {
    
                    res.status(200).json({
                        message: 'Update user successful',
                        updated_user: result,
                    })
    
                }
    
            })    

        }

    },

    fblogin: (req, res, next) => {
        
        const { email } = req.body;

        ModelUser.findOne({ email })
            .then(result => {
                // console.log(result)
                if (!result || result == null) {

                    let newObj = {
                        email,
                        password: '',
                        role: 'Users'
                    }
                    // console.log(newObj);
                    
                    ModelUser.create(newObj)
                        .then(result => {

                            let userJwt = {
                                _id: result._id,
                                email: result.email,
                                role: result.role
                            }
                            // console.log(userJwt)
            
                            let token = jwt.sign(userJwt, private_key);

                            res.status(201).json({
                                message: 'Register by FB successful !',
                                user: result,
                                token
                            })

                        })
                        .catch(err => {

                            res.status(400).json({
                                message: 'Register by FB error',
                                err
                            })

                        })

                } else {

                    let userJwt = {
                        _id: result._id,
                        email: result.email,
                        role: result.role
                    }
                    // console.log(userJwt)
    
                    let token = jwt.sign(userJwt, private_key);

                    res.status(200).json({
                        message: 'Sign in by FB successful !',
                        user: result,
                        token
                    })

                }

            })
            .catch(err => {

                res.status(400).json({
                    message: 'Find user FB login error',
                    err
                })

            })

    }

}