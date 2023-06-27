import fs from 'fs'

export default class Persistence {

    static checkWithdrawal(balance, sum) {
        return balance > sum
    }

    static makeWithdrawal(id, sum) {
        const balance = this.getBalanceFromAccountID(id)
        const finBal = balance - sum
        fs.writeFile('./db/' + id + '.txt', finBal.toString(), err => {
            if (err) {
                console.error(err);
            }
            // file written successfully
        });
    }


    static makeDeposit(id, sum) {
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
        if (fs.existsSync('./db/' + id + '.txt')) {
            sum = fs.readFileSync('./db/' + id + '.txt',
                {encoding: 'utf8', flag: 'r'});
        } else {
            fs.writeFileSync('./db/' + id + '.txt', '10000')
        }

        if (typeof sum === 'string' || sum instanceof String) {
            sum = parseInt(sum)
        }

        return sum
    }
}