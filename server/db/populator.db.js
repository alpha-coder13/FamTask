const { VIDEO_FETCHER}=require("../helpers/youtube.helper")
const { POOL, FORMAT } = require("../helpers/database.helper")

const DATABASE_POLULATOR = () => {

    VIDEO_FETCHER().then((response_data) => {

        response_data.forEach((Data) => {

                var temp=[Data.ETAG,Data.VIDEOID,Data.DATE,Data.DETAILS]
    
                POOL.query( FORMAT('INSERT INTO details VALUES (%L)', temp )).then().catch((err) => console.error(err))
    
    
            }) 
    
    })

}

module.exports = DATABASE_POLULATOR 


