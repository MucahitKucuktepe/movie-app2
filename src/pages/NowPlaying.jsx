import React, { useRef, useState } from "react";
import { useMovieContex } from "../context/MovieContext";
import MovieCard from "../components/MovieCard";
import spinner from "../assets/Spinner-1.1s-250px.png";
import { useAuthContext } from "../context/AuthContext";
import { toastWarnNotify } from "../helpers/ToastNotify";
const API_KEY = process.env.REACT_APP_TMDB_KEY;
// const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${search}`;
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;
const Main = () => {
  const [page, setPage] = useState(1);
  const [isActiveMinus, setIsActiveMinus] = useState(false);
  const [isActivePlus, setIsActivePlus] = useState(false);
  // const [currentPage, setCurrentPage] = useState(0);
  const { getMovies, loading, nowPlaying, now } = useMovieContex();
  const { currentUser } = useAuthContext();
  const inputRef = useRef();

  console.log(now);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputRef.current.value && currentUser) {
      getMovies(SEARCH_API + inputRef.current.value);
    } else if (!currentUser) {
      toastWarnNotify("Please log in to search a movie");
    } else {
      toastWarnNotify("Please enter a text!");
    }

    console.log(inputRef.current.value);
  };
  const handleMinus = (e) => {
    if (page > 3) {
      setPage((prevPage) => prevPage - 3);
    }
    setIsActiveMinus(!isActiveMinus);
    setIsActivePlus(false);
    console.log(page);
    // console.log(currentPage);
    nowPlaying(page - 3);
  };
  const handlePlus = (e) => {
    setPage((prevPage) => prevPage + 3);
    setIsActiveMinus(false);
    setIsActivePlus(!isActivePlus);
    console.log(page);
    nowPlaying(page + 3);
  };
  const handlePage = (e) => {
    console.log(e.target.innerText);
    const currentPage = e.target.innerText;
    // setCurrentPage(e.target.innerText);
    console.log(currentPage);
    nowPlaying(currentPage);
    setIsActiveMinus(false);
    setIsActivePlus(false);
  };
  return (
    <div className="mt-9">
      <form className="flex justify-center p-2" onSubmit={handleSubmit}>
        <input
          type="search"
          className="w-80 h-8 rounded-md p-1 m-2"
          placeholder="Search a movie..."
          // onChange={(e) => setSearch(e.target.value)}
          ref={inputRef}
        />
        <button className="btn-danger-bordered" type="submit">
          Search
        </button>
      </form>
      <div className="flex flex-wrap justify-center">
        {loading ? (
          <div className="justify-center text-center text-blue-600 mt-52">
            <img src={spinner} alt="" className="w-[100vw]" />
            <span>Loading...</span>
          </div>
        ) : (
          now.map((now) => <MovieCard key={now.id} {...now} />)
        )}
      </div>
      <div className="flex justify-center">
        <nav>
          <ul className="flex">
            <button
              className={`mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out  hover:bg-yellow-400 cursor-pointer ${
                isActiveMinus ? "bg-yellow-400" : ""
              } active:bg-yellow-400  dark:text-white`}
              aria-label="Previous"
              onClick={handleMinus}
            >
              -
            </button>
            <button
              className={`mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out  hover:bg-red-400 cursor-pointer  dark:text-white`}
              onClick={handlePage}
            >
              {page}
            </button>
            <button
              className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out  hover:bg-red-400 cursor-pointer  dark:text-white"
              onClick={handlePage}
            >
              {page + 1}
            </button>
            <button
              className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out  hover:bg-red-400 cursor-pointer  dark:text-white"
              onClick={handlePage}
            >
              {page + 2}
            </button>
            <button
              className={`mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out  hover:bg-yellow-400 cursor-pointer ${
                isActivePlus ? "bg-yellow-400" : ""
              } active:bg-yellow-400  dark:text-white`}
              aria-label="Next"
              onClick={handlePlus}
            >
              +
            </button>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Main;
