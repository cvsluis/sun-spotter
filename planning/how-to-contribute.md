# Contributing to sun-spotter

Developer notes for how to contribute a full-stack feature to sun-spotter


## Table of Contents


- [Example](#stack-overview)
- [Queries](#queries)
- [Backend Routes](#backend-routes)
<!-- 
## Example

Suppose you want to implement a full stack feature. For example, you want to create a webpage at the route http://localhost:3000/users that displays all the website users. To implement this, you will need to interact with every element of the stack. You will
  1. Create a database query that will return all users
  2. Set up a backend api route http://localhost:8080/api/users to host the above information
  3. Create a front end route at http://localhost:3000/users using react-router that will host the page
  4. Create the Users.jsx file that contains the html the page will display
  5. Fetch the users data from the backend api route in the Users.jsx -->

## Queries
To access data from our database, we need to **query** it. All of the app's queries live in the backend/src/db/queries folder. You will put your query the 0X_entity.js file that is most relevant to your query; for example, if you are trying to find information about users, put your query in the .../queries/01_users.js file.

Each individual query takes the form of a function that returns a promise that resolves to the rows your query returns:

```js
// <add description of what you are querying>
const getYourData = (params) => {
  const query = `your query here`;

    // inject parameters safely using `$1, $2, ..`, [param1, param2, ...] method
    // if anyone know what this is called please tell me -Janay 
  return db.query(query, [params])
    .then(data => {
      return data.rows;
    });
};
```
And then is exported at the bottom of the file: 

```js
module.exports = { getYourData };
```
Here, **params** is any parameters that the query uses. You will replace **your query here** with a SQL query. For example, if you would like to get a user with a specific user id, you would do the following: 

```js
// Get user with specific id
const getUserByID = (userID) => {

  const query = `SELECT * FROM users WHERE users.id = $1`;

  return db.query(query, [userID])
    .then(data => {
      return data.rows;
    });
};

 /* ...other queries etc... */

module.exports = { getUserByID };
```
If I called the above query with userID = 2, it would return a promise resolving to:

![rows that the query returns](queryReturn.png)

If your query is particularily complicated, it can be helpful to access the psql database with the command "psql -U labber -d sunspotter" and try out your query there. 

## Backend Routes

For our frontend app to access any of our data that we are querying, we need to host it on our api server, http://localhost:8080/api. For each query we write (getData), we need to create an associated route (http://localhost:8080/api/data). 

Our route files live in the backend/src/routes folder; each is named someEntity.js, and contains all routes relating to said entity. For example, if I have a query returning info for a user with a specific id, I will create a route to http://localhost:8080/api/users/:id, and put it in the .../routes/users.js file.

Before writing your route, ensure that its corresponding query has been imported:

```js
const yourDataQueries = require('../db/queries/0X_entity.js');
```

Then each route will look something like: 

```js
// Get your data
router.get('/your-endpoint-here', (req, res) => {
  // call query
  yourDataQueries.getYourData()
    // send response with data
    .then(data => {
      res.json({ data });
    })
    //catch error if there is one
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});
```

This code ensures that every time someone does a get request to http://localhost:8080/api/your-endpoint-here, they get in response either:
  1. a JSON string containing the rows the getYourData query returns
  2. an error message detailing what went wrong

Some notes:
 -  you don't need to use the whole url (http://localhost:8080/api/your-endpoint-here), because the router has been set up so that it knows to add http://localhost:8080/api to the beginning of all your endpoints. 
 - this example is for a get request. Your code will change for other types (post, put delete), but it will remain in the same location.

If your endpoint is dynamic - for example 'entity/:some-param', you can use req.params.some_param to access the id. The route to get the endpoint '/users/:id' would look like

```js
const userQueries = require('../db/queries/01_users.js');

 /* other code/routes  etc here */

// Get specific user
router.get('/users/:id', (req, res) => {

  // access id param
  const userID = req.params.id;

  // call query
  userQueries.getUserByID(userID)
    // send response
    .then(data => {
      res.json({ data });
    })
    // send error if there is one
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});
```

## Frontend Routes

We are using **react-router** to handle our frontend routes, such as http://localhost:3000/home, http://localhost:3000/users/:id. React-router allows us to define every URL pattern the app will use, and what component will be rendered at each URL pattern (route). 

Our URL patterns are defined in the frontend/src/index.js file, where we have created a browser router: 

```js
  /* frontend/src/index.js*/

  // Setup router: this defines all the front end routes our app will use
  const router = createBrowserRouter([
    {
      // Root route: All of our pages are wrapped by the Root component, which contains the app navbar and footer
      path: '/',
      element: <Root />,
      // All non-root routes are children of the Root.
      children: [
        //define your route here
        {
          path: "/your-endpoint",        // defines the frontend endpoint
          element: <YourEndpointView />     // defines what React Component will be rendered at this endpoint
        },
        //handling a dynamic endpoint:
        {
          path: "/your-dynamic-endpoint/:some-parameter",        
          element: <YourEndpointView />     
        }
      ]
    }
  ]);
```

Once you have added your route, you can see it in your browser at http://localhost:3000/your-endpoint, and it will render the <YourEndpointView /> component.

## Frontend Views

Each frontend route renders a specific React component responsible for rendering the HTML body associated with that route.











 

