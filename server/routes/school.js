const express = require("express");
const router = express.Router();
const upload = require("../middlewares/amazonUpload");
const School = require("../models/school");
const singleupload = upload.single("photo");

router.post("/", singleupload, (req, res) => {
  const { schoolname, location, admission, about } = req.body;
  if (req.file) {
    School.create({
      name: schoolname,
      location,
      admission,
      about,
      imageLink: req.file.location
    })
      .then(() => res.send({ result: "Success" }))
      .catch(err => res.send({ error: err.message }));
  } else {
    School.create({
      name: schoolname,
      location,
      admission,
      about
    })
      .then(() => res.send({ result: "Success" }))
      .catch(err => res.send({ error: err.message }));
  }
});

router.get("/", (req, res) => {
  School.find({}, (err, result) => {
    if (err) return res.send({ error: "Something wrong happened !" });
    res.send(result);
  });
});

router.get("/:id", (req, res) => {
  School.findOne({ _id: req.params.id }, (err, result) => {
    if (err) return res.send({ error: "Something weird happened !" });
    res.send(result);
  });
});

router.put("/", singleupload, (req, res) => {
  const { schoolname, location, admission, about, id } = req.body;
  if (req.file) {
    School.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          name: schoolname,
          location,
          admission,
          about,
          imageLink: req.file.location
        }
      }
    )
      .then(() => res.send({ result: "Success" }))
      .catch(err => res.send({ error: err.message }));
  } else {
    School.findByIdAndUpdate(
      {
        _id: id
      },
      {
        $set: {
          name: schoolname,
          location,
          admission,
          about
        }
      }
    )
      .then(() => res.send({ result: "Success" }))
      .catch(err => res.send({ error: err.message }));
  }
});
module.exports = router;
