CREATE DATABASE relationshipbuilder;

CREATE TABLE people(
    pid SERIAL PRIMARY KEY,
    name VARCHAR(50)
);

CREATE TABLE tags(
    tid SERIAL PRIMARY KEY,
    tag VARCHAR(50)
);

CREATE TABLE relations(
    rid SERIAL PRIMARY kEY,
    firstperson VARCHAR(50),
    secondperson VARCHAR(50),
    tag VARCHAR(50)
);