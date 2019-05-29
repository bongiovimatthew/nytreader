import React from 'react';
import './App.css';
import NYTAPI from './services/nytquery';
import MockNYTAPI from './services/nytquery_mock';
import CircularProgress from '@material-ui/core/CircularProgress';
import ArticleTile from './components/ArticleTile';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      slugs: [],
      readSlugs: JSON.parse(localStorage.getItem('readSlugs')) || [],
      articlesToLoad: 0,
      isFetching: true
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    this.moreDataCallback_archive = this.moreDataCallback_archive.bind(this);
    // MockNYTAPI.beginGetData_archive(this.moreDataCallback_archive);
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
      wordCount: item.word_count
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
      localStorage.setItem('readSlugs', JSON.stringify(this.state.readSlugs));
    }
    window.open(item.url);
  };

  getTimeRemaining() {
    let wordCountRemaining = 0.0;
    this.state.data.forEach(element => {
      if (!this.state.readSlugs.includes(element.slug)){
        wordCountRemaining += element.wordCount;
      }
    });

    const totalMinsRemaining = Math.ceil(wordCountRemaining / 225);
    const hoursRemaining = Math.floor(totalMinsRemaining / 60);
    const minsRemaining = Math.ceil(totalMinsRemaining - (hoursRemaining * 60));
    return `${hoursRemaining} hrs ${minsRemaining} mins`;
  };
  
  render() {
    return (<div className="App">
      <div className="Loading">
        <div>Total Articles: {this.state.articlesToLoad}</div>
        <div>Articles Loaded: {this.state.slugs.length}</div>
        <div>Articles Remaining: {this.state.slugs.length - this.state.readSlugs.length}</div>
        <div>Time Remaining: {this.getTimeRemaining()}</div>
        {this.state.isFetching && <CircularProgress />}
      </div>    
      <button onClick={() => localStorage.clear()}>Clear Local Storage</button> 
      <button onClick={() => this.getData()}>Refresh</button> 
      <ul className="Article-list">
      {this.state.data.map((item, index) => (
        <ArticleTile 
          key={item.slug} 
          index={index} 
          item={item} 
          handleListItemClick={this.handleListItemClick.bind(this, item)} 
          read={this.state.readSlugs.includes(item.slug)} 
        />
      ), this)}
      </ul>
    </div>);
  }
}

export default App;
