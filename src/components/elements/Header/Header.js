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

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  headStyle: {
    backgroundColor: 'black',
  },
};

class Header extends Component {
  render() {
    const {
      classes
    } = this.props;
    return ( <
      div className = {
        classes.root
      } >
      <
      AppBar position = "static"
      className = {
        classes.headStyle
      } >
      <
      Toolbar >
      <
      Typography variant = "title"
      color = "inherit"
      className = {
        classes.flex
      } >
      BoxOffice <
      /Typography> <
      SearchBar / >
      <
      /Toolbar> <
      /AppBar> <
      /div>
    );
  }

}


export default withStyles(styles)(Header);