//selecting elements
const dashboardBtn = document.getElementById("dashboard-button");
const expenseBtn = document.getElementById("expenses-button");
const statsPanel = document.getElementById("stats-panel");
const dashboardHeading = document.getElementById("dashboard-heading");
const chart = document.getElementById("chart-panel");
const dashboardPanel = document.getElementById("dashboard-panel");
const categoryNavBtn = document.getElementById("categories-button");
const expenseDetails = document.getElementById("dashboard-details");
const categories = document.getElementById("categories");
const ctx = document.getElementById("chart").getContext("2d");
const title = document.getElementById("title");
const amount = document.getElementById("amount");
const category = document.getElementById("category");
const date = document.getElementById("date");
const addExpenseBtn = document.getElementById("add-expense-btn");
const tBody = document.getElementById("expenseTableBody");
const TotalExpenditure = document.getElementById("totalExpenses");
//making an array to store expenses
let expenses = [];

//making an array of objects while clicking expense btn
addExpenseBtn.addEventListener("click", (e) => {
    e.preventDefault();
  const expense = {
    id:expenses.length+1,
    title: title.value,
    amount: Number(amount.value),
    category: category.value,
    date: date.value,

};
  expenses.push(expense);
  displayExpenseList();
  calculateTotalExpenditure();
  
  
});

//displaying values on expenses list
function displayExpenseList() {
  tBody.innerHTML = "";
  expenses.forEach((expense) => {
    const row = document.createElement("tr");
    const removeBtn=document.createElement("button");      
    removeBtn.textContent="Remove";
    removeBtn.classList.add("remove-btn");
    row.innerHTML = `
    <td>${expense.id}</td>
    <td>${expense.title}</td>
    <td>${expense.category}</td>
    <td>${expense.amount}</td>
    <td>${expense.date}</td>
    
    
`;
row.appendChild(removeBtn);
tBody.append(row);
//remove button functionality
removeBtn.addEventListener("click",(e)=>
{
   expenses = expenses.filter(item => item.id !== expense.id);
    displayExpenseList();
    calculateTotalExpenditure(); 
  
});
  });

}
function calculateTotalExpenditure()
{
  const total=expenses.reduce((sum,expense)=>
  {
    return sum+expense.amount;
  },0)
  TotalExpenditure.textContent=`Rs. ${total}`;
}

//Tab Switching
function shiftToExpenseTab() {
  expenseBtn.addEventListener("click", () => {
    statsPanel.style.display = "none";
    dashboardHeading.style.display = "none";
    chart.style.display = "none";
    categories.style.display = "none";
    dashboardPanel.style.display = "grid";
    expenseDetails.style.display = "grid";
  });
}
function shiftToDashboardTab() {
  dashboardBtn.addEventListener("click", () => {
    statsPanel.style.display = "grid";
    dashboardHeading.style.display = "flex";
    chart.style.display = "flex";
  });
}
function shiftToCategoryTab() {
  categoryNavBtn.addEventListener("click", () => {
    statsPanel.style.display = "none";
    dashboardHeading.style.display = "none";
    chart.style.display = "none";
    dashboardPanel.style.display = "none";
    expenseDetails.style.display = "none";
    categories.style.display = "flex";
  });
}
function setUpChart(type) {
  let chart = new Chart(ctx, {
    type,
    data: {
      labels: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      datasets: [
        {
          label: "expenses",
          data: [10, 20, 30, 40, 50, 60, 70],
          backgroundColor: [
            "#6366F1",
            "#3B82F6",
            "#10B981",
            "#F59E0B",
            "#EF4444",
            "#8B5CF6",
            "#14B8A6",
          ],
        },
      ],
    },
    options: {
      animation: false,
      responsive: true,
      maintainAspectRatio: false,
    },
  });
  chart.options.animation = true;
}
setUpChart("pie");
shiftToCategoryTab();
shiftToExpenseTab();
shiftToDashboardTab();
