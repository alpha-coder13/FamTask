const FETCH = async() => {
    
    var response_data = (await fetch ("http://localhost:8000/api/video-data", { method : "GET" }))

    response_data.json().then( (data) => {

        data.map( (value) => {

            var thumbnail = document.createElement ('img')
            thumbnail.id = 'thumbnail'
            thumbnail.src = value.video_details.thumbnail.url
            thumbnail.style.height = `${value.video_details.thumbnail.height}px`
            thumbnail.style.width= `${value.video_details.thumbnail.width}px`
            thumbnail.style.margin='15px'
            thumbnail.style.justifyContent='flex-start'
            thumbnail.style.alignItems='flex-start'

            var title = document.createElement ('h3')
            title.id = 'title'
            title.innerText = value.video_details.title
            title.style.margin='auto'
            title.style.justifyContent='center'
            title.style.alignItems='center'

            var description_button = document.createElement('button')
            description_button.id='d_button'
            description_button.innerText= "Show description"
            description_button.style.margin='20px'
            description_button.style.justifyContent='center'
            description_button.style.alignItems='center'
            description_button.onclick= () =>  {

                if ( document.getElementById(`description_${value.etag}`).style.display === 'none' )  document.getElementById(`description_${value.etag}`).style.display  = 'block'
                else document.getElementById(`description_${value.etag}`).style.display = 'none'

            }

            var description = document.createElement('p')
            description.id=`description_${value.etag}`
            description.innerText=value.video_details.description
            description.style.display='none'
            description.style.margin='auto'
            description.style.justifyContent='center'
            description.style.alignItems='center'

            var video_button = document.createElement('button')
            video_button.id='v_button'
            video_button.innerText= "Youtube"
            video_button.style.margin='auto'
            video_button.style.justifyContent='center'
            video_button.style.alignItems='center'
            video_button.onclick= () =>  {
                
               window.location.href=`https://www.youtube.com/watch?v=${value.video_id}`

            }
            
            var details_box = document.createElement('div')
            details_box.id = 'details_box'
            details_box.style.display='flex'
            details_box.style.flexDirection='column'
            details_box.style.margin='30px'
            details_box.style.height="100%"
            details_box.style.height="70%"


            details_box.appendChild(title)
            details_box.appendChild(description_button)
            details_box.appendChild(description)
            details_box.appendChild(video_button)

            var showbox = document.createElement('div')
            showbox.id = 'showbox'
            showbox.style.display='flex'
            showbox.style.margin='30px'
            showbox.style.height="50%"
            showbox.style.width="70%"

            showbox.appendChild(thumbnail)
            showbox.appendChild(details_box)

            document.getElementById('main_div').appendChild(showbox)
        })

    } )

}

FETCH()
