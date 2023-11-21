// import { isUniqueMahasiswa } from "../connection/prismaDupeHandler";
const prismaQuery = require("../connection/queryHandler");
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
    if (expected.every((key) => req.body.hasOwnProperty(key))) {
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

      prismaQuery(nim, nama_mhs)
        .then(() => {
          const data =
            nim + Date.now() + nama_mhs.replace(" ", "").toLowerCase();
          const qrcode = `http://api.qrserver.com/v1/create-qr-code/?data=${data}&size=1024x1024`;
          res.status(200).send({
            message: "succesful data POST",
            data: {
              body: req.body,
            },
            generateQr: qrcode,
          });
        })
        .catch((error) => {
          res.status(400).send({ errorCode: error });
          console.log("nim already exist, error code: " + error);
        });
      console.log(`posted at ${apiLink}`);
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
});

route.get(apiLink, (req, res) => {
  res.send("hai");
});

module.exports = route;
