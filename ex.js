class ExpenseApp {
  constructor() {
    this.db = []
  }



  create(newExpense) {
    newExpense['id'] = this.db.length + 1
    this.db.push(newExpense);
    return this.db
  }
  get() {
    return this.db
  }

  getById(id) {
    const result = this.db.find(record => record.id == id);

    if (!result) {
      throw Error("Record not found")
    }

    return result
  }
}


const expenseTracker = new ExpenseApp();

let newExpense = {
  name: "Food",
  amount: 1200,
  date: new Date().toISOString()
}

expenseTracker.create(newExpense);

console.log(expenseTracker.get());

console.log(expenseTracker.getById(1))

