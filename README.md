# BelBa2yLeban
ACML project 2019

Dependencies:

-	Axios: it is a Promise-based HTTP client for JavaScript. By using Axios it's easy to send asynchronous HTTP request to REST endpoints and perform CRUD operations. ... Make http requests from node.

-	Bycrpt: it is a secured way to store passwords in my database regardless of whatever language my app's backend is built in .


-	concurrently: it is used to run multiple commands concurrently (.i.e run backend and frontend together).

-	cors: it provides a  middleware that can be used to enable CORS(cross-domain requests) with various options.


-	Express: handles things like cookies, parsing the request body, forming the response and handling routes. It also is the part of the application that listens to a socket to handle incoming requests.

-	Express-promise-router: A simple wrapper for express router that allows middleware to return promises. This package makes it simpler to write route handlers for Express when dealing with promises by reducing duplicate code.


-	FireBase: access google cloud platforms resources as google signIn.

-	Joi: it is a validation library that allows you to build schemas to validate JavaScript objects. And what that generally means is that Joi provides methods to easily validate common data types, such as e-mail addresses and phone numbers.


-	jsonwebtoken: Used to generate tokens.

-	jwt-decode: used for authentication and authorization.	


-	Mongoose: it is an Object Data Modeling (ODM) library for MongoDB and Node.js . It manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB.

-	mongoose-auto-increment : Is a Mongoose plugin that auto-increments any ID field in a  schema .


-	Nodemailer: is a module for Node.js applications to allow easy sending of mails as notification when user signs up as an example.

-	Passport: is authentication middleware for node.js ,The same goes for passport-local,passport-jwt,passport-google-plus-token,passport-google-oauth20).


-	Node: allows us to write JavaScript code that runs directly in a computer process itself instead of in a browser.

-	Docker: is used as a container for the backend, it runs the backend using the command Docker-compose up –build.


Config folder : 

-	all other files in the config folder doesnot include any cofigurations specific to our website/ database, just pieces of code that is used by the rest of the project.

-	keys_dev : is a file that is included in the .gitignore file, since it includes mongoURI of our database --> module.exports = {  mongoURI: ‘ your mongodb database URI ‘  }




