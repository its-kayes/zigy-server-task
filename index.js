const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
let app = express()
let port = process.env.PORT || 8000

app.use(express())
app.use(cors())

const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.5a38h.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run () {
    try {
        await client.connect();

        let userCollection = client.db('userList').collection('allUser');

        app.post('/useradd', async (req, res) => {
            let data = req.body;
            let result = await userCollection.insertOne(data);
            res.send(result);
        })





    }
    finally {

    }
}





app.get('/', (req, res) => {
    res.send('Server running...')
});
app.listen(port, ()=> {
    console.log('Server on fire...')
})