
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// Returns a Promise that resolves after "ms" Milliseconds
const timer = ms => new Promise(res => setTimeout(res, ms))
const id = getRandomInt(100000)


const resp = await fetch("http://localhost:3000/ping")
console.log("response:", JSON.stringify(resp.body))

for (let i = 0; i < i + 1; i++) {
    const timeout = getRandomInt(10) * 1000
    const deposit = getRandomInt(2) > 0
    const sum = getRandomInt(1000)

    console.log("Making request to the bank...")

    if (deposit) {
        console.log("Depositing: ", sum, "from: ", id)
        const response = await fetch('http://localhost:3000/deposit', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({accId: id, sum: sum})
        })

    } else {
        // console.log("Withdrawing: ", sum, "from: ", id)
        // const response = await fetch('http://localhost:3000/withdraw', {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({accId: id, sum: sum})
        // })

    }

    await timer(timeout);
}



