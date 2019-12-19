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
class Update extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      location: "",
      admission: "",
      photo: "",
      about: "",
      id: ""
    };
  }
  componentDidMount() {
    const param = this.props.match.params.id;
    if (param)
      fetch(`/school/${param}`)
        .then(res => res.json())
        .then(res =>
          this.setState({
            name: res.name,
            location: res.location,
            admission: res.admission,
            about: res.about,
            photo: res.imageLink,
            id: res._id
          })
        );
  }
  onImageChange(file) {
    if (file) {
      const image = new FileReader();
      image.onloadend = e => {
        this.setState({ photo: e.target.result });
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
    form.set("id", this.state.id);
    fetch("/school", {
      method: "PUT",
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
                Change the Image !
              </Button>
            </label>
          </div>
          <img
            src={this.state.photo}
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
            Update Listing !
          </Button>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(Update);
