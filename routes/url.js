var express = require("express");
var router = express.Router();
const { mongoose, usersModel } = require("../dbSchemaUrl");
const { mongodb, dbName, dbUrl } = require("../dbConfig");
const { createToken, jwtDecode, validate, roleAdmin } = require("../auth");
const { time } = require('console')

mongoose.connect(dbUrl);

const date = new Date();
const currentMonth = date.getMonth() + 1; // 👈️ months are 0-based
console.log(currentMonth);

const monthHoldArray = [];
console.log(monthHoldArray, "*1");

let countArray = [];
const IncreCount = (end) => {
  if (end) {
    countArray.splice(0, countArray.length);
    console.log(countArray,  "*2");
  } else {
    countArray.push("1");
    console.log(countArray,  "*3");
  }
};

setInterval(IncreCount, 86400000, "0");

router.get("/getUrlData", async (req, res) => {
  let users = await usersModel.find();
  res.send({
    statusCode: 200,
    data: users,
  });
});

router.post("/signin-url", async (req, res) => {
   await usersModel.create({ full: req.body.full });

  IncreCount();

  monthHoldArray.push(currentMonth);
  const uniqueMonthHoldArray = [...new Set(monthHoldArray)];
  console.log(uniqueMonthHoldArray,  "*4");
  if (uniqueMonthHoldArray.length > 1) {
    var lastElement = monthHoldArray(monthHoldArray.length - 1);
    console.log(lastElement);
    monthHoldArray.splice(0, monthHoldArray.length);
    monthHoldArray.push(lastElement);
    console.log(monthHoldArray, "2");
  }

});

router.get("/getShrinkPerDay", async (req, res) => {
  res.send({
    statusCode: 200,
    dataDay: countArray.length,
  });
});

router.get("/getShrinkPerMonth", async (req, res) => {
  res.send({
    statusCode: 200,
    dataMonth: monthHoldArray.length,
  });
});

router.get("/:shortUrl", async (req, res, next) => {
  try {
    const { shortUrl } = req.params;
    console.log(shortUrl);
    let result = await usersModel.findOne({ short: shortUrl });
    console.log(result);
    console.log(result.full);
    result.clicks++;
    result.save();
    res.redirect(result.full);
    if (result == null) {
      return res.sendStatus(404);
    }
  } catch (error) {
    console.log(error);
  }
});











 

module.exports = router;
