export default function validations(input){ 
    let errors = {};

    const alphaNumExp = /^[a-zA-Z0-9 ]*$/; //letters, numbers and spaces
    const textExp = /^[.a-zA-Z0-9,¡!¿? ]*$/ //letters,numbers, spaces and punctuation
    const urlExp = /^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)\??.*$/ //image url

    //name
    if(!input.name){
        errors.name = 'Videogame name is required';
    } else if(!alphaNumExp.test(input.name)){
        errors.name = 'Videogame name is invalid';
    }
    //description
    if(!input.description){
        errors.description = 'A brief description of the videogame is required';
    } else if(!textExp.test(input.description)){
        errors.name = 'Videogame description is invalid';
    }
    //rating
    if(!input.rating){
        errors.rating = 'Videogame average score is required';
    } else if(input.rating <=0 || input.rating > 5){
        errors.rating = 'Average rating should be a value from 1 to 5.';
    }
    //release date
    if(!input.released){
        errors.released = 'Videogame release date is required';
    } else {
        let newDate = new Date(input.released);
        if(newDate > Date.now()){
            errors.released = 'Release date is invalid, cannot be set in the future';
        }
    }
    //genres
    if(input.genres.length <= 0){
        errors.genres = 'At least one genre is required';
    } else if(input.genres.length > 5){
        errors.genres = 'Cannot select more than 5 genres';
    }
    //platforms
    if(input.platforms <= 0){
        errors.platforms = 'At least one platform is required';
    } else if(input.platforms.length > 5){
        errors.genres = 'Cannot select more than 5 platforms';
    }
    //image
    if(!input.backgroundImage){
        errors.backgroundImage = 'Videogame cover image is required';
    } else if(!urlExp.test(input.backgroundImage)){
        errors.backgroundImage = 'Videogame image must be a valid image url';
    }

    return errors;
}