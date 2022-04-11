### StoreFront back-end project

- This project is part of Udacity full-stack nanodegree and represents a back-end for a storefront.

- You need to run this project a postgres database on your local host and start the connection based on the information based to the pool instance from node-postgres package and they need to be consistent with the information present in "database.json" for database migration.

# Create user:
- CREATE USER developer WITH PASSWORD '123123';

# Create databases:
- CREATE DATABASE store_db;
- CREATE DATABASE store_db_test;

# Grant privileges
- GRANT ALL PRIVILEGES ON DATABASE store_db TO developer;
- GRANT ALL PRIVILEGES ON DATABASE store_db_test TO developer;

- To initialize run "npm --init" and then you can use a script using "npm run {test or start}" to test and start the project respectively.


- ## API Endpoints
#### Products
- Create product -> [token required] '/products' [POST] [Provide name and price in the request body]

- Index -> '/products' [GET]

- Show product -> '/prdoucts/:id' [GET] [Provide porduct id in the url parameter]

- Update product -> [token required] '/products' [PATCH] [Provide porduct id, name and price in the request body]

- Delete product -> [token required] '/products/:id' [DELETE] [Provide porduct id in the url parameter]

#### Users
- Create User -> [token required] '/users' [POST] [Provide firstName lastName and password in the request body]

- Index ->[token required] '/users' [GET]

- Show User ->[token required] '/users/:id' [GET] [Provide user id in the url parameter]

- Update User -> [token required] '/users' [PATCH] [Provide id, firstName, lastName and password in the request body]

- Delete User -> [token required] '/users/:id' [DELETE] [Provide user id in the url parameter]

#### Orders
- [token required]  '/orders/active/:id' [GET] [Provide user id in the url parameter]

- [token required] '/orders/complete/:id' [GET] [Provide user id in the url parameter]
