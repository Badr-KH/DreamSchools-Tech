import React, { Component, Fragment } from "react";
import Listing from "../components/Listing";
import Header from "../components/Header";
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: []
    };
  }
  componentDidMount() {
    fetch("/school")
      .then(res => res.json())
      .then(res => this.setState({ listings: res }));
  }
  render() {
    return (
      <Fragment>
        <Header {...this.props} />
        {this.state.listings.map(listing => (
          <Listing listing={listing} key={listing._id} />
        ))}
      </Fragment>
    );
  }
}

export default Main;
