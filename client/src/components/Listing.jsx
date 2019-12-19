import React, { Component } from "react";
import { Link } from "react-router-dom";
class Listing extends Component {
  render() {
    return (
      <div className="parentListingDiv">
        <div className="imgbox">
          <img src={this.props.listing.imageLink} alt="schoolimage" />
        </div>
        <div className="info">
          <h2>{this.props.listing.name}</h2>
          <div className="para">
            <p>{this.props.listing.about}</p>
          </div>
          <div className="foot">
            <Link to={"listing/" + this.props.listing._id}>View Listing</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Listing;
