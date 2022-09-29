import React, { useState, useEffect } from 'react'
import './App.css'
import 'h8k-components'

import { Movieform, Movieslist, Search } from './components'

const title = 'Favorite Movie Directory'

function App() {
  const [movieList, setMovieList] = useState([]);
  const [filter, setFilter] = useState("");
  const [shownList, setShownList] = useState([]);

  useEffect(() => {
    if (filter.length < 2) {
      setShownList(movieList)
      return;
    } else {
      setShownList(movieList.filter(movie => movie.name.toLowerCase().includes(filter)))
    }
  }, [movieList, filter])

  const addMovie = (movie) => {
    const movieArr = [...movieList, movie];
    movieArr.sort(function (a, b) {
      return b.duration - a.duration;
    });
    setMovieList(movieArr);
  }

  return (
    <div>
      <h8k-navbar header={title} />
      <div className='layout-row justify-content-center mt-100'>
        <div className='w-30 mr-75'>
          <Movieform addMovie={addMovie} />
        </div>
        <div className='layout-column w-30'>
          <Search setFilter={setFilter} />
          <Movieslist movieList={shownList} />
          {filter.length >= 2 && shownList.length === 0 && (
            <div data-testid='noResult'>
              <h3 className='text-center'>No Results Found</h3>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default App;
