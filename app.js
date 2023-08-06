//get request içerisinde const blog = { id: 1, title: "Blog title", description: "Blog description" }, içeriğini gönderelim.

const express = require("express");
const app = express();

app.get("/", (req, res) => {
  const blog = {
    id: 1,
    title: "Busra'nın Sayfası",
    description: "Ben Busra. Bu benim blogum ve blogumda gunluk hayatimi paylasacagim",
  };
  res.send(blog);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda calisiyor.`);
});
