const express = require("express");
let alert = require("alert");

const refUser = require("./user-controller.js"); //class path  where functions are defined

const objUser = new refUser(); //creating object of class

const mongoose = require("mongoose");

const passport = require("passport");
// require("../../config/passport.js");

const router = express.Router();

//show list the data of users already exists
router.get("/", async (req, res) => {
  try {
    let data = await objUser.listDetails();
    res.render("list.html", {
      list: data,
    });
  } catch (err) {
    console.log("error listing data ", err);
  }
});

const checkNotAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log("Already logged in");
    req.flash("error", "sorry already logged in");
    res.redirect("/dashboard");
  } else {
    return next();
  }
};

//route to open add user form
router.get("/add", checkNotAuthenticated, (req, res) => {
  res.render("addForm", {
    viewTitle: "ADD USER",
  });
});

//route to add user to database after pressing submit button
router.post("/add", async (req, res) => {
  try {
    delete req.body._id;
    let data = await objUser.insertDetails(req.body);

    console.log("inserted");

    res.redirect("/");
  } catch (err) {
    console.log("err", err);
    res.render("addForm", {
      viewTitle: "ADD USER",
      employees: req.body,
      error: err.error,
    });
  }
});

//route to prefill details of user in edit form to update
router.get("/edit/:id", async (req, res) => {
  try {
    let editUser = await objUser.editDetails(req.params.id);
    res.render("edit.html", {
      viewTitle: "UPDATE USER",

      employees: editUser,
    });
  } catch (err) {
    console.log("error while fetching data by  _id is  ", err);
  }
});

//post route for update
router.post("/edit", async (req, res) => {
  try {
    let data = await objUser.updateRecord(req.body);
    console.log("updated");
    res.redirect("/"); //after editing redirect to list page
  } catch (err) {
    console.log("err", err);
    res.render("edit", {
      viewTitle: "UPDATE USER",
      employees: req.body,
      error: err.error,
    });
  }
});

// route to delete existing user

router.get("/delete/:id", async (req, res) => {
  try {
    let deleteUser = await objUser.deleteUser(req.params.id);
    console.log("deleteUser is ", deleteUser);

    res.redirect("/");
  } catch (err) {
    console.log("error while deleting user ", err);
  }
});

//authorization
const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log("Already logged in");
    return next(); //if user already authetnicated then follow next statement
  } else {
    console.log("first logged in");
    req.flash("error", "sorry registered first");
    console.log("sorry registered first");
    res.redirect("/login");
  }
};

router.get("/login", checkNotAuthenticated, (req, res) => {
  res.render("login");

  router.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/dashboard",
      failureRedirect: "/",
      failureFlash: true,
    })
  );
});

router.get("/dashboard", checkAuthenticated, (req, res) => {
  // console.log("req.user",req.user);
  res.render("dashboard");
});

router.get("/logout", checkAuthenticated, (req, res) => {
  req.logout();
  req.flash("success", "successfully logout");
  console.log("success", "successfully logout");
  res.redirect("/login");
});
module.exports = router;
