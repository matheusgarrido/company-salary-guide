let employees, roles;
let currentEmployees;

//Sorting the current list
function sortBy(value) {
  switch (parseInt(value)) {
    //Name ascending
    case 0:
      currentEmployees = currentEmployees.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      break;
    //Name descending
    case 1:
      currentEmployees = currentEmployees.sort((a, b) =>
        b.name.localeCompare(a.name)
      );
      break;
    //Salary ascending
    case 2:
      currentEmployees = currentEmployees.sort((a, b) => a.salary - b.salary);
      break;
    //Salary descending
    case 3:
      currentEmployees = currentEmployees.sort((a, b) => b.salary - a.salary);
      break;
  }
  updateTable(currentEmployees, roles);
}

//Fetch when window load
window.addEventListener('load', async () => {
  employees = await fetchAPI('http://localhost:3000/employees');
  roles = await fetchAPI('http://localhost:3000/roles');
  currentEmployees = employees;
  sortBy(0);
  updateTable(employees, roles);
  updateFilter(roles);
  checkBoxEvent();
});

//Listen the select input
document.getElementById('sortBy').addEventListener('change', (event) => {
  const { value } = event.target;
  sortBy(value);
});

//Add a eventlistener for each checkbox
function checkBoxEvent() {
  const allCheckBoxElements = document.getElementsByName('checkboxFilter');
  for (let i = 0; i < roles.length; i++) {
    allCheckBoxElements[i].addEventListener('change', () => {
      //Get list of all checked
      const checkedElements = Array.from(
        document.querySelectorAll('input:checked')
      );
      //If none checked
      if (checkedElements.length === 0) currentEmployees = employees;
      //If someone checked
      else {
        //Get all checked values
        const listCheckedValues = checkedElements.map((element) =>
          parseInt(element.value)
        );
        //Using the array values to filter
        currentEmployees = employees.filter((element) => {
          return listCheckedValues.includes(parseInt(element.role_id));
        });
      }
      //Sorting again
      const selectValue = document.getElementById('sortBy').value;
      sortBy(selectValue);
    });
  }
}
