const express = require('express')
const router = express.Router()
const employeeController =   require('../controllers/employee.controller');

router.post('/create', employeeController.createEmployee);
router.get('/get', employeeController.getEmployee);
router.get('/getId/:id', employeeController.getEmployeeById);
router.delete('delete/:id', employeeController.deleteEmployee);
router.put('update/:id', employeeController.updateEmployee);

module.exports = router;