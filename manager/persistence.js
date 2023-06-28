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

    static getBalfromAccs() {
        let ids, sums
        let filez

        fs.readdir('./db', function (err, files) {
            //handling error
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            }
            filez = files
            //listing all files using forEach
        })
        // filez.forEach(function (file) {
        //     // Do whatever you want to do with the file
        //     let sum = fs.readFileSync(`./db/${file}`,
        //         {encoding: 'utf8', flag: 'r'});
        //
        //
        //     console.log(file);
        //     console.log(sum)
        //
        //
        //     ids.push(file)
        //     sums.push(sum)
        // });
        return {ids: "123", sums: "10000"}
    }
}