import {MongoClient, ObjectId} from "mongodb";

export class DB {
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    constructor(uri = "mongodb://localhost:27017") {
        this.uri = uri;
        this.client = this._init()
        this.db = this.client.db('vs').collection('accounts')
        this.client.db('vs').dropDatabase()
        this.admin = this.client.db().admin()

    }

    _init() {
        return new MongoClient(this.uri)
    }

    async ping() {
        try {
            await this.client.connect();
            await this.admin.command({ping: 1});
            console.log("Pinged your deployment.");
            await this.listDatabases(this.client);
        } finally {
            // Ensures that the client will close when you finish/error
            await this.client.close();
        }
    }

    async pingDB() {
        try {
            const res = await this.admin.command({ping: 1});
            return res.ok === 1;
        } catch (err) {
            console.error(err);
        }
        return false;
    }

    async listDatabases() {
        const databasesList = await this.admin.listDatabases();

        console.log("Databases:");
        databasesList.databases.forEach(db => console.log(` - ${db.name}`));
    }

    async insertAccount() {
        let date = new Date().getTime()
        const result = await this.db.insertOne({dateCreated: date, balance: 10000, operations: []})
        console.log(`New account created with following id: ${result.insertedId}`)
        return result.insertedId
    }

    async getAccount(id) {
        const result = await this.db.findOne({_id: new ObjectId(id)})
        if (result) {
            console.log(`Found account: ${result}`)
            return result
        } else {
            console.log('No account found!')
            return null
        }
    }

    async getOperations(id){
        const result = await this.db.findOne({_id: new ObjectId(id)})
        if (result){
            return result.operations
        } else {
            return null
        }
    }

    async setOperation(id, operations){
        const result = await this.db.updateOne({_id: new ObjectId(id)}, {$set: {operations: operations}})
        if (result){
            return result.matchedCount
        } else {
            return null
        }
    }


    async listAccounts() {
        const result = await this.db.find({}).toArray()
        if (result) {
            console.log(`Found accounts: ${result.length}`)
            return result
        } else {
            console.log('No accounts found!')
            return null
        }
    }

    async getBalance(id) {
        const result = await this.db.findOne({_id: new ObjectId(id)})
        // console.log('balance', result)
        return result.balance
    }

    async makeDeposit(id, sum){
        const result = await this.db.updateOne({_id: new ObjectId(id)}, {$set: {balance: sum}})
        return result.matchedCount
    }

    async makeWithdrawal(id, sum) {
        const result = await this.db.updateOne({_id: new ObjectId(id)}, {$set: {balance: sum}})
        return result.matchedCount
    }
}

export const instance = new DB();

const db = new DB()
await db.ping()
