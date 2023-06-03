## Author

Lino John

# Scraping App

This is a web application that scrapes a website and displays the scraped data in a sorted manner. The application is built using Node.js, Express.js, and Angular.

## Installation

Clone the repository.
Install dependencies by running npm install the root directory.

Run `npm install`

## Running unit test

Run `npm test` to execute the unit test via [Chai] will print the json result in the console.

Build the Angular app for production by running the following command in the project's root directory:

Run `ng build --configuration production`

Start the server by running the following command:

Run `node server/app.js`

Now, accessing `http://localhost:3000` will serve the Angular app, and the API request to /api/scrape will be handled by the server-side code. The Angular component will render the scraped data in the browser.

## Code Structure

The server code is located in the `server` directory

### app.js:

This file contains the main server code, including the routes and middleware.

The client code is located in the src directory and is split into several files:

### app.component.ts:

This file contains the main component code, including the code for retrieving the scraped data from the server.

### scraping.component.ts:

This file contains the code for displaying the scraped data in a table.

Test code located in the src directory `test` directory.

### test/server.test.ts :

This file contains the test code for the server test.

## Technologies Used

Node.js
Express.js
Angular
Axios
Cheerio

### testing dependencies

Mocha
Chai
Supertest

## License

This project is licensed under the MIT License. See the LICENSE file for more information.
