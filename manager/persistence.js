import fs from 'fs'

export default class Persistence {

    static checkWithdrawal(balance) {
        // console.log('hello')
    }

    static makeWithdrawal(id, sum) {
        // console.log("hello")
    }


    static makeDeposit(id, sum) {
        // console.log("hello")
        const balance = this.getBalanceFromAccountID(id)
        const finBal = balance + sum

        fs.writeFile('./db/' + id + '.txt', finBal.toString(), err => {
            if (err) {
                console.error(err);
            }
            // file written successfully
        });
    }

    static getBalanceFromAccountID(id) {
        // read from the db directory the files and get the result
        let sum = 10000
        try {
            sum = fs.readFileSync('./db/' + id + '.txt',
                { encoding: 'utf8', flag: 'r' });
        } catch (e) {
            console.log(e)
            fs.writeFileSync('./db/' + id + '.txt', '10000')
        }

        if (typeof sum === 'string' || sum instanceof String){
            sum = parseInt(sum)
        }
        console.log(sum)
        console.log(typeof sum)

        return sum
    }
}