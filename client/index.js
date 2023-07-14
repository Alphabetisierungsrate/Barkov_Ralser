import {default as ax} from 'axios'

class Runner {
    constructor() {
        this.timer = ms => new Promise(res => setTimeout(res, ms))
    }

    async init() {
        await this.ping()
        this.id = await this.create()
        console.log('local id:', this.id)
        await this.run()
    }

    async run() {
        for (let i = 0; i < i + 1; i++) {
            const timeout = this.getRandomInt(10) * 1000
            const deposit = this.getRandomInt(2) > 0
            const sum = this.getRandomInt(1000)
            console.log()

            console.log(`Making request number: ${i + 1} to the bank...`)

            if (deposit) {
                console.log("Depositing:", sum, "from:", this.id)
                this.makeDeposit(sum).then(r => r)

            } else {
                console.log("Withdrawing:", sum, "from:", this.id)
                this.makeWithdrawal(sum).then(r => r)
            }
            await this.timer(timeout);
        }
    }


    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    async makeDeposit(sum) {
        // return await fetch('http://172.17.0.1:3000/deposit', {
        await ax.post('http://localhost:8080/api/deposit', {accId: this.id, sum: sum})
            .then(r => {
                console.log(r.data)
            })
    }

    async makeWithdrawal(sum) {
        // return await fetch('http://172.17.0.1:3000/withdraw', {
        await ax.post('http://localhost:8080/api/withdraw', {accId: this.id, sum: sum})
            .then(r => {
                console.log(r.data)
            })
    }

    async ping() {
        await ax.get('http://localhost:8080/ping')
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    async create() {
        return await ax.get('http://localhost:8080/api/create')
            .then(function (response) {
                return response.data
            })
            .catch(function (error) {
                console.log(error);
            })
    }
}

new Runner().init().then(r => r)


