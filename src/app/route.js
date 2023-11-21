// import { isUniqueMahasiswa } from "../connection/prismaDupeHandler";
const prismaDupeHandler = require("../connection/prismaDupeHandler");
const express = require("express");
const route = express.Router();

const apiLink = "/api";

// route.use((req, res, next) => {
//   console.log(new Date());
//   next();
// });
route.use(express.json());
route.post(apiLink, (req, res) => {
  const expected = ["nim", "nama_mhs"];
  let nim = "";
  let nama_mhs = "";

  if (typeof req.body === "object" && req.body !== null) {
    const present = expected.every((key) => req.body.hasOwnProperty(key));

    if (present) {
      expected.forEach((key) => {
        switch (key) {
          case "nim":
            nim = req.body[key];
            console.log(nim);
            break;

          case "nama_mhs":
            nama_mhs = req.body[key];
            console.log(nama_mhs);
            break;
          default:
            break;
        }
      });
      prismaDupeHandler(nim, nim, nama_mhs)
        .then((result) => {
          if (result) {
            const data = nim + Date.now() + nama_mhs;
            const qrcode = `http://api.qrserver.com/v1/create-qr-code/?data=${data}&size=1024x1024`;
            res.status(200).send({
              message: "succesful data POST",
              data: {
                body: req.body,
              },
              generateQr: qrcode,
            });
          } else {
            res.status(400).send({
              error: "data already exist",
            });
            console.log("data already exist");
          }
        })
        .catch((e) => {
          res.status(400).send({
            error: "data already exist",
          });
          console.log("data already exist, error code: " + e);
        });
    } else {
      res.status(400).send({
        error: "key not present",
      });
      console.log(`failed to post`);
      return;
    }
  } else {
    res.status(400).send({
      error: "object wrong type",
    });
    console.log(`failed to post`);
    return;
  }

  console.log(`posted at ${apiLink}`);
});

route.get(apiLink, (req, res) => {
  res.send("hai");
});

module.exports = route;
