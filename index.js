const express = require('express');
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5000;
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');


//middleware

app.use(cors())
app.use(express.json())



// data base



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@helpnetwork.5hvks.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {



    try {

        await client.connect()

        const eventCollections = client.db("helpNetwork").collection("events");
        const lImageCollections = client.db("helpNetwork").collection("landingData");

        const volunteerCollections = client.db("helpNetwork").collection("volunteers");



        // laanfing page img load

        app.get('/imagedata', async (req, res) => {
            const query = {}
            const data = lImageCollections.find(query);
            const result = await data.toArray()
            res.send(result)
        })

        // add event
        app.post('/addevent', async (req, res) => {

            const event = req.body;

            const result = await eventCollections.insertOne(event)
            res.send(result)


        })

        // add volueteer

        app.post('/addvolunteer', async (req, res) => {
            const volunteer = req.body;
            const result = await volunteerCollections.insertOne(volunteer);
            res.send(result)
        })



        console.log('hello')



    }

    finally {

    }
}

run().catch(console.dir)


app.get('/', (req, res) => {
    res.send('helpNetwork Server is running')
})

app.listen(port, () => {
    console.log('server is running ar port', port)
})