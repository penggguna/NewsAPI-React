import React, { Component } from 'react'
import axios from 'axios'
import URL from './config'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

class News extends Component {
  constructor(props) {
    super(props)
    this.state = {
      articles: [],
      source: props.source
    }
  }

  render() {
    let { articles, source } = this.state
    const { classes } = this.props

    if (source != this.props.source) this.reloadSource()
    return (
      <div className={classes.root}>
        <GridList cellHeight={180} className={classes.gridList}>
          <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
            <ListSubheader component="div">Berita dari {this.props.source}</ListSubheader>
          </GridListTile>
          {articles.map(article => (
            <GridListTile key={article.urlToImage}>
              <img src={article.urlToImage} alt={article.title} />
              <GridListTileBar
                title={article.title}
                subtitle={<span>by: {article.source.name}</span>}
                actionIcon={
                  <IconButton className={classes.icon} href={article.url}>
                    <InfoIcon />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }
  componentDidMount() {
    this.reloadSource()
  }

  reloadSource() {
    axios
      .get(URL.topHeadlinesURL + URL.apiKey + URL.sources + this.props.source)
      .then(response => {
        console.log(response.data)
        let { data } = response
        this.setState({
          articles: data.articles
        })
      })
  }
}

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 1100,
    height: 900,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});

News.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(News);
