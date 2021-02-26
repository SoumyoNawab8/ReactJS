import React, {
  Component
} from 'react';
import {
  Link
} from 'react-router-dom';
import './Header.css';
import PropTypes from 'prop-types';
import {
  withStyles
} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SearchBar from '../SearchBar/SearchBar';
import Typography from '@material-ui/core/Typography';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  headStyle: {
    backgroundColor: '#7024dd',
  },
};

class Header extends Component {
  render() {
    const {
      classes
    } = this.props;
    return (<div className={classes.root} >
      <AppBar position="fixed"
        className={classes.headStyle} >
        <Toolbar>
          <Typography variant="title"
            color="inherit"
            className={classes.flex}>
            MOVIE APP </Typography> 
            
            <Link className="navLink" to={{ pathname: `/favourites` }} title="Favourites"><FavoriteOutlinedIcon /></Link>

            <SearchBar callback={(value) => this.props.callback(value)} searchedmovies={this.props.searchedmovies}
            searchLoading={this.props.searchLoading} />
        </Toolbar> </AppBar> </div>
    );
  }

}


export default withStyles(styles)(Header);