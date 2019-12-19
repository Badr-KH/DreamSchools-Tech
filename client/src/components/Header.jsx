import React, { Component } from "react";
import { Button } from "@material-ui/core";
class Header extends Component {
  render() {
    return (
      <div>
        <h1>Welcome to the School Directory</h1>
        <Button
          variant="outlined"
          color="primary"
          style={{ display: "block", margin: "10px auto" }}
          onClick={() => {
            this.props.history.push("/create");
          }}
        >
          Create a new Listing !
        </Button>
      </div>
    );
  }
}

export default Header;
