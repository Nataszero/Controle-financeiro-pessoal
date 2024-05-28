document.addEventListener('DOMContentLoaded', () => {
    const transactionHistoryList = document.getElementById('transactionHistoryList');
    let history = JSON.parse(localStorage.getItem('transactionHistory')) || [];

    history.forEach(transaction => {
        const listItem = document.createElement('li');
        listItem.classList.add('transaction-item');
        listItem.innerHTML = `<span class="transactionLabel">${getTransactionLabel(transaction.type)}:</span> <span class="transactionAmount">R$ ${transaction.amount.toFixed(2)}</span> <span class="transactionEmoji">${getTransactionEmoji(transaction.type)}</span> <span class="transactionDate">${transaction.date}</span>`;
        transactionHistoryList.appendChild(listItem);
    });
});

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

function getTransactionEmoji(type) {
    switch (type) {
        case 'income':
            return '💰';
        case 'food':
            return '🍔';
        case 'transportation':
            return '🚌';
        case 'education':
            return '📔';
        case 'entertainment':
            return '🎉';
        default:
            return '💵';
    }
}

