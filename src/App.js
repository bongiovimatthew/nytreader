import React from 'react';
import './App.css';
import NYTAPI from './services/nytquery';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    this.getData().then(data => {
      const simpleData = data.map((item, index) => ({
        key: `${index}`,
        url: `${item.url}`,
        published: `${item.published_date}`,
        title: `${item.title}`,
        byline: `${item.byline}`,
        subheadline: `${item.subheadline}`,
        item_type: `${item.item_type}`
      }));
  
      this.setState({data: simpleData});      
    });
  }

  async getData() {
    const results = await NYTAPI.getNytData();
    console.log(results);
    // abstract, url, title, subheadline, byline, item_type, section, subsection, published_date 
    return results;
  };

  handleListItemClick(event, index){
    console.log(`Clicked item: ${index}`);
  };
  
  render() {
    return (<div className="App">
      <header className="App-header">
      <ul className="Article-list">
      {this.state.data.map((item, index) => (
        <li className="Article-item" key={index}>
          <a className="Article-item" href={item.url}>{item.title}</a>
          {item.byline}
        </li>
      ))}
      </ul>
      </header>
    </div>);
  }
}

export default App;
