const { createTask, readTask, updateTask, deleteTask, singleTask } = require('../Controllers/task.controller');
const { userAuthentication } = require('../Middleware/authentication');

const router = require('express').Router() ;


router.post('/user/create-task',userAuthentication,createTask)
router.get('/user/read-task',userAuthentication,readTask)
router.put('/user/update-task/:id',userAuthentication,updateTask)
router.delete('/user/delete-task',userAuthentication,deleteTask)
router.get('/user/single-task/:id',userAuthentication,singleTask)



module.exports = router 