let employees, roles;
let currentEmployees, currentRoles;

//Fetch when window load
window.addEventListener('load', async () => {
  employees = await fetchAPI('http://localhost:3000/employees');
  roles = await fetchAPI('http://localhost:3000/roles');
  currentEmployees = employees;
  currentRoles = roles;
  updateTable(employees, roles);
  updateFilter(roles);
});
