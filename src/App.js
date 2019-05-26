import React, { Component } from 'react';
import axios from 'axios'
import URL from './config'
import './App.css';

import Headlines from './Headlines'
import News from './News'
import SearchNews from './SearchNews';

import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sources: [],
      sourceValue: 'headlines',
      searchValue: ''
    };
    this.handleChangeSource = this.handleChangeSource.bind(this);
    this.handleChangeSearch = this.handleChangeSearch.bind(this);
  }

  componentDidMount() {
    axios
      .get(URL.sourcesURL + URL.apiKey)
      .then(response => {
        console.log(response.data)
        let { data } = response
        this.setState({
          sources: data.sources,
        })
      })
  }

  render() {
    let { sources, sourceValue, searchValue } = this.state
    const { classes } = this.props;
    return (

      <div className="root">

        <AppBar position="static">
          <Toolbar>
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              News API | Dary
            </Typography>
            <div className={classes.grow} />
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Cari Berita.."
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                value={searchValue} onChange={this.handleChangeSearch}
              />
            </div>
          </Toolbar>
        </AppBar>

        <Typography className={classes.title} variant="h6" color="inherit" noWrap>
          Sumber Berita
        </Typography>
        <select value={this.state.sourceValue} onChange={this.handleChangeSource}>
          <option value="headlines">Top Headlines</option>
          {sources.map((source, i) => {
            return (
              <option key={i} value={source.id}>
                {source.name}
              </option>
            );
          })}
        </select>
        {
          this.state.searchValue != '' ? <SearchNews search={searchValue} /> : this.state.sourceValue == 'headlines' ? <Headlines /> : <News source={sourceValue} />
        }
      </div>
    );
  }

  handleChangeSource(event) {
    this.setState({ sourceValue: event.target.value });
    console.log(this.state.sourceValue);
  }
  handleChangeSearch(event) {
    this.setState({ searchValue: event.target.value });
    console.log(this.state.searchValue);
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
});

export default withStyles(styles)(App);