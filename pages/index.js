import { Fragment, useEffect, useState } from 'react';
import { MongoClient } from 'mongodb';
import MeetupList from '../components/meetups/MeetupList'
import Head from 'next/head'


const Homepage = (props) =>
{
    // const[loadedMeetups,setLoadedMeetups  ] = useState([])
    // useEffect(()=>{
    //     setLoadedMeetups(DUMMY_MEETUPS)
    // },[])
    return <Fragment>
        <Head>
            <title>React Meetups</title>
            <meta name='description'
                content='Browse a huge list of highly ract meetups' />
        </Head>
        <MeetupList meetups={props.meetups} />
    </Fragment>
}

// export async function getServerSideProps(context)
// {
//     const req = context.req;
//     const res = context.res;
//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     }
// }
export async function getStaticProps()
{
    // const { title, image, address, description } = data
    const client = await MongoClient.connect('mongodb+srv://admin:8PRobIRzYpkVIGgx@cluster0.oqb0b.mongodb.net/videoData?retryWrites=true&w=majority')
    const db = client.db()
    const dbCollection = db.collection('meetups')
    const meetups = await dbCollection.find().toArray()
    client.close()

    return {
        props: {
            meetups: meetups.map((meetup) => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString(),

            }))
        },
        revalidate: 1
    }
}

export default Homepage