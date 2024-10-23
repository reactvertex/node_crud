var dbConn = require('./../../config/db.config');

var Employee = function (employee) {
  this.first_name = employee.first_name;
  this.last_name = employee.last_name;
  this.email = employee.email;
  this.phone = employee.phone;
  this.organization = employee.organization;
  this.designation = employee.designation;
  this.salary = employee.salary;
  this.status = employee.status ? employee.status : 1;
  this.created_at = new Date();
  this.updated_at = new Date();
};

Employee.createEmployeeQuery = async (newEmp, result) => {

  dbConn.query("INSERT INTO employee_lists set ?", newEmp, async (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};


Employee.getEmployeeQuery = async (result) => {
  dbConn.query("Select * from employee_lists", async (err, res) =>{
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log('employees:', res);
      result(null, res);
    }
  })
}

Employee.getEmployeeByIdQuery = async (id, result) => {
  dbConn.query("Select * from employee_lists where id= ?", id, async (err, res) => {
    if (err) {
      console.log("error:" + err);
      result(null, err);
    } else {
      console.log("employee:", res);
      result(null, res)
    }
  })
}

Employee.deleteEmployeeQuery = async (id, result) => {
  dbConn.query("DELETE FROM employee_lists where id= ? ", id, async (err, res) => {
    if (err) {
      console.log("error: " + err);
      result(null, err);
    } else {
      console.log("Employee delete successfuly from data");
      result(null, res)
    }
  })
}

Employee.updateEmployeeQuery = async (id, employee, result) =>{
  dbConn.query("UPDATE employee_lists SET first_name=?,last_name=?,email=?,phone=?,organization=?,designation=?,salary=? WHERE id = ?",
    [employee.first_name, employee.last_name, employee.email, employee.phone, employee.organization, employee.designation, employee.salary, id],
    async (err, res) =>{
      if (err) {
        console.log("error: " + err);
        result(null, err);
      } else {
        result(null, res)
      }
    })
}

module.exports = Employee;