import express from 'express'
import Persistence from "./persistence.js";
import bodyParser from 'body-parser';

const app = express()
const port = 3000

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.get('/ping', (req, res) => {
    res.status(202)
    res.json({message: "Health Checker!"})
    // console.log(res.body)
    // res.send(res.body)
})

app.post('/deposit', (req, res) => {
    console.log('------------------deposit-------------------')
    const sum = req.body.sum
    const id = req.body.accId

    console.log("Incoming deposit request!")
    console.log("Account id:", id)

    const balance = Persistence.getBalanceFromAccountID(id)
    console.log("balance: ", JSON.stringify(balance))
    console.log(`sum: + ${sum}`)

    Persistence.makeDeposit(id, sum)
    res.status(202).json({message: "Deposit successfully placed!"})

    const nBalance = balance + sum
    console.log("New balance: ", JSON.stringify(nBalance))

})

app.post('/withdraw', (req, res) => {
    console.log('------------------withdraw-------------------')
    const sum = req.body.sum
    const id = req.body.accId

    console.log("Incoming withdrawal request!")
    console.log("Account id:", id)

    const balance = Persistence.getBalanceFromAccountID(id)
    const transPossible = Persistence.checkWithdrawal(balance, sum)

    console.log("balance: ", JSON.stringify(balance))
    console.log(`sum: - ${sum}`)

    if (transPossible) {
        Persistence.makeWithdrawal(id, sum)
        res.status(202).json({message: "Withdrawal successfully place!"})
    } else {
        res.status(404).json({message: "Can't make a withdrawal: Not enough money on the account!"})
        console.log("Can't make a withdrawal: Not enough money on the account!")
    }
    const nBalance = balance - sum
    console.log("New balance: ", JSON.stringify(nBalance))
})

app.listen(port, () => {
    console.log(`Account manager active on http://localhost:${port}`)
})
