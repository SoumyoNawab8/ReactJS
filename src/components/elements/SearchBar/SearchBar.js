import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import './SearchBar.css'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
});

class SearchBar extends Component{
  constructor(props) {
      super(props);
      this.state = {name: ''};
      this.handleChange=this.handleChange.bind(this)
    }

    handleChange(event){
      this.setState({name:event.target.value})
    }

  render(){
    const { classes } = this.props;
    return(
      <div>
      <form className={classes.container} noValidate autoComplete="off">
      <TextField
        id="name"
        className={classes.textField}
        placeholder={'Search'}
        value={this.state.name}
        onChange={this.handleChange}
        margin="normal"
      />
    </form>
      </div>
    )
  }
}

export default withStyles(styles)(SearchBar);


// class SearchBar extends Component {
//   state = {
//     value: ''
//   }
//
//   timeout = null;
//
//   doSearch = (event) => {
//     this.setState({ value: event.target.value })
//     clearTimeout(this.timeout);
//
//     this.timeout = setTimeout( () => {
//       this.props.callback(this.state.value);
//     }, 500);
//   }
//
//   render(){
//     return (
//       <div className="rmdb-searchbar">
//         <div className="rmdb-searchbar-content">
//           <FontAwesome className="rmdb-fa-search" name="search" size="2x" />
//           <input
//             type="text"
//             className="rmdb-searchbar-input"
//             placeholder="Search"
//             onChange={this.doSearch}
//             value={this.state.value}
//           />
//         </div>
//       </div>
//     )
//   }
// }
//
// export default SearchBar;
