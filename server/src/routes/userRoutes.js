const { Router } = require('express');
const userController = require('../controllers/userController');

const router = Router();

router.get('/', userController.getUsers);

router.post('/new', userController.createUser);

router.put('/update/:id', userController.updateUser);

router.delete('/delete/:id', userController.deleteUser);
module.exports = router;