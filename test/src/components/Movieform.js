import React, { useState } from 'react'

function Movieform({ addMovie }) {

  const [movieName, setMovieName] = useState("");
  const [movieRating, setMovieRating] = useState();
  const [movieDuration, setMovieDuration] = useState("");
  const [durationValid, setDurationValid] = useState(true);

  const handleMovieName = (e) => {
    setMovieName(e.target.value);
  }

  const handleMovieRating = (e) => {
    setMovieRating(parseInt(e.target.value));
  }

  const handleMovieDuration = (e) => {
    setDurationValid(true);
    setMovieDuration(e.target.value);
  }

  const handleSubmit = () => {
    const validation = movieDurationValidation(movieDuration)
    if (!validation) {
      setDurationValid(false);
      return;
    }
    const movie = {
      name: movieName,
      rating: movieRating,
      duration: changeDurationFormat(movieDuration)
    }
    addMovie(movie);
  }

  const movieDurationValidation = (name) => {
    const regex = /^(\d[h])$|^(\d[.]\d[h])$|^(\d+[m])$/;
    return regex.test(name);
  }

  const changeDurationFormat = (duration) => {
    let ret = duration;
    if (duration.includes("m") > 0) {
      ret = (parseInt(duration.replace("m", "")) / 60).toFixed(2);
    } else {
      ret = duration.replace("h", "");
    }
    return ret;
  }

  return (
    <section>
      <div className='card pa-30'>
        <form onSubmit={e => e.preventDefault()}>
          <div className='layout-column mb-15'>
            <label htmlFor='name' className='mb-3'>Movie Name</label>
            <input
              type='text'
              id='name'
              placeholder='Enter Movie Name'
              data-testid='nameInput'
              value={movieName}
              onChange={(e) => handleMovieName(e)}
            />
          </div>
          <div className='layout-column mb-15'>
            <label htmlFor='ratings' className='mb-3'>Ratings</label>
            <input
              type='number'
              id='ratings'
              placeholder='Enter Rating on a scale of 1 to 100'
              data-testid='ratingsInput'
              min={1}
              max={100}
              onChange={(e) => handleMovieRating(e)}
            />
          </div>
          <div className='layout-column mb-30'>
            <label htmlFor='duration' className='mb-3'>Duration</label>
            <input
              type='text'
              id='duration'
              placeholder='Enter duration in hours or minutes'
              data-testid='durationInput'
              onChange={(e) => handleMovieDuration(e)}
            />
          </div>
          {/* Use this div when time format is invalid */}
          {!durationValid && (
            <div
              className='alert error mb-30'
              data-testid='alert'
            >
              Please specify time in hours or minutes (e.g. 2.5h or 150m)
            </div>
          )}
          <div className='layout-row justify-content-end'>
            <button
              type='submit'
              className='mx-0'
              data-testid='addButton'
              onClick={() => handleSubmit()}
            >
              Add Movie
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Movieform
