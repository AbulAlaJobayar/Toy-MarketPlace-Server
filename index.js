const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

require("dotenv").config();
app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ph1akes.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const toyCollection = client.db("assingment11").collection("hometoy");
    const dataCollection = client.db("assingment11").collection("alldata");

    app.get("/homedata", async (req, res) => {
      const result = await toyCollection.find().toArray();
      res.send(result);
    });

    app.get("/alltoyes", async (req, res) => {
      const result = await dataCollection.find({}).toArray();
      res.send(result);
    });

    app.get("/postdata/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await dataCollection.findOne(query);
      res.send(result);
    });

    app.get("/mytoys/:email", async (req, res) => {
      const result = await dataCollection
        .find({ selleremail: req.params.email })
        .toArray();
      res.send(result);
    });

    app.post("/postdata", async (req, res) => {
      const body = req.body;
      console.log(body);
      const result = await dataCollection.insertOne(body);
      res.send(result);
    });
    app.put("/postdata/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = req.body;
      const updateToy = {
        $set: {
          price: updateDoc.price,
          quantity: updateDoc.quantity,
          details: updateDoc.details,
        },
      };
      const result = await dataCollection.updateOne(filter, updateToy, options);
      res.send(result);
    });

    app.delete("/postdelete/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await dataCollection.deleteOne(query);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("assignment 11 running on head");
});

app.listen(port, () => {
  console.log(`Assignment-11-server listening on port ${port}`);
});
