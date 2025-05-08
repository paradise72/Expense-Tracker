let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function updateDisplay() {
  const list = document.getElementById("transactionList");
  const balance = document.getElementById("balance");
  const incomeDisplay = document.getElementById("income");
  const expenseDisplay = document.getElementById("expense");
  const filter = document.getElementById("filter").value;

  list.innerHTML = "";

  let income = 0;
  let expense = 0;

  transactions.forEach((tx, index) => {
    if (tx.amount > 0) income += tx.amount;
    else expense += Math.abs(tx.amount);
  });

  incomeDisplay.textContent = `Income: $${income.toFixed(2)}`;
  expenseDisplay.textContent = `Expense: $${expense.toFixed(2)}`;
  balance.textContent = `Balance: $${(income - expense).toFixed(2)}`;

  transactions.forEach((tx, index) => {
    if (
      filter === "income" && tx.amount < 0 ||
      filter === "expense" && tx.amount > 0
    ) return;

    const li = document.createElement("li");
    li.classList.add(tx.amount < 0 ? "expense" : "income");
    li.textContent = `${tx.desc}: $${tx.amount}`;

    const delBtn = document.createElement("button");
    delBtn.textContent = "✕";
    delBtn.onclick = () => deleteTransaction(index);

    li.appendChild(delBtn);
    list.appendChild(li);
  });

  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function addTransaction() {
  const desc = document.getElementById("desc").value.trim();
  const amount = parseFloat(document.getElementById("amount").value);

  if (desc && !isNaN(amount)) {
    transactions.push({ desc, amount });
    document.getElementById("desc").value = "";
    document.getElementById("amount").value = "";
    updateDisplay();
  }
}

function deleteTransaction(index) {
  transactions.splice(index, 1);
  updateDisplay();
}

updateDisplay();
