import React, { Component } from 'react';
import './HeaderBlock.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { db } from '../firebase';
import { UserContext } from '../providers/UserProvider';

class HeaderBlock extends Component {
  static contextType = UserContext;

  constructor() {
    super();
    this.state = {
      urlValue: ''
    };

    this._handleInputValueChange = this._handleInputValueChange.bind(this);
  }

  async componentWillUpdate(nextProps, nextState, nextContext) {
    this.user = nextContext;
  }

  handleMarkButtonClick() {
    db.collection('articles')
      .add({
        user: this.user.uid,
        url: this.state.urlValue,
        tags: ['my_problem'],
        updated: Date.now()
      });
      this.setState({
        urlValue: ''
      });
  }

  _handleInputValueChange(event) {
    this.setState({
      urlValue: event.target.value
    });
  }

  render() {
    return (
      <div>
        <Typography component="h3">Articles: {this.props.slugs.length}</Typography>
        <Typography component="h3">Remaining: {this.props.slugs.length - this.props.readSlugs.length}</Typography>
        <Typography component="h3">Time Remaining: {this.props.timeRemaining}</Typography>
        <Grid container direction="row" justify="center" alignItems="center" spacing={3}>
          <Grid item>
            <form noValidate autoComplete="off">
              <TextField
                id="standard-basic"
                label="Article"
                value={this.state.urlValue}
                onChange={this._handleInputValueChange} />
            </form>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={() => this.handleMarkButtonClick()}>Mark</Button>
          </Grid>
        </Grid>
        {this.props.isFetching && <CircularProgress />}
      </div>
    );
  }
}

export default HeaderBlock;
