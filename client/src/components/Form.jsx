import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postNewVidya, fetchAllVidya, fetchAllGenres, fetchAllPlatforms} from "../redux/actions/actions";
import BlankCheckboxInput from "./FormCheckbox";


export default function VidyaCreateForm(){
    const dispatch = useDispatch();
    const allGenres = useSelector(state => state.genres);
    const allPlatforms = useSelector(state => state.platforms);
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const [input, setInput] = useState({
        name: '',
        description: '',
        released: '',
        rating: '',
        platforms: [],
        backgroundImage: '',
        genres: []
    });

    function validations(input){
        let errors = {};
        if (!input.name){
            errors.name = 'Please fill the name to proceed.';
        }
        if(!input.description){
            errors.description = 'Please fill the description to proceed.';
        }
        if(!input.released || input.released > Date.now()){
            errors.released = 'Release date should be a valid value.';
        }
        if(!input.rating || input.rating < 5){
            errors.rating = 'Average rating sshould be a value from 0 to 5.';
        }
        if(!input.platforms){
            errors.platforms = 'Select at least one platform to proceed.';
        }
        if(!input.backgroundImage){
            errors.backgroundImage = 'Please enter an image url.';
        }
        if(!input.genres){
            errors.genres = 'Select at least one genre to proceed';
        }
        return errors;
    }


    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        setErrors(validations({
            ...input,
            [e.target.name]: e.target.value
        }))
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
            <button onClick={() => navigate('/home')}>Return to Main Page</button>

            <h1>Add New Videogame</h1>

            <form onSubmit={e => handleSubmit(e)} >

                <div>
                    <label htmlFor='name'>Name:</label>
                    <input type='text' value={input.name} name='name' onChange={(e) => handleChange(e)} />
                    {errors.name && (
                        <p className="error">{errors.name}</p>
                    )}
                </div>

                <div>
                    <label htmlFor='description'>Description:</label>
                    <input type='text' value={input.description} name='description' onChange={(e) => handleChange(e)} />
                    {errors.description && (
                        <p className="error">{errors.description}</p>
                    )}
                </div>

                <div>
                    <label htmlFor='releasedDate'>Release Date:</label>
                    <input type='date' id="releasedDate" value={input.released} name='released' onChange={(e) => handleChange(e)} />
                    {errors.released && (
                        <p className="error">{errors.released}</p>
                    )}
                    
                </div>

                <div>
                    <label htmlFor='rating' >Average Score:</label>
                    <input type='number' value={input.rating} name='rating' min={0} max={5} placeholder='0.00' step='0.01' pattern="^\d+(?:\.\d{1,2})?$" onChange={(e) => handleChange(e)} />
                    {errors.rating && (
                        <p className="error">{errors.rating}</p>
                    )}
                </div>

                <div>
                    <label htmlFor='backgroundImage'>Image</label>
                    <input type='text' value={input.backgroundImage} name='backgroundImage' onChange={(e) => handleChange(e)} />
                    {errors.backgroundImage && (
                        <p className="error">{errors.backgroundImage}</p>
                    )}
                </div>
                

                <BlankCheckboxInput
                    attribute={'Genres'}
                    attributeSet={allGenres}
                    handler={handleCheckGenres}
                />
                {errors.genres && (
                        <p className="error">{errors.genres}</p>
                    )}

                <BlankCheckboxInput
                    attribute={'Platforms'}
                    attributeSet={allPlatforms}
                    handler={handleCheckPlatforms}
                />
                {errors.platforms && (
                        <p className="error">{errors.platforms}</p>
                    )}

                <button type='submit' >Add New Videogame</button>
            </form>

        </main>
    )
}