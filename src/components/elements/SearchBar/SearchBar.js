import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import './SearchBar.css'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete';
import { withStyles } from '@material-ui/core/styles';
import {debounce} from 'lodash'
import { Link } from 'react-router-dom';


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
      this.state = {
        name: '',
        options:[],
      };
      this.handleChange=this.handleChange.bind(this)
    }

  handleChange(event, newValue) {
    if (newValue && newValue.title) {
      this.setState({ name: newValue.title }, () => { this.props.history.push("/" + newValue.id); })
    }
    else{
      this.setState({ name: "" });
    }
  }

  static getDerivedStateFromProps(nextProps, state) {
    if (nextProps.searchedmovies) {
      return {
        options: nextProps.searchedmovies
      }
    }
  }
  render(){
    const { classes } = this.props;
    return(
      <div>
      <Autocomplete
      id="custom-input-demo"
      options={this.state.options}
      getOptionLabel={(option) => option.title?option.title:""}
      renderOption={(option, { inputValue }) => {
        return (
          <div>
            <Link className="searchedItem" to={{ pathname: `/${option.id}`, movieName: `${option.original_title}` }}>
              {option.title+" - "+option.release_date}
           </Link>
          </div>
        );
      }}
      onInputChange={(event, newInputValue) => {
        if(newInputValue.length>0){
          this.setState({name:newInputValue})
          debounce(() => this.props.callback(newInputValue), 2000)()
        }
        else{
          this.setState({options:[]})
        }
      }}
      inputValue={this.state.name}

      value={this.state.name}
        onChange={this.handleChange}
      renderInput={(params) => (
        <div ref={params.InputProps.ref}>
          <TextField
          {...params}
        id="name"
        className={classes.textField}
        placeholder={'Search'}
        margin="normal"
      />
        </div>
      )}
    />
      </div>
    )
  }
}

export default withStyles(styles)(withRouter(SearchBar));


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
