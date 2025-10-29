# Timeless Artists Hub Server

## Project Overview

This repository contains the backend server for the **Timeless Artists Hub** project. It provides a RESTful API for managing a curated catalog of visual artists and their artworks using a relational PostgreSQL database. The server powers the frontend interface by handling requests, delivering filtered and paginated data, and managing database persistence.

Artworks are linked to artists through a one-to-many foreign key relationship, and the system uses cascading deletes to ensure clean data handling. The server also comes with setup and seeding scripts for fast deployment and development.

## Tech Stack

* **Runtime**: Node.js
* **Framework**: Express
* **Database**: PostgreSQL
* **Deployment**: Render

## Features

* **RESTful Routing**: Consistent endpoints for managing artists and artworks.
* **Full CRUD Support**: Create, read, update, and delete operations for both resource types.
* **Relational Data Model**: PostgreSQL schema enforces one-to-many relationship via foreign keys.
* **Cascading Deletes**: When an artist is deleted, all their artworks are automatically removed.
* **Pre-Seeded Data**: Database comes preloaded with a curated list of artists and their artwork metadata.
* **Setup Scripts**: Includes SQL scripts for schema creation and database seeding.

## Contents

* [Deployed Application](#deployed-application)
* [GitHub Repositories](#github-repositories)
* [Database Schema](#database-schema)
* [Installation and Setup](#installation-and-setup)
* [License](#license)
* [Contact](#contact)

## Deployed Application

* **Frontend**: [https://artistshub.netlify.app](https://artistshub.netlify.app)
* **Backend**: [https://timeless-artists-hub-server.onrender.com](https://timeless-artists-hub-server.onrender.com)

## GitHub Repositories

* [Frontend Repository](https://github.com/jorammercado/timeless-artists-hub)
* [Backend Repository](https://github.com/jorammercado/timeless-artists-hub-server)
* [SQL Seeder Utility](https://github.com/jorammercado/timeless-artists-hub-sql-seed)

## Database Schema

Two core tables are used:

* **artistes**: Stores artist data including name, nationality, birth/death years, genre, bios, and media links.
* **artworks**: Stores artwork data tied to artists, including style, title, image, and creation date.

```sql
CREATE TABLE artistes (
  id SERIAL PRIMARY KEY,
  artiste_name VARCHAR(35) NOT NULL,
  birth_year INT,
  death_year INT,
  genre VARCHAR(50),
  nationality VARCHAR(35),
  bio TEXT,
  wikipedia_link TEXT,
  youtube_link TEXT,
  is_favorite BOOLEAN
);

CREATE TABLE artworks (
  id SERIAL PRIMARY KEY,
  artwork_name TEXT NOT NULL,
  artiste_name VARCHAR(35) NOT NULL,
  style VARCHAR(35),
  date_created VARCHAR(15),
  img_link TEXT,
  is_favorite BOOLEAN,
  artiste_id INTEGER REFERENCES artistes (id) ON DELETE CASCADE
);
```

### Entity Relationship Diagram (ERD)

<p align="center">
  <img src="./erd.png" height="200px" alt="ERD">
</p>

* **One artist** can have **many artworks**
* Each **artwork** belongs to **one artist**

## Installation and Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/jorammercado/timeless-artists-hub-server.git
   cd timeless-artists-hub-server
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create a `.env` file:**

   ```env
   PORT=5001
   PG_HOST=localhost
   PG_PORT=5432
   PG_DATABASE=artistes_dev
   PG_USER=postgres
   ```

   > Ensure PostgreSQL is running and accessible with the provided credentials.

4. **Initialize and seed the database:**

   ```bash
   npm run dbinit
   npm run dbseed
   ```

5. **Start the development server:**

   ```bash
   npm start
   ```

## License

This project is licensed under the [MIT License](https://opensource.org/license/mit).

## Contact

For questions or feedback:

* **Joram Mercado**
  [GitHub](https://github.com/jorammercado) • [LinkedIn](https://www.linkedin.com/in/jorammercado)