import React, { Component } from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL, POSTER_SIZE, BACKDROP_SIZE } from '../../config';
import HeroImage from '../elements/HeroImage/HeroImage';
import Header from '../elements/Header/Header';
import FourColGrid from '../elements/FourColGrid/FourColGrid';
import MovieThumb from '../elements/MovieThumb/MovieThumb';
import LoadMoreBtn from '../elements/LoadMoreBtn/LoadMoreBtn';
import Spinner from '../elements/Spinner/Spinner';
import './Home.css';
import { connect } from 'react-redux';


class Home extends Component {
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
    if (localStorage.getItem('HomeState')) {
      const state = JSON.parse(localStorage.getItem('HomeState'));
      this.setState({ ...state });
    } else {
      this.setState({ loading: true });
      const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
      this.fetchItems(endpoint);
    }
  }

  searchItems = (searchTerm) => {
    let endpoint = '';
    this.setState({
      searchTerm,
      searchedMovies: []
    })
    endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}`;

    fetch(endpoint)
      .then(result => result.json())
      .then(result => {
        this.setState({
          searchedMovies: [...result.results]
        })
      })
      .catch(error => console.error('Error:', error))

  }



  loadMoreItems = () => {
    let endpoint = '';
    this.setState({ loading: true });

    if (this.state.searchTerm === '') {
      endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${this.state.currentPage + 1}`;
    } else {
      endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${this.state.searchTerm}&page=${this.state.currentPage + 1}`;
    }
    this.fetchItems(endpoint);
  }

  fetchItems = (endpoint) => {
    fetch(endpoint)
      .then(result => result.json())
      .then(result => {
        this.setState({
          movies: [...this.state.movies, ...result.results],
          heroImage: this.state.heroImage || result.results[0],
          loading: false,
          currentPage: result.page,
          totalPages: result.total_pages
        }, () => {
          if (this.state.searchTerm === "") {
            localStorage.setItem('HomeState', JSON.stringify(this.state));
          }
        })
      })
      .catch(error => console.error('Error:', error))
  }

  render() {
    return (
      <div>
        <Header callback={(value) => this.searchItems(value)} searchedmovies={this.state.searchedMovies} />
        <div className="rmdb-home">
          {this.state.heroImage ?
            <div>
              <HeroImage
                image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${this.state.heroImage.backdrop_path}`}
                title={this.state.heroImage.original_title}
                text={this.state.heroImage.overview}
              />
            </div> : null}
          <div className="rmdb-home-grid">
            <FourColGrid
              header={this.state.searchTerm ? 'Search Result' : 'Popular Movies'}
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
            {this.state.loading ? <Spinner /> : null}
            {(this.state.currentPage <= this.state.totalPages && !this.state.loading) ?
              <LoadMoreBtn text="Load More" onClick={this.loadMoreItems} />
              : null}
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
