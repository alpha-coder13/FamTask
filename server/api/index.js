const router = require("express").Router();
const {POOL, FORMAT} = require("../helpers/database.helper")

router.get("/video-data", async (req, res) => {
    try {
        POOL.query('SELECT * FROM details').then((data)=>{
            DATA=data.rows
            DATA.sort((a,b)=> b.publish_date - a.publish_date)
            res.status(200).json(DATA)
        })
    } catch (err) {
        res.status(500).json(err)
    }
});


router.get("/video-search", async (req,res) => {
    try {
        if(req.query.title != undefined)
        {
            var temp=req.query.title.split(" ")
            temp=temp.join('&')
            console.log(temp)
            POOL.query(FORMAT("SELECT * FROM details WHERE to_tsvector( video_details ->> 'title') @@ to_tsquery( '%s' )",temp )).then((data) => {
                res.status(200).json(data.rows)            
            }).catch((err) =>{
                res.status(500).json(err)
            })
        }
        else if( req.query.description!= undefined ) {
            var temp = req.query.description.split(" ")
            temp = temp.join('&')
            POOL.query(FORMAT("SELECT * FROM details WHERE to_tsvector( video_details ->> 'description') @@ to_tsquery( '%s' )",temp )).then((data) => {
                res.status(200).json(data.rows)            
            }).catch((err) => {
                res.status(500).json(err)
            })
        }
        else {
            res.status(400).json( "Bad Params" )
        }
    } catch (err) {
        res.status(400).json(err)
    }

})

module.exports = router;
