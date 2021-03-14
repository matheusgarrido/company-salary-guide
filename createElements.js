function emptyResult() {
  const resultElement = document.getElementById('result');
  resultElement.innerHTML = '<p>0 results for the search.</p>';
}

function updateTable(employees, roles) {
  //If employees json is empty
  if (employees.length == 0) {
    emptyResult();
    return;
  }
  //If has employees on json
  else {
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = '';
    const tableElement = document.createElement('table');
    resultElement.appendChild(tableElement);
    //Head
    const theadElement = document.createElement('thead');
    tableElement.appendChild(theadElement);
    const trHeadElement = document.createElement('tr');
    theadElement.appendChild(trHeadElement);
    ['ID', 'Name', 'Role', 'Salary (R$)'].map((element) => {
      const tdElement = document.createElement('td');
      tdElement.innerHTML = element;
      trHeadElement.appendChild(tdElement);
    });
    //Body
    const tbodyElement = document.createElement('tbody');
    tableElement.appendChild(tbodyElement);
    employees.map((element) => {
      const trBodyElement = document.createElement('tr');
      tbodyElement.appendChild(trBodyElement);
      [element.id, element.name, element.role_id, element.salary].map(
        (field, index) => {
          let value = field;
          if (index == 2) {
            value = roles
              .filter((r) => r.id == element.role_id)
              .map((r) => r.name)[0];
          } else if (index == 3) {
            value = parseFloat(value).toFixed(2);
          }
          const tdElement = document.createElement('td');
          tdElement.innerHTML = value;
          trBodyElement.appendChild(tdElement);
        }
      );
    });
  }
  //Span count
  const countElement = document.getElementById('count');
  countElement.innerHTML = employees.length;
}

function updateFilter(roles) {
  const filterByRolesElement = document.getElementById('filterByRoles');
  roles.map((element) => {
    //Div
    const divElement = document.createElement('div');
    filterByRolesElement.appendChild(divElement);
    //Checkbox
    const checkboxElement = document.createElement('input');
    checkboxElement.setAttribute('type', 'checkbox');
    checkboxElement.setAttribute('value', element.id);
    checkboxElement.setAttribute('name', 'checkboxFilter');
    divElement.appendChild(checkboxElement);
    //Label
    const labelElement = document.createElement('label');
    labelElement.innerHTML = element.name;
    divElement.appendChild(labelElement);
    //Id
    const id = 'checkbox' + element.id;
    checkboxElement.id = id;
    labelElement.setAttribute('for', id);
  });
}
