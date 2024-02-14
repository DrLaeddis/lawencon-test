import { useCallback, useEffect, useRef, useState } from "react"
import { SearchFilm } from "../../component/auth";
import SearchComponent from "../../component/search/search";
import AllModal from "../../component/modal/modal";
import { useNavigate } from "react-router-dom";

export default function FilmList() {

    const [searchMovie, setSearchMovie] = useState("");
    const [dataSearch, setDataSearch] = useState([]);
    const [noDataFilm, setNoDataFilm] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);  
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [modalPoster, setModalPoster] = useState(false);
    const [modalData, setModalData] = useState([]);
    const observer = useRef();
    const navigate = useNavigate();

    const handleSearch = async() => {
        setCurrentPage(1);
        setLoading(true);
        const result = await SearchFilm(searchMovie, currentPage);
        console.log(result);
        if(result.error) {
            setNoDataFilm(result.error);
            setDataSearch([]);
        } else {
            setNoDataFilm(null);
            setDataSearch(result);
        }
        setHasMore(result.length > 0);
        setLoading(false);
    }

    const loadMoreResults = useCallback(async () => {
        if (!hasMore || loading) return;
        setLoading(true);
        const nextPage = currentPage + 1;
        const result = await SearchFilm(searchMovie, nextPage);
        setDataSearch((prevData) => [...prevData, ...result]);
        setCurrentPage(nextPage);
        setHasMore(result.length > 0);
        setLoading(false);
    }, [currentPage, hasMore, loading, searchMovie]);

    const lastFilmElementRef  = useCallback((node) => {
        if (loading) return;

        if (observer.current) {
            observer.current.disconnect();
        }

        observer.current = new IntersectionObserver((entries) => {
            if(entries[0].isIntersecting && !loading) {
                loadMoreResults();
            }
        });

        if(node) {
            observer.current.observe(node);
        }
    }, [loading, loadMoreResults]);

    useEffect(() => {
        const handleScroll = () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
    
          if (scrollTop + windowHeight > documentHeight - 100) {
            loadMoreResults();
          }
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
    }, [loadMoreResults]);

    const handleShowModal = (newValue, dataFilm) => {
        setModalPoster(newValue)
        setModalData(dataFilm)
    }

    const handleDetailFilm = (value) => {
        navigate('/detail-film', {
            state: {
                detailFilm: value
            }
        });
    }

    return (
        <div className="film-list-container">
            <div className="film-list-title">
                <h1>Film List</h1>
            </div>

            <SearchComponent 
                searchMovie={searchMovie}
                setSearchMovie={setSearchMovie}
                handleSearch={handleSearch}
            />

            <hr />

            
            {noDataFilm &&
                <div className="film-list-error">
                    <h1>{noDataFilm}</h1>
                </div>
            }

            <div className="film-list-all">
                {dataSearch.map((items, index) => (                
                    <div className="film-box" key={index} ref={index === dataSearch.length - 1 ? lastFilmElementRef : null}>
                        <div className="film-poster">
                            <img src={items.Poster} alt="" onClick={()=> handleShowModal(true, items)} />
                        </div>
                        <div className="film-desc">
                            <h2 className="title" onClick={()=>handleDetailFilm(items)}>{items.Title}</h2>
                        </div>
                    </div>
                ))}
            </div>

            <div className="loading">
                {loading && <p>Loading...</p>}
            </div>

            <AllModal 
                openModal={modalPoster}
                handleShowModal={handleShowModal}
                modalData={modalData}
            />
        </div>
    )
}