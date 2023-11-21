const express = require("express");
const app = express();
const route = require("./route");

const port = process.env.PORT || 3000;
// app.use(express);
app.use(route);

app.listen(port, () => {
  console.log(`Server runs at port ${port}`);
});

// app.post(port, (req, res) => {
//   console.log("berhasil post");
// });
