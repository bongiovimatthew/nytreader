import React, { Component } from 'react';
import './HeaderBlock.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

class HeaderBlock extends Component {
  render() {
    return (
      <div> 
        <Typography component="h3">Articles: {this.props.slugs.length}</Typography>
        <Typography component="h3">Remaining: {this.props.slugs.length - this.props.readSlugs.length}</Typography>
        <Typography component="h3">Time Remaining: {this.props.timeRemaining}</Typography>
        {this.props.isFetching && <CircularProgress />}
      </div>
    );
  }
}

export default HeaderBlock;
