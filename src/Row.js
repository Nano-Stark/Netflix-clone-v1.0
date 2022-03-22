import React, { useEffect, useState } from 'react'
import './Row.css'
import axios from './axios'
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const base_url = "https://image.tmdb.org/t/p/original/";

export const Row = ({ title, fetchUrl, isLargeRow }) => {

    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            // console.table(request.data.results);
            setMovies(request.data.results);
            return;
        }
        fetchData();
    }, [fetchUrl]);

    // console.table(movies);

    const opts = {
        height: '390',
        width: '640',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
      };

    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl('')
        } else {
            movieTrailer(movie?.title || movie?.name || movie?.original_name ||"")
            .then((url) => {
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get('v'));
            })
            .catch((error) => console.error(error));
        }
    }

  return (
    <div className="row">
        <h2>{title}</h2>
        <div className="row_posters">
            {movies.map((movie) => (
                <img 
                    className={`row_poster && 
                        ${isLargeRow && "row_posterLarge"}`}
                        onClick={() => handleClick(movie)}
                    key={movie.id}
                    src={`${base_url}${isLargeRow 
                        ? movie.poster_path 
                        : movie.backdrop_path}`}
                    alt={movie.name}
                />
            ))}
        </div>
        <div className="row_youtube">
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    </div>
  )
}
