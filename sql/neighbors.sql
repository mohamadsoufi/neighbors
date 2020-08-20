DROP TABLE IF EXISTS users;

CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    first VARCHAR(255) NOT NULL CHECK (first != ''),
    last VARCHAR(255) NOT NULL CHECK (last != ''),
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    bio VARCHAR(500),
    profile_pic VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS offers;

CREATE TABLE offers( id SERIAL PRIMARY KEY,
sender_id INT REFERENCES users(id) NOT NULL,
request NUMERIC(7),
    date VARCHAR(255) NOT NULL,
    meal VARCHAR(255) NOT NULL,
    quantity NUMERIC(7) NOT NULL,
    halal VARCHAR(255),
    kosher VARCHAR(255),
    vegan VARCHAR(255),
    vegetarian VARCHAR(255),
    gluten_free VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);


DROP TABLE IF EXISTS requests;

CREATE TABLE requests( id SERIAL PRIMARY KEY,
sender_id INT REFERENCES users(id) NOT NULL,
    date VARCHAR(255) NOT NULL,
    quantity NUMERIC(7) NOT NULL,
    halal VARCHAR(255),
    kosher VARCHAR(255),
    vegan VARCHAR(255),
    vegetarian VARCHAR(255),
    gluten_free VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);