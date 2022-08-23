const http=require('https')
const express = require('express')
const app=express()
const KEY=require('./apikey')
const exp = require('constants')


    const url = `https://www.googleapis.com/youtube/v3/search?key=${KEY}&part=id&order=date&maxResults=50&q=news`
    
    http.get(url, {'Accept':'application/json'}, (response)=>{

        let result=""
        response.on('data',(data)=>{
            result += data
        })

        response.on('close',()=>{
            result = JSON.parse(result)
            result.items.map((content) => {
                console.log(content)
                console.log(content.id)
            })
        })
})



app.listen(8000,()=>{
})