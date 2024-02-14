import { Routes, Route } from 'react-router-dom';
import './App.css';
import FilmList from './page/filmList';
import DetailFilm from './page/detailFilm';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<FilmList />} />
      <Route exact path="detail-film" element={<DetailFilm />} />
    </Routes>
  );
}

export default App;
