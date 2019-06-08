import React, { Component } from 'react';
import './ArticleTile.css';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';

const moment = require('moment');

// className={"Article-tile " + (this.props.read ? "Article-tile-read" : "")} 

class ArticleTile extends Component {
  render() {

    const elevation = this.props.read ? 0 : 4;
    return (
      <ListItem key={this.props.item.slug} onClick={this.props.handleListItemClick}>
        <Paper elevation={elevation} classes={{root: {background: 'grey'}}} className="Article-tile">        
          <Typography variant="h5" component="h3">{this.props.item.title}</Typography>
          <Typography component="h4">{this.props.item.byline}</Typography>
          <Typography component="p">{moment(this.props.item.published.toString()).format('MMMM Do YYYY, h:mm:ss a')}</Typography>
          <Typography component="p">{this.props.item.wordCount + ' words (about ' + Math.ceil(this.props.item.wordCount / 225) + ' minutes)'}</Typography>
        </Paper>
      </ListItem>
    );
  }
}

export default ArticleTile;
