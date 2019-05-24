import React, { Component } from 'react';

class ArticleTile extends Component {
  render() {
    return (
      <div onPress={() => this.props.navigation.navigate('chat', { mentee: this.props.item.fullContact })}>
        <a href={this.props.url}></a>
      </div>
    );
  }
}

export default ArticleTile;
