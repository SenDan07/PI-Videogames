import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postNewVidya, fetchAllVidya, fetchAllGenres, fetchAllPlatforms} from "../redux/actions/actions";
import BlankCheckboxInput from "./FormCheckbox";

export default function VidyaCreateForm(){
    const dispatch = useDispatch();
    // const allVidya = useSelector(state => state.permutableVG);
    const allGenres = useSelector(state => state.genres);
    const allPlatforms = useSelector(state => state.platforms);
    const navigate = useNavigate();
    const [input, setInput] = useState({
        name: '',
        description: '',
        released: '',
        rating: '',
        platforms: [],
        backgroundImage: '',
        genres: []
    });

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    };

    function handleCheckGenres(e){
        const { checked, name } = e.target;
        let checkedGenres = [];
        checked ? checkedGenres = [...input.genres, name] : checkedGenres = [...input.genres].filter(e => e !== name);

        setInput({
            ...input,
            genres: checkedGenres
        });
    };

    function handleCheckPlatforms(e){
        const { checked, name } = e.target;
        let checkedPlatforms = [];
        checked ? checkedPlatforms = [...input.platforms, name] : checkedPlatforms = [...input.platforms].filter(e => e !== name);

        setInput({
            ...input,
            platforms: checkedPlatforms
        });
    };

    function handleSubmit(e){
        e.preventDefault();
        console.log(input);
        dispatch(postNewVidya(input));
        alert('Videogame Added Successfully');
        navigate('/home');
        setInput({
            name: '',
        description: '',
        released: '',
        rating: '',
        platforms: [],
        backgroundImage: '',
        genres: []
        })
    }

    useEffect(() =>{
        dispatch(fetchAllGenres())
    }, [dispatch]);

    useEffect(() =>{
        dispatch(fetchAllVidya())
    }, [dispatch]);

    useEffect(() =>{
        dispatch(fetchAllPlatforms())
    }, [dispatch]);

    return(
        <main>

            <Link to='/home'>
                <button>Return to Main Page</button>
            </Link>

            <h1>Add New Videogame</h1>

            <form onSubmit={e => handleSubmit(e)} >

                <div>
                    <label htmlFor='name'>Name:</label>
                    <input type='text' value={input.name} name='name' onChange={(e) => handleChange(e)} />
                </div>

                <div>
                    <label htmlFor='description'>Description:</label>
                    <input type='text' value={input.description} name='description' onChange={(e) => handleChange(e)} />
                </div>

                <div>
                    <label htmlFor='releasedDate'>Release Date:</label>
                    <input type='date' id="releasedDate" value={input.released} name='released' onChange={(e) => handleChange(e)} />
                    
                </div>

                <div>
                    <label htmlFor='rating' >Average Score:</label>
                    <input type='number' value={input.rating} name='rating' min={0} max={5} placeholder='0.00' step='0.01' pattern="^\d+(?:\.\d{1,2})?$" onChange={(e) => handleChange(e)} />
                </div>

                <div>
                    <label htmlFor='backgroundImage'>Image</label>
                    <input type='text' value={input.backgroundImage} name='backgroundImage' onChange={(e) => handleChange(e)} />
                </div>
                

                <BlankCheckboxInput
                    attribute={'Genres'}
                    attributeSet={allGenres}
                    handler={handleCheckGenres}
                />

                <BlankCheckboxInput
                    attribute={'Platforms'}
                    attributeSet={allPlatforms}
                    handler={handleCheckPlatforms}
                />

                <button type='submit' >Add New Videogame</button>
            </form>

        </main>
    )
}