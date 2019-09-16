import React, {Component} from "react";
import axios from "axios";
import {BrowserRouter, Route, Redirect} from "react-router-dom";

// Components
import Search from "./Components/Search";
import Nav from "./Components/Nav";
import Photo from "./Components/Photo";
import PhotoList from "./Components/PhotoList";
import NotFound from "./Components/NotFound";

// Get working apiKey
import apiKey from "./config";

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
        `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&sort=relevance&safe_search=2&per_page=24&format=json&nojsoncallback=1`
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
          <Redirect to="/search/jungle" />
          <Route
            path="/search/:query"
            render={() => <Search onSearch={this.performSearch} />}
          />
          <Nav />
          {this.state.loading ? (
            <h2>Loading...</h2>
          ) : (
            <PhotoList data={this.state.photos} query={this.state.query} />
          )}
        </div>
      </BrowserRouter>
    );
  }
}
