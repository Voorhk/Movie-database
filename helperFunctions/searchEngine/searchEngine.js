const request=require('request-promise-native')
const movie=require('../../models/movieModel')
function searchImage(name) {
    const term=name.split( ).join("_")
    return request.get(`https://en.wikipedia.org/wiki/${term}`).then((data)=>{
            return data.split("src=")[3].split("\"")[1];
        }
    )

}

 const searchEngine=function (movies) {
    const tasks=movies.map((name,i)=>{
        return request.get(`http://www.omdbapi.com/?s=${name}&apikey=1799f783`) //creating promise for every keyword
    })
    const result=Promise.all(tasks);//getting result of promise
    result.then(function(data){
        return data.map((movie)=>{
            return JSON.parse(movie) //parsing response string to object
        })
    }).then((data)=>{
       return data.map((single)=>{
            return single.Search; //getting array form response object
    })
    }).then((data)=>{
        return [].concat(...data) //turning array of arrray to single array
 }).then((data)=>{
     return data.map((single)=>{
       try{
           return single.imdbID //getting imdb id
       }
       catch(E){
       }
     })
     }).then((data)=>{
         return data.map((single)=>{
             console.log(single)
             return request.get(`http://www.omdbapi.com/?i=${single}&apikey=1799f783`) // making response promise
         })
     }).then((data)=>{
         Promise.all(data).then((single)=>{
            const db= single.map((second)=>{
                return movie.create(JSON.parse(second)).then((data)=>{
                    //parse response & saving db
     })})})
})
 }
module.exports={searchEngine,searchImage}
