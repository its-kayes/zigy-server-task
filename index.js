const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
let app = express();
let port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.5a38h.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run () {
    try {
        await client.connect();

        let userCollection = client.db('userList').collection('allUser');

        app.post('/useradd', async (req, res) => {
            let data = req.body;
            console.log(data);
            let result = await userCollection.insertOne(data);
            res.send(result);
        })

        app.get("/users", async(req, res)=> {
            let data = await userCollection.find().toArray();
            res.send(data)
        })

        app.delete('/deleteUser/:id', async(req, res) => {
            let id = req.params.id;
            let query = { _id: ObjectId(id) }
            let data = await userCollection.deleteOne(query);
            res.send(data);
        })





    }
    finally {

    }
}




run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Server running...')
});
app.listen(port, ()=> {
    console.log('Server on fire...')
})