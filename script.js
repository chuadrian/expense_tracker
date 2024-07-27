let button = document.getElementById('button');
let DATE = document.getElementById('dateInput');
let AMOUNT = document.getElementById('amountInput');
let DESCRIPTION = document.getElementById('descriptionInput');
let TYPE = document.getElementById('type');
let table = document.getElementById('table');
let class_name;
let expense_records = [];

// Check to see if there is any data already in local storage
if (localStorage.getItem('expense_records')) {
    expense_records = JSON.parse(localStorage.getItem('expense_records'));
    renderTable();
}

let inputs = [DATE, AMOUNT, DESCRIPTION];

function add_expense(date = 'N/A', type = 'N/A', amount = 'N/A', description = 'N/A') {
    let DATE_OBJECT = new Date(DATE.value);
    let FORMATTED_DATE = DATE_OBJECT.toLocaleDateString('en-NG', { month: '2-digit', day: '2-digit', year: 'numeric' });

    date = FORMATTED_DATE;
    type = TYPE.value;
    amount = AMOUNT.value;
    description = DESCRIPTION.value;

    switch (TYPE.value) {
        case 'Food':
            class_name = 'food';
            break;
        case 'Clothing':
            class_name = 'clothing';
            break;
        case 'Transportation':
            class_name = 'transportation';
            break;
        case 'Debt':
            class_name = 'debt';
            break;
        case 'Education':
            class_name = 'education';
            break;
        case 'Miscellaneous':
            class_name = 'miscellaneous';
            break;
    }

    expense_records.push({ date, type, amount, description, class_name });

    updateLocalStorage();
    renderTable();
}

function delete_expense(index) {
    expense_records.splice(index, 1);
    updateLocalStorage();
    renderTable();
}

function renderTable() {
    table.innerHTML = `
        <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Action</th>
        </tr>
    `;
    expense_records.forEach((expense, index) => {
        let color_code = expense.class_name;
        table.innerHTML += `
            <tr>
                <td class="${color_code}">${expense.date}</td>
                <td class="${color_code}">${expense.type}</td>
                <td class="${color_code}">&#x20A6 ${expense.amount}</td>
                <td class="${color_code}">${expense.description}</td>
                <td class="${color_code}">
                    <button onclick="delete_expense(${index})" class="btn btn-danger btn-sm">Del</button>
                </td>
            </tr>
        `;
    });
}

function updateLocalStorage() {
    localStorage.setItem('expense_records', JSON.stringify(expense_records));
}

button.addEventListener('click', add_expense);
