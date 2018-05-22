const express = require('express');
const { getTodos, getTodo, addTodo, updateTodo, updateStatus, deleteTodo } = require('../controllers/c_todos');
const { authentication, authorisation, authorisation_todo, authorisation_admin, autherror } = require('../middlewares/auth')

const router = express.Router();

router
    .get('/', authentication, authorisation_admin, autherror, getTodos)                                // GET all todos (admin role only)
    .get('/list', authentication, authorisation, autherror, getTodo)                                   // GET to get todos based on userId (admin and related user only)
    .post('/', authentication, authorisation, autherror, addTodo)                                      // POST new todo based on userId (admin and related user only)
    .put('/update', authentication, authorisation, authorisation_todo, autherror, updateTodo)          // PUT related todo (admin and related user only)
    .put('/status', authentication, authorisation, authorisation_todo, autherror, updateStatus)        // PUT status related todo (related user only)
    .delete('/delete', authentication, authorisation ,authorisation_todo, autherror, deleteTodo)       // DELETE related todo (admin and related user only)


module.exports = router;