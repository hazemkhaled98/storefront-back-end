# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Create [token required] '/products' [POST] [Provide name and price in the request body]

- Index '/products' [GET]

- Show '/prdoucts/:id' [GET] [Provide porduct id in the url parameter]

- Update [token required] '/products' [PATCH] [Provide porduct id, name and price in the request body]

- Delete [token required] '/products/:id' [DELETE] [Provide porduct id in the url parameter]

#### Users
- Create [token required] '/users' [POST] [Provide firstName lastName and password in the request body]

- Index [token required] '/users' [GET]

- Show [token required] '/users/:id' [GET] [Provide user id in the url parameter]

- Update [token required] '/users' [PATCH] [Provide id, firstName, lastName and password in the request body]

- Delete [token required] '/users/:id' [DELETE] [Provide user id in the url parameter]

#### Orders
- Current Order by user (args: user id) [token required]  '/orders/active/:id' [GET] [Provide user id in the url parameter]

- Completed Orders by user (args: user id)[token required] '/orders/complete/:id' [GET] [Provide user id in the url parameter]

## Data Shapes
#### Product
-  id
- name
- price
- schema --> (id SERIAL PRIMARY KEY, name VARCHAR(100) NOT NULL, price INTEGER NOT NULL)

#### User
- id
- firstName
- lastName
- password
- schema --> (id SERIAL PRIMARY KEY, first_name VARCHAR(50) NOT NULL, last_name VARCHAR(50) NOT NULL, password CHAR(60) NOT NULL);

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)
- schema --> (id SERIAL PRIMARY KEY, status VARCHAR(10), user_id BIGINT REFERENCES users(id));
- schema (products_x_orders) --> (id SERIAL PRIMARY KEY, quantity INTEGER, product_id  bigint REFERENCES products(id), order_id bigint REFERENCES orders(id))

- You can check the ERD image in the project folder for clearer understanding of tables relations

