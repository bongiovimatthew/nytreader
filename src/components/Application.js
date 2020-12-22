import React, { Component } from 'react';
import './Application.css';
import NYTAPI from '../services/nytquery';
// eslint-disable-next-line
import MockNYTAPI from '../services/nytquery_mock';
import ArticleTile from './ArticleTile';
import HeaderBlock from './HeaderBlock';
import SignIn from './SignIn';
import List from '@material-ui/core/List';
import { UserContext } from '../providers/UserProvider';
import { db } from '../firebase';

class Application extends Component {
  static contextType = UserContext;

  constructor() {
    super();
    this.state = {
      data: [],
      slugs: [],
      readSlugs: JSON.parse(localStorage.getItem('readSlugs')) || [],
      articlesToLoad: 0,
      isFetching: false,
      didFetch: false
    };
    this.NYTAPI = new NYTAPI();
  }

  async componentWillUpdate(nextProps, nextState, nextContext) {
    this.user = nextContext;
    if (this.user && !this.state.isFetching && !this.state.didFetch) {
      db.collection('users')
        .where('user_id', '==', this.user.uid)
        .get()
        .then(querySnapshot => {
          const data = querySnapshot.docs.map(doc => doc.data());
          if (data && data[0] && data[0].api_key) {
            this.NYTAPI.init(data[0].api_key);
            this.getData();
            this.setState({ didFetch: true });
          } else {
            // Could not get api key for user
            console.error('Error: no API key exists for user: ' + this.user.uid);
          }
        });
    }
  }

  getData() {
    this.setState({ isFetching: true });
    this.moreDataCallback_archive = this.moreDataCallback_archive.bind(this);
    //MockNYTAPI.beginGetData_archive(this.moreDataCallback_archive);
    this.NYTAPI.beginGetData_archive(this.moreDataCallback_archive);
  };

  async getArticleData(url) {
    // const response = await fetch(url, {mode: "no-cors"});
    // console.log("Fetching article HTML");
    // console.log(response);
  };

  moreDataCallback_archive(data, pagesRemaining) {
    if (!data) return;

    this.setState({ articlesToLoad: data.meta.hits });

    if (pagesRemaining > 0) {
      this.setState({ isFetching: true });
    } else {
      this.setState({ isFetching: false });
    }

    const simpleData = data.docs.map((item, index) => ({
      key: `${index}`,
      slug: `${item._id}`,
      url: `${item.web_url}`,
      published: new Date(item.pub_date),
      title: `${item.headline.main}`,
      byline: item.byline.original == null ? "" : `${item.byline.original}`,
      subheadline: `${item.abstract}`,
      item_type: `${item.document_type}`,
      wordCount: item.word_count
    }));

    const tempData = this.state.data;
    const tempSlugs = this.state.slugs;
    simpleData.forEach(element => {
      if (!(tempSlugs.includes(element.slug)) && element.url) {
        tempSlugs.push(element.slug);
        tempData.push(element);
      }
    });

    tempData.sort(function (a, b) {
      var x = a.published; var y = b.published;
      return ((x < y) ? 1 : ((x > y) ? -1 : 0));
    });

    this.setState({ data: tempData, slugs: tempSlugs });
  };

  moreDataCallback(data, pagesRemaining) {
    if (!data) return;

    this.setState({ articlesToLoad: data.num_results });

    if (pagesRemaining > 0) {
      this.setState({ isFetching: true });
    } else {
      this.setState({ isFetching: false });
    }

    const simpleData = data.results.map((item, index) => ({
      key: `${index}`,
      slug: `${item.slug_name}`,
      url: `${item.url}`,
      published: new Date(item.first_published_date),
      title: `${item.title}`,
      byline: `${item.byline}`,
      subheadline: `${item.subheadline}`,
      item_type: `${item.item_type}`
    }));

    const tempData = this.state.data;
    const tempSlugs = this.state.slugs;
    simpleData.forEach(element => {
      if (!(tempSlugs.includes(element.slug))) {
        tempSlugs.push(element.slug);
        tempData.push(element);
      }

      if (element.slug === "Cockburn") {
        this.getArticleData(element.url);
      }
    });

    tempData.sort(function (a, b) {
      var x = a.published; var y = b.published;
      return ((x < y) ? 1 : ((x > y) ? -1 : 0));
    });

    this.setState({ data: tempData, slugs: tempSlugs });
  }

  handleListItemClick(item) {
    const temp = this.state.readSlugs;
    if (!temp.includes(item.slug)) {
      temp.push(item.slug);
      this.setState({ readSlugs: temp });
      localStorage.setItem('readSlugs', JSON.stringify(this.state.readSlugs));
    }
    window.open(item.url);
  };

  handleCheckBoxChange(item, event) {
    const tags = event.target.checked ? ['my_problem'] : [];
    db.collection('articles')
      .add({
        user: this.user.uid,
        url: item.url,
        tags: tags,
        updated: Date.now()
      });
  };

  getTimeRemaining() {
    let wordCountRemaining = 0.0;
    this.state.data.forEach(element => {
      if (!this.state.readSlugs.includes(element.slug)) {
        wordCountRemaining += element.wordCount;
      }
    });

    const totalMinsRemaining = Math.ceil(wordCountRemaining / 225);
    const hoursRemaining = Math.floor(totalMinsRemaining / 60);
    const minsRemaining = Math.ceil(totalMinsRemaining - (hoursRemaining * 60));
    return `${hoursRemaining} hrs ${minsRemaining} mins`;
  };

  render() {
    return (
      !this.user ?
        <SignIn></SignIn>
        :
        <div className="App">
          The user is: {this.user.email}
          <HeaderBlock
            articlesToLoad={this.state.articlesToLoad}
            slugs={this.state.slugs}
            readSlugs={this.state.readSlugs}
            timeRemaining={this.getTimeRemaining()}
            isFetching={this.state.isFetching}
          />
          <button onClick={() => localStorage.clear()}>Clear Local Storage</button>
          <button onClick={() => this.getData()}>Refresh</button>
          <List className="Article-list">
            {this.state.data.map((item, index) => (
              <ArticleTile
                key={item.slug}
                index={index}
                item={item}
                handleListItemClick={this.handleListItemClick.bind(this, item)}
                handleCheckBoxChange={this.handleCheckBoxChange.bind(this, item)}
                read={this.state.readSlugs.includes(item.slug)}
              />
            ), this)}
          </List>
        </div>);
  }
}

export default Application;
