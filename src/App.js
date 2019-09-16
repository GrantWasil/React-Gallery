import React, {Component} from "react";
import axios from "axios";
import {BrowserRouter, Route, Switch} from "react-router-dom";

// Components
import Search from "./Components/Search";
import Nav from "./Components/Nav";
import Photo from "./Components/Photo";
import PhotoList from "./Components/PhotoList";
import NotFound from "./Components/NotFound";

const API_KEY = process.env.REACT_APP_API_KEY;
console.log(API_KEY);
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      photos: [],
      query: "",
      loading: true
    };
  }

  componentDidMount() {
    this.performSearch();
  }

  performSearch = (query = "jungle") => {
    axios
      .get(
        `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&tags=${query}&sort=relevance&safe_search=2&per_page=24&format=json&nojsoncallback=1`
      )
      .then(response => {
        this.setState({
          photos: response.data.photos.photo,
          loading: false,
          query: query
        });
      })
      .catch(err => {
        console.error("Error fetching and parsind data", err);
      });
  };

  render() {
    console.log(this.state.photos);
    return (
      <BrowserRouter>
        <div className="container">
          <Route path="/:query" render={({match}) => {}} />
          <Search onSearch={this.performSearch} />
          <Nav />
          <PhotoList data={this.state.photos} query={this.state.query} />
        </div>
      </BrowserRouter>
    );
  }
}
