import { isUniqueMahasiswa, writenim } from "./prismaDupeHandler";
const express = require("express");
// const prisma = require("prisma");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

const port = process.env.PORT || 3000;
let dataStore = [];
const apiLink = "/api";
app.use(express.json());

// app.post(apiLink, (req, res) => {
//   console.log(req.body);
//   res.json(req.body);
// });

app.post(apiLink, async (req, res) => {
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
      isUniqueMahasiswa(nim, nim, nama_mhs)
        .then((result) => {
          if (result) {
            const data = nim + Date.now() + nama_mhs;
            const qrcode = `http://api.qrserver.com/v1/create-qr-code/?data=${data}&size=1024x1024`;
            res.status(200).json({
              message: "succesful data POST",
              data: {
                body: req.body,
              },
              generateQr: qrcode,
            });
          } else {
            res.status(400).json({
              error: "data already exist",
            });
            console.log("data already exist");
          }
        })
        .catch((e) => {
          res.status(400).json({
            error: "data already exist",
          });
          console.log("data already exist");
        });
    } else {
      res.status(400).json({
        error: "key not present",
      });
      console.log(`failed to post`);
      // return;
    }
  } else {
    res.status(400).json({
      error: "object wrong type",
    });
    console.log(`failed to post`);
    // return;
  }

  console.log(`posted at ${apiLink}`);
});

app.get("/qrgenerate", (req, res) => {});

app.listen(port, () => {
  console.log(`Server runs at port ${port}`);
});
