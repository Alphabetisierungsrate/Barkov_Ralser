import {Router} from 'express';
import {instance as db} from "../db/database.js";
import {instance as persistance} from "../persistence.js";

const router = Router();
router.post('/deposit', async (req, res) => {
    console.log('------------------deposit-------------------')
    const sum = req.body.sum
    const id = req.body.accId

    console.log("Incoming deposit request!")
    console.log("Account id:", id)

    const balance = await persistance.getBalanceFromAccountID(id)
    console.log("balance: ", JSON.stringify(balance))
    console.log(`sum: + ${sum}`)

    await persistance.makeDeposit(id, sum).then(r => {
        if (r) {
            console.log('nice')
        } else {
            console.log('error')
        }
    })
    await persistance.setOperations(id, `+${sum}`)

    console.log("New balance: ", await persistance.getBalanceFromAccountID(id))
    res.status(202).json({message: "Deposit successfully placed!"})
})

router.post('/withdraw', async (req, res) => {
    console.log('------------------withdraw-------------------')
    const sum = req.body.sum
    const id = req.body.accId

    console.log("Incoming withdrawal request!")
    console.log("Account id:", id)

    const balance = await persistance.getBalanceFromAccountID(id)
    const transPossible = persistance.checkWithdrawal(balance, sum)

    console.log("balance: ", JSON.stringify(balance))
    console.log(`sum: - ${sum}`)

    if (transPossible) {
        await persistance.makeWithdrawal(id, sum).then(r => {
            if (r) {
                console.log('nice')
            } else {
                console.log('error')
            }
        })
        await persistance.setOperations(id, `-${sum}`)
        console.log("New balance: ", await persistance.getBalanceFromAccountID(id))
        res.status(202).json({message: "Withdrawal successfully place!"})
    } else {
        res.status(404).json({message: "Can't make a withdrawal: Not enough money on the account!"})
        console.log("Can't make a withdrawal: Not enough money on the account!")
    }
})

router.get('/getBalance', async (req, res) => {
    const resp = await persistance.getOverviewAllAcc()
    // console.log('middleware:', resp)
    res.json(resp)
})

router.get('/create', async (req, res) => {
    let accId = await persistance.createAccount()
    console.log('accId', accId)
    res.status(200).json(accId)
})

export default router