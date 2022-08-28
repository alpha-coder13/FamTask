const AXIOS = require('axios').default
const KEYS_POOL = require('../config')

const VALID_KEY = async () => {
   
    for(var a=0;a<KEYS_POOL.length;a++){
        try{
            let key= await AXIOS.get(`https://www.googleapis.com/youtube/v3/search?key=${KEYS_POOL[a]}&part=id&maxResults=1`)
            if(key.data) { return KEYS_POOL[a]}
        } catch( err ){
        }

    }
 
 }

const VIDEO_FETCHER = async() => {

    let KEY= await VALID_KEY()

    const SEARCH_URL=`https://www.googleapis.com/youtube/v3/search?key=${ KEY }&part=snippet&order=date&maxResults=20&q=music`
    
    let return_data=[]

    try{
    var response= await AXIOS.get(SEARCH_URL)

    Object.keys(response.data.items).forEach((key,index) => {

        var temp = {}

        temp.VIDEOID = response.data.items[key].id.videoId
        temp.ETAG = response.data.items[key].etag
        temp.DATE = new Date(response.data.items[key].snippet.publishedAt).toISOString() 
        temp.DETAILS={}
        temp.DETAILS.title = JSON.stringify(response.data.items[key].snippet.title)
        temp.DETAILS.description = response.data.items[key].snippet.description
        temp.DETAILS.thumbnail = response.data.items[key].snippet.thumbnails.medium

        return_data.push( temp )

    })
    }
    catch (err){
        console.log(err.body)
    }

    return return_data
}

// const DETAILS_FETCHER= async( id ) => {

//     VALID_KEY()

//     var VIDEOS_URL=`https://www.googleapis.com/youtube/v3/videos?key=${await KEY}&part=snippet&id=${id}&type=video&publishedAfter=${new Date().toISOString()}`
    
//     let return_data={}

//     var response= await AXIOS.get(VIDEOS_URL)

//     return_data.DATE = response.data.items[0].snippet.publishedAt
//     return_data.DETAILS={}
//     return_data.DETAILS.title = toString(response.data.items[0].snippet.title)
//     return_data.DETAILS.description = response.data.items[0].snippet.description
//     return_data.DETAILS.thumbnail = response.data.items[0].snippet.thumbnails.medium
//     // return_data.TAGS = response.data.items[0].snippet.tags

//     return return_data

// }

module.exports = { 
    VIDEO_FETCHER , 
    // DETAILS_FETCHER,
    VALID_KEY
}