import readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const expenseList = [];
let total = 0;

const showmenu = () => {
    console.log("\n1: Add an Expense");
    console.log("2: View Total Expense");
    console.log("3: Exit");

    rl.question("Choose an option: ", handleInput);
};

const addNewExpense = (amount, description, category) => {

    // Auto generate next ID
    const autoId =
        expenseList.length > 0
            ? Math.max(...expenseList.map(item => item.id)) + 1
            : 1;

    // Auto generate current date
    const currDate = new Date().toISOString().split("T")[0];

    // Create new expense object
    const newExpense = {
        id: autoId,
        date: currDate,
        description: description,
        amount: parseFloat(amount),
        category: category
    };

    expenseList.push(newExpense);

    // Update total
    total += newExpense.amount;

    console.log(`\nExpense added successfully with ID ${autoId} !!`);

    showmenu();
};

const handleInput = (option) => {

    if (option === "1") {

        rl.question("Enter amount: ", (amount) => {

            rl.question("Enter description: ", (description) => {

                rl.question("Enter category: ", (category) => {

                    addNewExpense(amount, description, category);

                });

            });

        });

    } 
    
    else if (option === "2") {

        console.log(`\nYour Total Expense is: ₹${total}`);

        console.log("\nYour Expenses are:");

        expenseList.forEach((expense, index) => {
            console.log(
                `${index + 1}. ${expense.description} | ₹${expense.amount} | ${expense.category} | ${expense.date}`
            );
        });

        showmenu();
    } 
    
    else if (option === "3") {

        console.log("Good Byee !!");
        rl.close();

    } 
    
    else {

        console.log("Invalid Option. Please Try Again !!");
        showmenu();
    }
};

showmenu();
