
const express = require("express");
const pdfParse = require("pdf-parse");
var cors = require("cors");
const multer = require("multer");
const fs = require('fs');

const upload = multer({ dest: "uploads/" });

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/extract-text",  upload.single("files"), (req, res)=> {
    if(!req.file) {
        res.status(400);
    }

    fs.readFile(req.file.path, function(err, data) {
        pdfParse(data).then(function(data) {
            res.send(data.text)
        })
    });
});

app.listen(5000, () => {
    console.log("Server started on 5000");
});

