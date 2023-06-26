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
    const sum = req.body.sum
    const id = req.body.accId

    const balance = Persistence.getBalanceFromAccountID(id)
    console.log("balance: ", JSON.stringify(balance))

    Persistence.makeDeposit(id, sum)
    res.json({message: "Deposit successfully placed!"})

})

app.post('/withdraw', (req, res) => {
    const sum = req.body.sum
    const id = req.body.accId

    const balance = Persistence.getBalanceFromAccountID(id)
    const transPossible = Persistence.checkWithdrawal(balance, sum)

    if (transPossible) {
        Persistence.makeWithdrawal(id, sum)
        res.json({message: 'Making withdrawal...' + '\n' + 'Current balance: '})
    } else {
        res.json({message: "Can't make a withdrawal: too poor..."})
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
