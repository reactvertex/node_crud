const Employee = require('../models/employee.model');

exports.createEmployee = async (req, res) => {
    try {
        if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
            return res.status(400).send({ error: true, message: 'Please provide all required fields' });
        }

        const newEmployee = new Employee(req.body);
        Employee.createEmployeeQuery(newEmployee, (err, employee) => {
            if (err) {
                return res.status(500).send({ error: true, message: 'Error adding employee' });
            }
            res.status(201).json({
                error: false,
                message: "Employee added successfully!",
                data: employee
            });
        })
    } catch (error) {
        console.error("Error adding employee: ", error.message);
        res.status(500).send({ error: true, message: 'Error adding employee' });
    }
};

exports.getEmployee = async (req, res) => {
    try {
        Employee.getEmployeeQuery((err, employee) => {
            if (err) {
                return res.status(500).send({ error: true, message: 'Not getting all emp list' })
            } else {
                res.status(200).json({
                    error: false,
                    message: 'All Employee List',
                    data: employee,
                })
            }
        })
    } catch (err) {
        console.error("Error retrieving employee list: ", err.message);
        res.status(500).send({ error: true, message: 'Not getting all employee list' });
    }
};


exports.getEmployeeById = async (req, res) => {
    try {
        Employee.getEmployeeByIdQuery(req.params.id, function (err, employee) {
            if (err) {
                return res.status(404).send({ error: true, meesage: "Employee does not exit" })
            } else {
                res.status(200).json({
                    error: false,
                    meesage: "",
                    data: employee
                })
            }
        })
    } catch (err) {
        console.error("Error retrieving employee by ID:", err.message);
        res.status(500).send({ error: true, message: "Error retrieving employee" });
    }
};

exports.deleteEmployee = async (req, res) => {
    try {
        Employee.deleteEmployeeQuery(req.params.id, function (err, employee) {
            if (err) {
                return res.status(500).send({ error: false, message: "Employee does not exit" })
            }else{
                res.status(204).json({
                    error: false,
                    meesage: "",
                    data: employee
                })
            }
        })
    } catch (err) {
        console.error("Error deleting employee:", err.message);
        res.status(500).send({ error: true, message: "Error deleting employee" });
    }
};

exports.updateEmployee = async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).send({ error: true, message: "Please provide all details" });
        }

        Employee.updateEmployeeQuery(req.params.id, new Employee(req.body), async (err, employee) => {
            if (err) {
                console.log("error: ", err);
                res.status(500).send({error: true, message: "Please provied all details"})
            }else{
                res.status(200).send({error: false, message: "Employee successfully updated", data:  employee})
            }
        })
    } catch (err) {
        console.error("Error updating employee:", err.message);
        res.status(500).send({ error: true, message: "Error updating employee" });
    }
};


