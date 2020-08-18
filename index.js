const express = require("express");
const app = express();
const compression = require("compression");
const db = require("./db");
const bodyParser = require("body-parser");
const ses = require("./ses.js");
const cryptoRandomString = require("crypto-random-string");
const secretCode = cryptoRandomString({
    length: 6,
});
const { s3Url } = require("./config.json");
const s3 = require("./s3");

const { sendEmail } = require("./ses");
// let csurf = require("csurf");

const { hash, compare } = require("./bc");

const cookieSession = require("cookie-session");

app.use(
    cookieSession({
        secret: `I'm always angry.`,
        maxAge: 1000 * 60 * 60 * 24 * 14,
    })
);

app.use(bodyParser.json());

app.use(express.static("public"));

// app.use(csurf());
// app.use(function (req, res, next) {
//     res.cookie("mytoken", req.csrfToken());
//     next();
// });

module.exports = { app };
// app.use(function (req, res, next) {
//     res.setHeader("x-frame-options", "deny");
//     res.locals.csrfToken = req.csrfToken();
//     next();
// });

app.use(compression());

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/",
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

///////////////// MULTER ///////////////
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
const { get } = require("http");
const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
});
////////////////////////

app.get("/welcome", (req, res) => {
    if (req.session.id) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.post("/register", (req, res) => {
    if (Object.keys(req.body).length !== 0) {
        let { first, last, email, pw } = req.body;
        console.log("password :", pw);
        hash(pw)
            .then((hashedPw) => {
                console.log("hashedPw :", hashedPw);
                db.addUserInfo(first, last, email, hashedPw)
                    .then((results) => {
                        console.log("results :", results);
                        let id = results.rows[0].id;
                        req.session.userId = id;
                        res.json({ success: true });
                    })
                    .catch((err) => {
                        console.log("err in POST /addUserInfo :", err);
                    });
            })
            .catch((err) => {
                console.log("error in POST register", err);
                res.json({ success: false });
            });
    } else {
        res.json({ success: false });
    }
});

app.post("/login", function (req, res) {
    let { email, pw } = req.body;
    db.getUserInfo(email)
        .then(({ rows }) => {
            let hashedPw = rows[0].password;
            let id = rows[0].id;

            compare(pw, hashedPw)
                .then((matchValue) => {
                    if (matchValue) {
                        // console.log("matchValue :", matchValue);
                        req.session.userId = id;
                        res.json({ success: true });
                    } else {
                        res.json({ success: false });
                    }
                })
                .catch((err) => {
                    console.log("error in compare in POST login:", err);
                });
        })
        .catch((err) => {
            console.log("err in get user info:", err);
            res.json({ success: false });
        });
});

app.get("/user", (req, res) => {
    db.getUser(req.session.userId).then(({ rows }) => {
        // let { first, last, bio, profile_pic, id } =;
        res.json(rows[0]);
    });
});

app.post("/update-bio", function (req, res) {
    db.updateBio(req.body.text, req.session.userId).then(({ rows }) => {
        let { bio, id } = rows[0];
        res.json({ bio, id, success: true });
    });
});

app.post("/update-img", uploader.single("file"), s3.upload, function (
    req,
    res
) {
    const { filename } = req.file;
    const url = s3Url + filename;
    db.addUserPic(url, req.session.userId).then(({ rows }) => {
        console.log("rows[0] :", rows[0]);
        res.json(rows[0].profile_pic);
    });
});

app.post("/update-offer", (req, res) => {
    let {
        date,
        meal,
        quantity,
        halal,
        kosher,
        vegan,
        vegetarian,
        glutenFree,
    } = req.body;
    console.log("glutenFree :", glutenFree);
    db.updateOffer([
        req.session.userId,
        date,
        meal,
        quantity,
        halal,
        kosher,
        vegan,
        vegetarian,
        glutenFree,
    ])
        .then(({ rows }) => {
            console.log("rows :", rows);
            res.json(rows);
        })
        .catch((err) => {
            console.log("err in update offer/POST :", err);
        });
});

app.get("/logout", function (req, res) {
    req.session.userId = null;
    res.redirect("/login");
});

app.get("*", function (req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome#/register");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.listen(8080, function () {
    console.log("I'm listening.");
});
