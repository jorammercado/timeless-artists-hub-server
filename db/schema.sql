DROP DATABASE IF EXISTS artistes_dev;
CREATE DATABASE artistes_dev;

\c artistes_dev;

CREATE TABLE artistes (
 id SERIAL PRIMARY KEY,
 artiste_name VARCHAR(35) NOT NULL,
 birth_year INT DEFAULT 0,
 death_year INT DEFAULT 0,
 genre VARCHAR(50) DEFAULT 'genre unknown',
 nationality VARCHAR(35) DEFAULT 'nationality unknown',
 bio TEXT DEFAULT 'no bio provided',
 wikipedia_link TEXT DEFAULT 'https://en.wikipedia.org/',
 youtube_link TEXT DEFAULT 'https://www.youtube.com/embed/',
 is_favorite BOOLEAN DEFAULT false
);

CREATE TABLE artworks (
    id SERIAL PRIMARY KEY,
    artwork_name TEXT NOT NULL,
    artiste_name VARCHAR(35) NOT NULL,
    style VARCHAR(35) DEFAULT 'style unknown',
    date_created VARCHAR(15) DEFAULT 'date unknown',
    img_link TEXT DEFAULT 'image link unknown',
    is_favorite BOOLEAN DEFAULT false,
    artiste_id INTEGER REFERENCES artistes (id)
    ON DELETE CASCADE
);