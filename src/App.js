import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Movies from "./components/pages/movies";
import Navbar from "./components/navbar";
import Customers from "./components/pages/customers";
import Rentals from "./components/pages/rentals";
import NotFound from "./components/pages/NotFound";
import LoginForm from "./components/forms/loginForm";
import "./App.css";
import RegisterForm from "./components/forms/registerForm";
import MovieForm from "./components/forms/MovieForm";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <main className="container">
          <Switch>
            <Route path="/movies/:id" component={MovieForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/customers" component={Customers} />
            <Route path="/movies" component={Movies} />
            <Route path="/not-found" component={NotFound} />
            <Redirect exact from="/" to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
