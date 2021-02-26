import React, { Component } from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL, POSTER_SIZE, BACKDROP_SIZE } from '../../config';
import HeroImage from '../elements/HeroImage/HeroImage';
import Header from '../elements/Header/Header';
import FourColGrid from '../elements/FourColGrid/FourColGrid';
import MovieThumb from '../elements/MovieThumb/MovieThumb';
import LoadMoreBtn from '../elements/LoadMoreBtn/LoadMoreBtn';
import Spinner from '../elements/Spinner/Spinner';
import '../Home/Home.css';
import { connect } from 'react-redux';
import Navigation from '../elements/Navigation/Navigation';


class Favourites extends Component {
  state = {
    movies: [],
    heroImage: null,
    loading: false,
    currentPage: 0,
    totalPages: 0,
    searchTerm: '',
    searchedMovies: [],
  }

  componentDidMount() {
    this.props.getFavourites();
  }

  static getDerivedStateFromProps(props,state) {
    if(props.favouriteReducer.favourites){
      return {movies:props.favouriteReducer.favourites}
    }
  }


  render() {
    console.log(this.props.favouriteReducer.favourites)
    return (
      <div>
        <Navigation movie="Favourites" />
        <div className="rmdb-home">
          <div className="rmdb-home-grid">
            <FourColGrid
              header={'Favourite Movies'}
              loading={this.state.loading}
            >
              {this.state.movies.map((element, i) => {
                return <MovieThumb
                  key={i}
                  clickable={true}
                  image={element.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${element.poster_path}` : './images/no_image.jpg'}
                  movieId={element.id}
                  movieName={element.original_title}
                  isFavourite={this.props.favouriteReducer.favourites.findIndex(x=>x.id===element.id)===-1}
                  toggleFavourite={()=>this.props.updateFavourites(element)}
                />
              })}
            </FourColGrid>
            {this.state.movies.length===0 && <div>Added Favourites will appear here</div>}

            {this.state.loading ? <Spinner /> : null}
          </div>
        </div>
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return { favouriteReducer: state.favouriteReducer }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getFavourites: () => { dispatch({ type: 'loadFavourite' }) },
    updateFavourites: (data) => { dispatch({ type: 'updateFavourite', payload: data }) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favourites);
