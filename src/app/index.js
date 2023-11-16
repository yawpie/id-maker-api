const express = require("express");
// const prisma = require("prisma");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

const port = process.env.PORT || 3000;
let dataStore = [];
const apiLink = "/api";
const getQr = "/api/qr";
app.use(express.json());

// app.post(apiLink, (req, res) => {
//   console.log(req.body);
//   res.json(req.body);
// });

app.post(apiLink, (req, res) => {
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
      res.status(200).json;
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

  writenim(nim, nama_mhs)
    .then(async () => {
      await prisma.$disconnect;
    })
    .catch(async (e) => {
      console.log(e);
      await prisma.$disconnect;
      process.exit(1);
    });
  console.log(`posted at ${apiLink}`);
  res.json({
    message: "succesful data POST",
    data: {
      body: req.body,
    },
  });
});

async function writenim(nim, nama_mhs) {
  const newMhs = await prisma.mahasiswa.create({
    data: {
      nim: nim,
      nama_mhs: nama_mhs,
    },
  });
  const mhs = await prisma.mahasiswa.findMany();
}

app.get(apiLink, (req, res) => {
  console.log(`posted at ${apiLink}`);
  let jsonRes = {
    nama: "",
  };
  res.json({ message: "succesful data GET", data: newData });
});

app.listen(port, () => {
  console.log(`Server runs at port ${port}`);
});
