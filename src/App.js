import React from 'react';
import './App.css';
import NYTAPI from './services/nytquery';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      slugs: [],
      readSlugs: [],
      articlesToLoad: 0,
      isFetching: true
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    // this.moreDataCallback = this.moreDataCallback.bind(this);
    // NYTAPI.beginGetData(this.moreDataCallback);

    this.moreDataCallback_archive = this.moreDataCallback_archive.bind(this);
    NYTAPI.beginGetData_archive(this.moreDataCallback_archive);
  };

  async getArticleData(url){
    // const response = await fetch(url, {mode: "no-cors"});
    // console.log("Fetching article HTML");
    // console.log(response);
  };

  moreDataCallback_archive(data, pagesRemaining){
    if (!data) return;

    this.setState({ articlesToLoad: data.meta.hits });

    if (pagesRemaining > 0){
      this.setState({ isFetching: true });
    }else{
      this.setState({isFetching: false});
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
      wordCount: `${item.word_count}`
    }));

    const tempData = this.state.data;
    const tempSlugs = this.state.slugs;
    simpleData.forEach(element => {
      if (!(tempSlugs.includes(element.slug)) && element.url){
        tempSlugs.push(element.slug);
        tempData.push(element);
      }
    });

    tempData.sort(function(a, b) {
      var x = a.published; var y = b.published;
      return ((x < y) ? 1 : ((x > y) ? -1 : 0));
    });

    this.setState({ data: tempData, slugs: tempSlugs });
  };

  moreDataCallback(data, pagesRemaining){
    if (!data) return;

    this.setState({ articlesToLoad: data.num_results });

    if (pagesRemaining > 0){
      this.setState({ isFetching: true });
    }else{
      this.setState({isFetching: false});
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
      if (!(tempSlugs.includes(element.slug))){
        tempSlugs.push(element.slug);
        tempData.push(element);
      }

      if (element.slug === "Cockburn"){
        this.getArticleData(element.url);
      }
    });

    tempData.sort(function(a, b) {
      var x = a.published; var y = b.published;
      return ((x < y) ? 1 : ((x > y) ? -1 : 0));
    });

    this.setState({ data: tempData, slugs: tempSlugs });
  }

  handleListItemClick(item){
    console.log(`Clicked item:`);
    console.log(item.slug);
    const temp = this.state.readSlugs;
    if (!temp.includes(item.slug)){
      temp.push(item.slug);
      this.setState({readSlugs: temp});
    }
  };
  
  render() {
    return (<div className="App">
      <div className="Loading">
        <div>Total Articles: {this.state.articlesToLoad}</div>
        <div>Articles Loaded: {this.state.slugs.length}</div>
        {this.state.isFetching && <CircularProgress />}
      </div>     
      <ul className="Article-list">
      {this.state.data.map((item, index) => (
        <li className="Article-item" key={index} onClick={this.handleListItemClick.bind(this, item)}>
          {index+1}
          {this.state.readSlugs.includes(item.slug) ? "Read" : null}
          <a className="Article-item" href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a>
          {item.published.toString()}
          <br />
          {item.byline}
          <br />
          {item.wordCount + ' words (about ' + Math.ceil(item.wordCount / 225) + ' minutes)'}
        </li>
      ), this)}
      </ul>
    </div>);
  }
}

export default App;
