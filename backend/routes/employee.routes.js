const Router = require('express');
const router = new Router();
const userController = require('../controller/employee.controller');

router.post('/', userController.addDocOrder);
router.get('/docorderlist', userController.getDocsOrderList);
router.get('/employee', userController.getEmployee);

module.exports = router;