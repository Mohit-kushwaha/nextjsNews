import { MongoClient } from 'mongodb'

async function handler(req, res)
{
    if (req.method === 'POST')
    {
        const data = req.body;
        // const { title, image, address, description } = data
        const client = await MongoClient.connect('mongodb+srv://admin:8PRobIRzYpkVIGgx@cluster0.oqb0b.mongodb.net/videoData?retryWrites=true&w=majority')
        const db = client.db()
        const dbCollection = db.collection('meetups')
        const result = await dbCollection.insertOne(data)
        console.log(result);
        client.close()

        res.status(201).json({ msg: 'Meetup Inserted' })
    }
}

export default handler