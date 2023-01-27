// styles
import './index.css'

const omdb_options = {
    method: 'GET',
};
const streaming_options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '18238b954amshefd6aaa7a191f42p1c86f3jsn87ac70e1b309',
        'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
    }
};
document.getElementById("search-btn").addEventListener("click", function(){
    var movieName = document.getElementById("movie-name").value;
    fetch(`http://www.omdbapi.com/?apikey=e0113e99&t=${movieName}`)
        .then(response => response.json())
        .then(response => {
            var imdbID = response.imdbID;
            fetch(`https://streaming-availability.p.rapidapi.com/get/basic?country=au&imdb_id=${imdbID}&output_language=en`, streaming_options)
            .then(response => response.json())
            .then(response => {
                // Add the movie details to the HTML
                console.log(response)
                console.log(response.posterURLs.original)
                document.getElementById("movie-poster").src = response.posterURLs.original;
                document.getElementById("movie-title").innerHTML = response.originalTitle;
                document.getElementById("movie-year").innerHTML = response.year;
                document.getElementById("movie-plot").innerHTML = response.overview;
            })
            .catch(err => console.error(err));
        })
        .catch(err => console.error(err));
});