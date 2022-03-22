import React, { useEffect, useState } from 'react'
import './Banner.css'
import axios from './axios';
import requests from './requests';

const Banner = () => {
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals);
            const reqs = request.data.results[
                Math.floor(Math.random() * request.data.results.length - 1)
            ]
            // console.log(reqs);
            setMovie(reqs)
        }
        fetchData();
    }, []);

    // console.log(movie);

    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n -1) + "..." : str;
    }
  return (
    <header className="banner"
        style={{
            backgroundSize: "cover",
            backgroundImage: `url(
                "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
            )`,
            backgroundPosition: "center center"
        }}
    >
        <div className="banner_contents">
            <h1 className="banner_title">
                {movie?.title || movie?.name || movie?.original_name}
            </h1>

            <div className="banner_buttons">
                <button className="banner_button">Play</button>
                <button className="banner_button">My List</button>
            </div>

            <h1 className="banner_description">
                {truncate(movie?.overview, 500)}
            </h1>
        </div>

        <div className="banner--fadeBottom" />
    </header>
  )
}

export default Banner