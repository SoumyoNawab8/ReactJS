import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './MovieThumb.css';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';

const MovieThumb = (props) => {
  return (
    <div className="rmdb-moviethumb">
      {props.clickable ?
        <Link to={{ pathname: `/${props.movieId}`, movieName: `${props.movieName}` }}>
          <img src={props.image} alt="moviethumb" />
        </Link>
        :
        <img src={props.image} alt="moviethumb" />
      }
      <span onClick={props.toggleFavourite} className="favouriteAddBtn">{props.isFavourite ?<FavoriteBorderOutlinedIcon />:<FavoriteOutlinedIcon />}</span>
    </div>
  )
}

MovieThumb.propTypes = {
  image: PropTypes.string,
  movieId: PropTypes.number,
  movieName: PropTypes.string
}

export default MovieThumb;