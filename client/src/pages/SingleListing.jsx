import React, { Component } from "react";
import { Button, withStyles } from "@material-ui/core";
const styles = () => ({
  textFields: {
    marginBottom: "20px"
  },
  buttons: {
    display: "block",
    margin: "20px auto 20px"
  }
});
class SingleListing extends Component {
  constructor(props) {
    super(props);
    this.state = { listing: {} };
  }
  componentDidMount() {
    const param = this.props.match.params.id;
    if (param)
      fetch(`/school/${param}`)
        .then(res => res.json())
        .then(res => this.setState({ listing: res }));
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <div
          className="header"
          style={{
            backgroundImage: this.state.listing.imageLink
              ? `url("${this.state.listing.imageLink}")`
              : "none"
          }}
        ></div>
        <div className="longtexts">
          <h1>{this.state.listing.name}</h1>
          <h3>About our School !</h3>
          <p>{this.state.listing.about}</p>
          <h3>Location !</h3>
          <p>{this.state.listing.location}</p>
          <h3>Admissions !</h3>
          <p>{this.state.listing.admission}</p>
        </div>
        <Button
          variant="outlined"
          color="primary"
          className={classes.buttons}
          onClick={() =>
            this.props.history.push(`/update/${this.state.listing._id}`)
          }
        >
          Update Listing !
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(SingleListing);
