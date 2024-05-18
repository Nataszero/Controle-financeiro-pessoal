let balance = 0;
let totalExpenses = 0;
const transactionList = document.getElementById('transactionList');
const balanceAmount = document.getElementById('balanceAmount');
const transactions = JSON.parse(localStorage.getItem('transactions')) || [];

function saveTransactions() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function addTransaction() {
    const type = document.getElementById('type').value;
    const amountInput = document.getElementById('amount').value.trim();

    if (amountInput === '') {
        alert('Por favor, insira um valor.');
        return;
    }

    const amount = parseFloat(amountInput);

    if (isNaN(amount) || amount <= 0) {
        alert('Por favor, insira um valor válido.');
        return;
    }

    const transaction = {
        type: type,
        amount: amount,
        date: new Date().toISOString().split('T')[0]
    };

    transactions.push(transaction);
    saveTransactions();

    const listItem = document.createElement('li');
    listItem.innerHTML = `<span class="transactionLabel">${getTransactionLabel(type)}:</span> <span class="transactionAmount">R$ ${amount.toFixed(2)}</span>`;
    transactionList.appendChild(listItem);

    if (type === 'income') {
        balance += amount;
    } else {
        balance -= amount;
        totalExpenses += amount;
    }
    balanceAmount.textContent = balance.toFixed(2);
    document.getElementById('amount').value = '';
    
}

function getTransactionLabel(type) {
    switch (type) {
        case 'income':
            return 'Receita';
        case 'food':
            return 'Alimentação';
        case 'transportation':
            return 'Transporte';
        case 'education':
            return 'Educação';
        case 'entertainment':
            return 'Entretenimento';
        default:
            return 'Outros';
    }
}

function calculateExpenses() {
    const period = document.getElementById('period').value;
    let periodMultiplier = 1;
    let periodDescription = '';

    switch (period) {
        case 'day':
            periodMultiplier = 1;
            periodDescription = 'dia';
            break;
        case 'week':
            periodMultiplier = 7;
            periodDescription = 'semana';
            break;
        case 'month':
            periodMultiplier = 30;
            periodDescription = 'mês';
            break;
        case 'year':
            periodMultiplier = 12;
            periodDescription = 'ano';
            break;
    }

    const periodExpenses = totalExpenses * periodMultiplier;
    alert(`Os gastos no período de ${periodDescription} são: R$ ${periodExpenses.toFixed(2)}`);
}

function goToHistorico() {
    window.location.href = "historico/historico.html";
}

document.addEventListener('DOMContentLoaded', () => {
    transactions.forEach(transaction => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<span class="transactionLabel">${getTransactionLabel(transaction.type)}:</span> <span class="transactionAmount">R$ ${transaction.amount.toFixed(2)}</span>`;
        transactionList.appendChild(listItem);
    });

    const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
    const totalExpense = transactions.filter(t => t.type !== 'income').reduce((acc, t) => acc + t.amount, 0);

    balance = totalIncome - totalExpense;
    totalExpenses = totalExpense;

    balanceAmount.textContent = balance.toFixed(2);
});
document.addEventListener('DOMContentLoaded', () => {
    transactionList.innerHTML = '';

    transactions.forEach(transaction => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<span class="transactionLabel">${getTransactionLabel(transaction.type)}:</span> <span class="transactionAmount">R$ ${transaction.amount.toFixed(2)}</span>`;
        transactionList.appendChild(listItem);
    });

    const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
    const totalExpense = transactions.filter(t => t.type !== 'income').reduce((acc, t) => acc + t.amount, 0);
    balance = totalIncome - totalExpense;
    totalExpenses = totalExpense;

    balanceAmount.textContent = balance.toFixed(2);
});


