import React, { Component } from "react";
import { TextField, Button, withStyles } from "@material-ui/core";
const styles = () => ({
  textFields: {
    marginBottom: "20px"
  },
  buttons: {
    display: "block",
    margin: "0 auto 20px"
  }
});
class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      location: "",
      admission: "",
      photo: "",
      about: ""
    };
  }
  onImageChange(file) {
    if (file) {
      const image = new FileReader();
      image.onloadend = e => {
        document.getElementById("fileimage").src = e.target.result;
        this.setState({ photo: file.name });
      };
      image.readAsDataURL(file);
    }
  }
  formSubmit(e) {
    e.preventDefault();
    for (let val in this.state) {
      if (val !== "photo" && !this.state[val]) {
        alert("Please fill out all the fields");
        return false;
      }
    }
    const form = new FormData(e.target);
    fetch("/school", {
      method: "POST",
      body: form
    }).then(() => {
      this.setState({
        name: "",
        location: "",
        admission: "",
        photo: "",
        about: ""
      });
      this.props.history.push("/");
    });
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <h1>Please fill out the form below:</h1>
        <form
          method="post"
          encType="multipart/form-data"
          onSubmit={e => this.formSubmit(e)}
        >
          <TextField
            id="Name"
            label="School Name"
            variant="outlined"
            name="schoolname"
            fullWidth
            className={classes.textFields}
            required
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}
          />
          <TextField
            id="About"
            label="About"
            variant="outlined"
            multiline
            name="about"
            rows="3"
            className={classes.textFields}
            fullWidth
            required
            value={this.state.about}
            onChange={e => this.setState({ about: e.target.value })}
          />
          <TextField
            id="location"
            label="Location"
            variant="outlined"
            name="location"
            multiline
            rows="3"
            className={classes.textFields}
            fullWidth
            required
            value={this.state.location}
            onChange={e => this.setState({ location: e.target.value })}
          />
          <TextField
            id="Admission"
            label="Admission"
            variant="outlined"
            name="admission"
            multiline
            rows="3"
            className={classes.textFields}
            fullWidth
            required
            value={this.state.admission}
            onChange={e => this.setState({ admission: e.target.value })}
          />
          <input
            id="file"
            type="file"
            style={{ display: "none" }}
            component="span"
            accept="image/*"
            className={classes.input}
            name="photo"
            onChange={e => this.onImageChange(e.target.files[0])}
          />
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <label htmlFor="file">
              <Button variant="outlined" color="primary" component="span">
                Upload a New Image !
              </Button>
            </label>
          </div>
          <img
            src="https://dreamschoolstest.s3.ca-central-1.amazonaws.com/default.jpg"
            alt="schoolpic"
            style={{
              width: "50%",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: "20px"
            }}
            id="fileimage"
          />
          <Button
            variant="outlined"
            color="primary"
            className={classes.buttons}
            type="submit"
          >
            Create a new Ad!
          </Button>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(Create);
