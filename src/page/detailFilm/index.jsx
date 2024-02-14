import { useLocation, useNavigate } from 'react-router-dom';
import './detailFilm.css';
import { useEffect, useState } from 'react';
import { SearchByID } from '../../component/auth';

export default function DetailFilm() {

    const location = useLocation();
    const { imdbID } = location.state.detailFilm;
    const [dataFilm, setDataFilm] = useState({
        actors: '',
        director: '',
        genre: '',
        metascore: '',
        plot: '',
        poster: '',
        rated: '',
        ratings: [],
        release: '',
        runtime: '',
        title: '',
        writer: '',
        imdbRating: '',
        year: ''
    })
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const response = await SearchByID(imdbID);
            setDataFilm({
                actors: response.Actors,
                director: response.Director,
                genre: response.Genre,
                metascore: response.Metascore,
                plot: response.Plot,
                poster: response.Poster,
                rated: response.Rated,
                ratings: response.Ratings,
                release: response.Release,
                runtime: response.Runtime,
                title: response.Title,
                writer: response.Writer,
                imdbRating: response.imdbRating,
                year: response.Year
            })
        }

        fetchData();
    }, [imdbID, location])

    const handleBack = () => {
        navigate('/')
    }

    return (
        <div className="detail-film-container">
            <div className="detail-film">

                <div className="previous-page">
                    <p onClick={handleBack}>Back</p>
                </div>

                <div className="detail-film-title">
                    <h1>{dataFilm.title}</h1>
                    <div className="detail-film-title-extra">
                        <p>{dataFilm.year}</p>
                        <p>{dataFilm.rated}</p>
                        <p>{dataFilm.runtime}</p>
                    </div>
                </div>

                <div className="single-detail-film">
                    <div className="single-detial-image">
                        <img src={dataFilm.poster} alt="" />
                    </div>
                    <div className="single-detail-description">
                        <span>Genre: <strong>{dataFilm.genre ? dataFilm.genre : '-'}</strong></span>
                        <span className='detail-plot'>{dataFilm.plot ? dataFilm.plot : '-'}</span>
                        <span>Relese Date: {dataFilm.release ? dataFilm.release : '-'}</span>
                        <span>Director: <strong>{dataFilm.director ? dataFilm.director : '-'}</strong></span>
                        <span>Writer: <strong>{dataFilm.writer ? dataFilm.writer : '-'}</strong></span>
                        <span>Stars: <strong>{dataFilm.actors ? dataFilm.actors : '-'}</strong></span>
                        <span className='single-detail-rating'>Ratings: {dataFilm.ratings.map((rating, index) => (
                            <span className='rating-detail' key={index}>
                                <hr />
                                <span>Source: {rating.Source}</span>
                                <span>Rating: <strong>{rating.Value}</strong></span>
                            </span>
                        ))}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}