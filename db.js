const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/neighbours"
);

module.exports.addUserInfo = (first, last, email, password) => {
    let q = ` INSERT INTO users (first, last, email, password)
            VALUES ($1,$2,$3,$4)
            RETURNING id`;
    let params = [first, last, email, password];
    return db.query(q, params);
};

module.exports.addUserPic = (url, id) => {
    let q = ` UPDATE users
            SET profile_pic = $1
            WHERE id = $2
            RETURNING profile_pic, id`;
    let params = [url, id];
    return db.query(q, params);
};

module.exports.updateBio = (bio, id) => {
    let q = ` UPDATE users
            SET bio = $1
            WHERE id = $2
            RETURNING bio, id`;
    let params = [bio, id];
    return db.query(q, params);
};

module.exports.getRecentUsers = () => {
    let q = "  SELECT * FROM users ORDER BY id DESC LIMIT 3";
    return db.query(q);
};

module.exports.getUser = (id) => {
    let q = `SELECT * FROM users
            WHERE id = $1`;
    let params = [id];
    return db.query(q, params);
};

module.exports.getUsers = (val) => {
    let q = `SELECT * FROM users WHERE first ILIKE $1`;
    let params = [val + "%"];
    return db.query(q, params);
};

module.exports.getUserInfo = (email) => {
    let q = `SELECT * FROM users
            WHERE email = $1`;
    let params = [email];
    return db.query(q, params);
};

module.exports.getUser = (id) => {
    let q = `SELECT * FROM users
            WHERE id = $1`;
    let params = [id];
    return db.query(q, params);
};

module.exports.getSearch = function (search) {
    return db.query(
        `SELECT * FROM items
            WHERE description
            ILIKE $1
            OR description
            ILIKE $2
            OR description
            ILIKE $3`,
        [search + "%", "%" + search, "%" + search + "%"]
    );
};

module.exports.updateOffer = (params) => {
    let q = ` INSERT INTO offers (sender_id, date, meal, quantity , halal, kosher, vegan, vegetarian, gluten_free)
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
            RETURNING *`;

    return db.query(q, params);
};

module.exports.getOffers = (params) => {
    let q = `SELECT * FROM offers
         WHERE sender_id = $1`;
    return db.query(q, params);
};

module.exports.updateRequest = (params) => {
    let q = ` INSERT INTO requests (sender_id, date, quantity , halal, kosher, vegan, vegetarian, gluten_free)
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
            RETURNING *`;

    return db.query(q, params);
};

module.exports.getRequests = (params) => {
    let q = `SELECT * FROM requests
         WHERE sender_id = $1`;
    return db.query(q, params);
};

module.exports.getUsersReqLocation = () => {
    let q = `SELECT * FROM requests
         ORDER BY created_at DESC`;
    return db.query(q);
};

module.exports.getUsersOfferLocation = () => {
    let q = `SELECT * FROM offers
         ORDER BY created_at DESC`;
    return db.query(q);
};
