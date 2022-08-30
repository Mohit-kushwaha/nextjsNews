import { Fragment } from "react"
import { MongoClient, ObjectId } from 'mongodb'
import MeetupDetail from "../../components/meetups/MeetupDetails"
const MeetupDetails = (props) =>
{

    return (
        <Fragment>
            {/* {console.log(props.meetupData.image)} */}
            <MeetupDetail
                image={props.meetupData.image}
                title={props.meetupData.title}
                address={props.meetupData.address}
                description={props.meetupData.description} />
        </Fragment>

    )
}

export async function getStaticPaths()
{
    const client = await MongoClient.connect('mongodb+srv://admin:8PRobIRzYpkVIGgx@cluster0.oqb0b.mongodb.net/videoData?retryWrites=true&w=majority')
    const db = client.db()
    const dbCollection = db.collection('meetups')
    const meetups = await dbCollection.find({}, { _id: 1 }).toArray()
    client.close()
    return {
        fallback: false,
        paths: meetups.map(meetup => ({
            params: { meetupId: meetup._id.toString() }
        }))
    };
}

export async function getStaticProps(context)
{
    const meetupId = context.params.meetupId
    console.log(meetupId);
    const client = await MongoClient.connect('mongodb+srv://admin:8PRobIRzYpkVIGgx@cluster0.oqb0b.mongodb.net/videoData?retryWrites=true&w=majority')
    const db = client.db()
    const dbCollection = db.collection('meetups')
    const selectedMeetups = await dbCollection.findOne({ _id: ObjectId(meetupId) })
    client.close()
    return {
        props: {
            meetupData: {
                id: selectedMeetups._id.toString(),
                title: selectedMeetups.title,
                address: selectedMeetups.address,
                image: selectedMeetups.image,
                description: selectedMeetups.description,
            },
        }
    }
}

export default MeetupDetails