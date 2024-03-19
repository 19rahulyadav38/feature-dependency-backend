const featureController = {};
const fs = require("fs");
const Feature = require("../model/feature");
const Links = require("../model/links");
const path = require("path");
const updateData3File = require("../utils/updateFile");
const Mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

featureController.read = async (req, res) => {
  try {
    let getData = await updateData3File.updateData3FileValues();
    console.log("getData :", getData);
    await res.send(getData);
  } catch (err) {
    console.log("Error: ", err);
  }
};

featureController.links = async (req, res) => {
  try {
    await Links.find(function (err, foundLinks) {
      if (!err) {
        res.send(foundLinks);
      } else {
        console.log(err);
      }
    });
  } catch (err) {
    console.log("Error: ", err);
  }
};

featureController.showGraph = async (req, res) => {
  try {
    await Feature.find(function (err, foundFeatures) {
      if (!err) {
      } else {
        res.send(err);
      }
    });
  } catch (err) {
    console.log("Error: ", err);
  }
};

featureController.create = async (req, res) => {
  try {
    const id = await Feature.find({ disabled: { $ne: true } }).count();
    await Feature.create({
      name: req.body.name,
      group: req.body.group,
      class: req.body.class,
      id: id,
    });
    updateData3File.updateData3FileValues();
    return res.status(200).json({
      message: "Feature created successfully",
    });
  } catch (err) {
    console.log("error: ", err);
    return res.status(500).json({
      message: "Something went wrong!!",
    });
  }
};

featureController.addDependency = async (req, res) => {
  try {
    const baseFeature = await Feature.findById(req.body.f1);
    const secondFeature = await Feature.findById(req.body.f2);
    const newLinks = new Links({
      source: baseFeature.id,
      target: secondFeature.id,
      value: 1,
      type: "needs",
      sourceName: baseFeature.name,
      sourceId: baseFeature._id,
      targetName: secondFeature.name,
      targetId: secondFeature._id,
    });

    await newLinks
      .save()
      .then((response) => {
        res.status(200).json({ links: response });
      })
      .catch((error) => {
        res.status(500).json({ message: error });
      });

    updateData3File.updateData3FileValues();
  } catch (err) {
    console.log("error: ", err);
    return res.status(500).json({
      message: "Something went wrong!!",
    });
  }
};

featureController.updateFeature = async (req, res) => {
  try {
    const feature = {
      name: req.body.name,
      group: req.body.group,
      class: req.body.class,
    };
    const toBeUpdated = req.body.id;
    await Feature.findByIdAndUpdate(toBeUpdated, feature)
      .then((response) => {
        res.status(200).json({ message: response });
      })
      .catch((error) => {
        res.status(500).json({ message: error });
      });
    updateData3File.updateData3FileValues();
  } catch (err) {
    console.log("error: ", err);
  }
};

featureController.deleteFeature = async (req, res) => {
  try {
    const requestedId = req.body.id;
    const objectType = Mongoose.Types.ObjectId(requestedId);
    const result = await Links.deleteMany({
      $or: [{ sourceId: objectType }, { targetId: objectType }],
    });
    console.log("Deletion result:", result);

    const toBeUpdated = req.body.id;
    const updatedFeature = await Feature.findByIdAndUpdate(
        toBeUpdated,
        { disabled: true },
        { new: true } // This option returns the updated document
    );

    if (updatedFeature) {
        await featureController.updateIndexing();
        await updateData3File.updateData3FileValues();
        res.status(200).json({ message: updatedFeature });
    } else {
        res.status(404).json({ message: "Feature not found" });
    }
  } catch (err) {
    console.log("error: ", err);
  }
};
featureController.updateIndexing = async () => {
  try {
    let allNodes = await Feature.find();
    let nodeLinks = await Links.find();
    nodes = allNodes.filter((obj) => obj.disabled !== true);
    let bulkOps = [];
    let map = {};
    let newId = 0;
    for (let index = 0; index < allNodes.length; index++) {
      if (allNodes[index].disabled != true) {
        map[index] = newId;
        allNodes[index].id = newId;
        newId += 1;
        bulkOps.push({
          updateOne: {
            filter: { _id: allNodes[index]._id },
            update: { $set: { id: allNodes[index].id } },
          },
        });
      }
    }
   
    const bulkLinksOps = nodeLinks.map((link) => {
      link.target = map[link.target];
      link.source = map[link.source];
      return {
        updateOne: {
          filter: { _id: link._id },
          update: { $set: { target: link.target, source: link.source } },
        },
      };
    });
   
     // Perform bulk write for Feature
     await featureController.performBulkWrite(
        Feature,
        bulkOps,
        "Nodes updated successfully.",
        "No nodes to update."
    );

    // Perform bulk write for Links
    await featureController.performBulkWrite(
        Links,
        bulkLinksOps,
        "Links updated successfully.",
        "No Links to update."
    );
   
  } catch (error) {
    console.error("Error updating nodes:", error);
  }
};
featureController.loginFeature = async (req, res) => {
  try {
    const userID = process.env.USER_ID;
    const userPassword = process.env.USER_PASSWORD;

    const { user, password } = req.body;
    const isMatch = userID === user && userPassword === password;
    if (isMatch) {
      const token = jwt.sign(user, process.env.JWT_SECRET_KEY);
      res
        .status(200)
        .json({
          data: { tokenKey: token, userMail: user },
          message: "You have been logged in successfully",
        });
    } else {
      return res.status(400).json({ message: "Invalid user" });
    }
  } catch (error) {
    console.log("Error in login API: ", error);
  }
};

featureController.performBulkWrite = async (model, bulkOps, successMessage, noItemsMessage) => {
    if (bulkOps.length > 0) {
        await model.bulkWrite(bulkOps);
        console.log(successMessage);
    } else {
        console.log(noItemsMessage);
    }
}

module.exports = featureController;