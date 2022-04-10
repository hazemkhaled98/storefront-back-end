### StoreFront back-end project

- This project is part of Udacity full-stack nanodegree and represents a back-end for a storefront.

- You need to run this project a postgres database on your local host and start the connection based on the information based to the pool instance from node-postgres package and they need to be consistent with the information present in "database.json" for database migration.

- My ENV variables used to setup and start the project:

- PORT=3000

- NODE_ENV=dev
- POSTGRES_HOST=127.0.0.1
- POSTGRES_PORT=5432
- POSTGRES_DB=store_db_dev
- POSTGRES_DB_TEST=store_db_test
- POSTGRES_USER=store_admin
- POSTGRES_PASS=157842369

- BCRYPT_PEPPER=saulgoodman
- BCRYPT_SALT=10

- TOKEN_SECRET=mikasa

- Please note that the database runs on port 5432 but the application itself runs on port 3000

- To initialize run "npm --init" and then you can use a script using "npm run {test or start}" to test and start the project respectively.

