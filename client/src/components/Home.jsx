import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllVidya, fetchAllGenres, filterByGenre, filterByDataStorage, sortAlphabetically, sortByRating } from "../redux/actions/actions";
import { Link } from "react-router-dom";
import VidyaCard from "./Card";
import GenresSelect from "./SortByGenreNav";
import SearchBar from "./SearchBar";
import Navigation from "./NavBar";
import Pagination from "./Pagination";

export default function Home(){

    const dispatch = useDispatch();
    const allVidya = useSelector(state => state.permutableVG);
    const allGenres = useSelector(state => state.genres)
    const [currentPage, setCurrentPage] = useState(1);
    const [vidyasPerPage] = useState(15);
    const [sorted, setSorted] = useState('')
    const indexOfLastVidya = currentPage * vidyasPerPage;
    const indexOfFirstVidya = indexOfLastVidya - vidyasPerPage;


    const currentThumbnails = allVidya.slice(indexOfFirstVidya, indexOfLastVidya);

    const pages = (pageNumber) =>{
        setCurrentPage(pageNumber)
    };

    useEffect(() =>{
        dispatch(fetchAllVidya())
    },[dispatch]);

    useEffect(() =>{
        dispatch(fetchAllGenres())
    }, [dispatch]);

    function handleClick(e){
        e.preventDefault();
        dispatch(fetchAllVidya());
        setCurrentPage(1);
    };

    function handleFilterGenres(e){
        dispatch(filterByGenre(e.target.value));
        setCurrentPage(1);
    }

    function handleFilterByStorage(e){
        dispatch(filterByDataStorage(e.target.value));
        setCurrentPage(1)
    }

    function handleSortAlphabetically(e){
        e.preventDefault();
        dispatch(sortAlphabetically(e.target.value));
        setCurrentPage(1);
        setSorted(`Sorted ${e.target.value}`)
    }

    function handleSortByRating(e){
        e.preventDefault();
        dispatch(sortByRating(e.target.value));
        setCurrentPage(1);
        setSorted(`Sorted ${e.target.value}`)
    }

    return(
        <div>

            <header>
                <h1>おはよう世界！</h1>
                <h1>Welcome Aboard！</h1>
                <button onClick={e => {handleClick(e)}}>Clear Filters</button>
                <GenresSelect
                    allGenres={allGenres}
                    handler={handleFilterGenres}
                    />
                <Navigation
                    byNameCB={handleSortAlphabetically}
                    dataStorageCB={handleFilterByStorage}
                    byRatingCB={handleSortByRating}
                    />
                <SearchBar
                    setCurrentPage={setCurrentPage}
                />
            </header>

            <main>
                {
                    currentThumbnails?.map((e)=>{
                        return(
                            <Link to={'/home/' + e.id}>
                                <VidyaCard
                                    key={e.id}
                                    name={e.name}
                                    genres={e.genres.join(' / ')}
                                    backgroundImage={e.backgroundImage ? e.backgroundImage : <img src="url:test.gif" alt="videogame case cover"/>}
                                />
                            </Link>
                        )
                    })
                }
            </main>

            <footer>
                <Link to='/videogame_creation'>Create new videogame</Link> /
                {/* {console.log(pages)} */}
                <Pagination
                    vidyasPerPage={vidyasPerPage}
                    totalVidyas={allVidya.length}
                    pages={pages}
                />
            </footer>
            
        </div>
    )
}