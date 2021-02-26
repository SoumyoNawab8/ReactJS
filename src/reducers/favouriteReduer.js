
export const favouriteReducer=(state={},action)=>{
    
    switch(action.type){
        case 'loadFavourite':
            let favs=localStorage.getItem('favouriteMovies')?JSON.parse(localStorage.getItem('favouriteMovies')):[];
            return Object.assign({},state,{favourites:favs});
        case 'updateFavourite':
            let movie = action.payload;
            let favourites = state.favourites?state.favourites:[];
            let activeMovieIndex = favourites.findIndex(x=>x.id===movie.id);
            if(activeMovieIndex===-1){
              favourites.push(movie);
            }
            else{
              favourites.splice(activeMovieIndex,1);
            }
            localStorage.setItem('favouriteMovies',JSON.stringify(favourites));
            return Object.assign({},state,{favourites:favourites});;
        default:
            return state;
    }
}