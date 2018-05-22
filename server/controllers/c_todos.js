const ModelTodo = require('../models/m_todos');

module.exports = {

    getTodos: (req, res, next) => {

        ModelTodo.find({})
            .populate('userId')
            .exec()
            .then(result => {
                
                res.status(200).json({
                    message: 'Find todos successfull',
                    todos: result
                })

            })
            .catch(err => {

                res.status(400).json({
                    message: 'Error: Find todos',
                    err
                })

            })

    },

    getTodo: (req, res, next) => {

        const { _id, role } = req.decoded;
        const { userId } = req.body;

        if (role == 'Admin') {

            ModelTodo.find({})
            .exec()
            .then(results => {
                
                let arrlist = [];

                results.map(todo => {
                    
                    if (todo.userId == userId) {

                        arrlist.push(todo);

                    }
                    
                })

                res.status(200).json({
                    message: 'Get todos based on userId by admin successfull',
                    list: arrlist
                })

            })
            .catch(err => {

                res.status(400).json({
                    message: 'Get todos based on userId by admin error',
                    err
                })

            })

        } else {

            ModelTodo.find({})
            .exec()
            .then(results => {
                
                let arrlist = [];

                results.map(todo => {
                    
                    if (todo.userId == _id) {

                        arrlist.push(todo);

                    }
                    
                })

                res.status(200).json({
                    message: 'Get todos based on userId successfull',
                    list: arrlist
                })

            })
            .catch(err => {

                res.status(400).json({
                    message: 'Get todos based on userId error',
                    err
                })

            })

        }

    },

    addTodo: (req, res, next) => {

        // console.log('from add todos',req.decoded);
        const { _id } = req.decoded;
        const { todo, status } = req.body;
        
        let newObj = {
            userId: _id,
            status: status || false,
            todo
        }

        let newTodo = new ModelTodo(newObj);

        newTodo.save()
            .then(result => {

                res.status(201).json({
                    message: 'Add new todo successfull',
                    todo: result
                })

            })
            .catch(err => {

                res.status(400).json({
                    message: 'Error: Add new todos',
                    err
                })

            })

    },

    updateTodo: (req, res, next) => {

        const { _id, todo } = req.body;

        ModelTodo.findOneAndUpdate({ _id }, { todo })
        .then(result => {

            res.status(200).json({
                message: 'Update related todo successfull',
                todo_updated: result
            })

        })
        .catch(err => {

            res.status(400).json({
                message: 'Error: Update related todos',
                err
            })

        })

    },

    updateStatus : (req, res, next) => {

        const { _id } = req.body;

        ModelTodo.findOne({ _id })
            .then(result => {

                if (result.status == true) {

                    ModelTodo.findOneAndUpdate({ _id }, { status: false })
                        .then(result => {

                            res.status(200).json({
                                message: 'Update status related todo successfull from true to false',
                                todo_updated: result
                            })

                        })
                        .catch(err => {

                            res.status(400).json({
                                message: 'Error: Update status related todos from true to false',
                                err
                            })
                        })

                } else {

                    ModelTodo.findOneAndUpdate({ _id }, { status: true })
                    .then(result => {

                        res.status(200).json({
                            message: 'Update status related todo successfull from true to false',
                            todo_updated: result
                        })

                    })
                    .catch(err => {

                        res.status(400).json({
                            message: 'Error: Update status related todos from true to false',
                            err
                        })
                    })

                }
                
            })
            .catch(err => {

                res.status(400).json({
                    message: 'Error: Update status related todos',
                    err
                })

            })

    },

    deleteTodo: (req, res, next) => {

        const _id = req.query.id;
        // console.log(_id);
        
        ModelTodo.findOneAndRemove({ _id })
            .then(result => {

                res.status(200).json({
                    message: 'Delete related todo successfull',
                    todo_deleted: result
                })

            })
            .catch(err => {

                res.status(400).json({
                    message: 'Error: Delete related todos',
                    err
                })

            })

    }


}
