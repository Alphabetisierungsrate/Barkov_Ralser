import fs from 'fs'
import {DB} from "./db/database.js";


export class Persistence {
    constructor() {
        this.dbclient = new DB()
    }

    checkWithdrawal(balance, sum) {
        return balance > sum
    }

    async makeWithdrawal(id, sum) {
        const balance = await this.getBalanceFromAccountID(id)
        const finBal = parseInt(balance) - parseInt(sum)

        return await this.dbclient.makeWithdrawal(id, finBal)
    }


    async makeDeposit(id, sum) {
        const balance = await this.getBalanceFromAccountID(id)
        const finBal = parseInt(balance) + parseInt(sum)

        return await this.dbclient.makeDeposit(id, finBal)
    }

    async createAccount() {
        return await this.dbclient.insertAccount()
    }

    async getAccount(id) {
        return await this.dbclient.getAccount(id)
    }

    async getOperations(id) {
        return await this.dbclient.getOperations(id)
    }

    async setOperations(id, operation) {
        const ops = await this.dbclient.getOperations(id)
        ops.push(operation)
        return await this.dbclient.setOperation(id, ops)
    }

    async getBalanceFromAccountID(id) {
        return await this.dbclient.getBalance(id)
    }

    async getOverviewAllAcc() {
        return await this.dbclient.listAccounts()
    }
}

export const instance = new Persistence()