const express = require('express');

const app = express();

const db = [{ id: 1, name: "Transport", amount: 4000, date: new Date('2022-11-19').toISOString }, { id: 2, name: "Excerpt", amount: 20000, date: new Date('2022-11-19').toISOString }];

app.use(express.json())

app.get("/api/expense", (req, res) => {
  return res.status(200).json(db);
})

app.post("/", (req, res) => {

  const newExpense = {
    id: db.length + 1,
    name: req.body.name,
    amount: req.body.amount,
    date: new Date(req.body.date).toISOString
  }

  db.push(newExpense);

  return res.status(201).json(db);

})

app.get("/api/expense/:id", (req, res) => {
  const { id } = req.params;

  const result = db.filter(record => record.id == id);

  if (result) {
    return res.status(200).json(...result)
  }

  return res.status(404).json({ error: " Record not found" })
})

app.delete("/api/expense/:id", (req, res) => {
  const { id } = req.params;
  const db = [{ id: 1, name: "Transport", amount: 4000, date: new Date('2022-11-19').toISOString }, { id: 2, name: "Excerpt", amount: 20000, date: new Date('2022-11-19').toISOString }];

  const result = db.findIndex((record) => record.id === id);
  if (!result) {
    return res.status(404).json({ error: "No record found!" })
  }

  db.splice(result, 1);
  return res.status(200).json({ message: "Item has been deleted" })
})

app.put("/api/expense/:id", (req, res) => {
  const { id } = req.params;
  const result = db.find((record) => record.id === Number(id));
  const index = db.findIndex((record) => record.id === Number(id));

  if (result) {
    const updatedExpense = {
      id: Number(id),
      name: req.body.name || result.name,
      amount: req.body.amount || result.amount,
      date: new Date(req.body.date).toISOString || result.date
    }

    db.splice(index, 1, updatedExpense);
    console.log(db);
    return res.status(201).json(updatedExpense);
  }
  return res.status(404).json({ error: "No record found" })

})


app.listen(3000, console.log("server is running"))

