export default function SearchComponent(props) {

    const {searchMovie, setSearchMovie, handleSearch} = props;

    return (
    <div className="film-search">
        <input 
            type="text" 
            name="search" 
            id="search-film" 
            placeholder="Search..." 
            value={searchMovie}
            onChange={(e) => setSearchMovie(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
    </div>
    )
}