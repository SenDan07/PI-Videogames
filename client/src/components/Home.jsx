import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllVidya, fetchAllGenres, filterByGenre } from "../redux/actions/actions";
import { Link } from "react-router-dom";
import VidyaCard from "./Card";
import GenresSelect from "./SortByGenreNav";
import Navigation from "./NavBar";
import Pagination from "./Pagination";

export default function Home(){

    const dispatch = useDispatch();
    const allVidya = useSelector(state => state.permutableVG);
    const allGenres = useSelector(state => state.genres)
    const [currentPage, setCurrentPage] = useState(1);
    const [vidyasPerPage] = useState(15);
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

    return(
        <div>

            <header>
                <h1>おはよう世界！</h1>
                <button onClick={e => {handleClick(e)}}>Clear Filters</button>
                <GenresSelect
                    allGenres={allGenres}
                    handler={handleFilterGenres}
                />
                <Navigation/>
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
                                    backgroundImage={e.backgroundImage}
                                />
                            </Link>
                        )
                    })
                }
            </main>

            <footer>
                <Link to='/videogames'>Create new videogame</Link> /
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