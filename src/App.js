import React, {Component} from "react";
import axios from "axios";
import {BrowserRouter, Route, Redirect, Switch} from "react-router-dom";

// Components
import Search from "./Components/Search";
import Nav from "./Components/Nav";
import PhotoList from "./Components/PhotoList";
import Error404 from "./Components/Error404";

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
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/jungle" />} />
            <Route
              exact
              path="/:query"
              render={() => <Search onSearch={this.performSearch} />}
            />
            <Route component={Error404} />
          </Switch>
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
