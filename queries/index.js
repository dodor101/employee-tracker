const viewAllOf = require('./queries');
const addNewDepartment = require('./addNewdepartment');
const addNewRole = require('./addNewRole');
const addNewEmployee = require('./addNewEmployee');
const updateRole = require('./updateRole');
const viewEmployeeByManager = require('./viewEmployeeByManager');
const updateManager = require('./updateManager');
const deleteDepartment = require('./deleteDepartment');
const deleteRole = require('./deleteRole');
const deleteEmployee = require('./deleteEmployee');
const viewBudget = require('./viewBudget');

module.exports = {
  viewAllOf,
  addNewDepartment,
  addNewRole,
  addNewEmployee,
  updateRole,
  viewEmployeeByManager,
  updateManager,
  deleteDepartment,
  deleteRole,
  deleteEmployee,
  viewBudget,
};
