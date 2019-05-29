import React, { Component } from 'react';
import './ArticleTile.css';

const moment = require('moment');

class ArticleTile extends Component {
  render() {
    return (
      <li className={"Article-tile " + (this.props.read ? "Article-tile-read" : "")} key={this.props.item.slug} onClick={this.props.handleListItemClick}>
          <div className="Article-head">
            <div>{this.props.item.title}</div>
            <div>{this.props.item.byline}</div>
          </div>
          {moment(this.props.item.published.toString()).format('MMMM Do YYYY, h:mm:ss a')}
          <br />
          {this.props.item.wordCount + ' words (about ' + Math.ceil(this.props.item.wordCount / 225) + ' minutes)'}
      </li>
    );
  }
}

export default ArticleTile;
