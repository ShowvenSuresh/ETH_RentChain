let totalDeposit = 1.5; // Initial total deposit in ETH
const transactions = [
    { id: 1, type: 'deposit', amount: 0.5, name: 'Jason', timestamp: '2024-03-15 14:30' },
    { id: 2, type: 'penalty', amount: -0.2, reason: 'Late Payment', timestamp: '2024-03-14 09:15' },
    { id: 3, type: 'deposit', amount: 1.0, name: 'Sarah', timestamp: '2024-03-13 16:45' },
    { id: 4, type: 'penalty', amount: -0.3, reason: 'Property Damage', timestamp: '2024-03-12 11:20' },
];

const totalDepositElement = document.getElementById('total-deposit');
const transactionList = document.getElementById('transaction-list');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');
const depositAmountInput = document.getElementById('depositAmount');
const confirmDepositButton = document.getElementById('confirmDeposit');
const addDepositButton = document.getElementById('addDepositBtn');

// Function to render the transaction history
function renderTransactions() {
    transactionList.innerHTML = '';
    transactions.forEach(transaction => {
        const transactionItem = document.createElement('div');
        transactionItem.className = 'transaction-item';
        const amount = transaction.amount > 0 ? `+${transaction.amount.toFixed(2)}` : `${transaction.amount.toFixed(2)}`;
        const nameOrReason = transaction.type === 'deposit' ? transaction.name : transaction.reason;
        transactionItem.innerHTML = `
            <span>${nameOrReason} (${transaction.timestamp})</span>
            <span class="${transaction.type === 'deposit' ? 'text-green' : 'text-red'}">${amount} ETH</span>
        `;
        transactionList.appendChild(transactionItem);
    });
}

// Function to update the total deposit and add a new transaction
function addDeposit() {
    const newDeposit = parseFloat(depositAmountInput.value);
    if (!isNaN(newDeposit) && newDeposit > 0) {
        totalDeposit += newDeposit;
        totalDepositElement.textContent = totalDeposit.toFixed(2) + ' ETH';
        transactions.push({
            id: transactions.length + 1,
            type: 'deposit',
            amount: newDeposit,
            name: 'New User',
            timestamp: new Date().toLocaleString()
        });
        renderTransactions();
        closeModalFunction();
    } else {
        alert('Please enter a valid amount.');
    }
}

// Function to open the modal
function openModal() {
    modal.style.display = 'block';
}

// Function to close the modal
function closeModalFunction() {
    modal.style.display = 'none';
    depositAmountInput.value = '';
}

// Event Listeners
addDepositButton.addEventListener('click', openModal);
closeModal.addEventListener('click', closeModalFunction);
confirmDepositButton.addEventListener('click', addDeposit);
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        closeModalFunction();
    }
});

// Initial render of transactions
renderTransactions();
