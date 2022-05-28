const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.oqxk0.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect();
        const productCollection = client.db('booksHeaven').collection('book');
        const newItemCollection = client.db('booksHeaven').collection('newItem');


        app.get('/product', async (req, res) => {
            const query = {};
            const cursor = productCollection.find(query);
            const products = await cursor.toArray();
            res.send(products);
        });

        // Add new item API
        app.get('/addNewItem', async (req, res) => {
            // Finding data according to different user


            const cursor = newItemCollection.find(query);
            const newItems = await cursor.toArray();
            res.send(newItems);
        })

        app.post('/addNewItem', async (req, res) => {
            const newAdded = req.body;
            const result = await newItemCollection.insertOne(newAdded);
            res.send(result);
        })
    }
    finally {

    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Books Heaven is Running')
})

app.listen(port, () => {
    console.log('Books Heaven is Running on port', port);
})