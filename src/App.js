import './App.css';
import { Row } from './Row';
import requests from './requests';
import Banner from './Banner';
import Navbar from './Navbar';

const App = () => {
  return (
    <div className="app">
        <Navbar />
        <Banner />

        <Row isLargeRow title="Netflix Originals" fetchUrl={requests.fetchNetflixOriginals} />
        <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
        <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
        <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
        <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
        <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
        <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
        <Row title="Documetaries" fetchUrl={requests.fetchDocumentaries} />
    </div>
  );
}

export default App;