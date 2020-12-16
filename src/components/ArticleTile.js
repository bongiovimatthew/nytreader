import React, { Component } from 'react';
import './ArticleTile.css';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Star from '@material-ui/icons/Star';
import StarBorder from '@material-ui/icons/StarBorder';

const moment = require('moment');

class ArticleTile extends Component {
  render() {

    const elevation = this.props.read ? 0 : 4;
    return (
      <ListItem key={this.props.item.slug} >
        <Paper
          onClick={this.props.handleListItemClick}
          elevation={elevation}
          classes={{ root: { background: 'grey' } }}
          className="Article-tile">
          <Typography variant="h5" component="h3">{this.props.item.title}</Typography>
          <Typography component="h4">{this.props.item.byline}</Typography>
          <Typography component="p">{moment(this.props.item.published.toString()).format('MMMM Do YYYY, h:mm:ss a')}</Typography>
          <Typography component="p">{this.props.item.wordCount + ' words (about ' + Math.ceil(this.props.item.wordCount / 225) + ' minutes)'}</Typography>
        </Paper>
        <Paper
          classes={{ root: { background: 'grey' } }}
          className="Article-checkbox">
          <FormGroup row>
            <FormControlLabel
              control={<Checkbox icon={<StarBorder />} checkedIcon={<Star />} name="problem" />}
              label="My problem"
              onChange={this.props.handleCheckBoxChange}
            />
          </FormGroup>
        </Paper>
      </ListItem>
    );
  }
}

export default ArticleTile;
