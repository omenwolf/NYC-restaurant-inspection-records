![Screenshot of homepage](https://github.com/CodeWritingCow/NYC-restaurant-inspection-records/blob/master/Screenshot%20homepage.png)

# NYCFoodSafety.org
This repository contains the source for [NYCFoodSafety.org](http://nycfoodsafety.org), a Web application for finding New York City health violation citations for restaurants.

The application provides users with a search form for finding restaurants by name and borough. An advanced search form allows users to find restaurants by ZIP code and cuisine type.

The live application is hosted on Heroku. Its back end is a Node.js server that queries a dataset updated daily by the city Department of Health and Mental Hygiene. The server then returns its search results to the users.

## Requirements

#### External API Key

- This project makes use of Socrata Open Data API to access the city's dataset. To get an API key, visit: https://dev.socrata.com/docs/app-tokens.html
- A Socrata account is required to get an API key. To open an account, sign up: https://opendata.socrata.com/signup

#### Key Dependencies

- [Node.js](https://nodejs.org/en/) with [Express.js](https://expressjs.com/) web framework
- [HBS](https://github.com/pillarjs/hbs), an Express.js view engine for [Handlebars.js](https://handlebarsjs.com) templating engine
- [Materialize](https://materializecss.com/) front-end framework based on Material Design
- [Google Material Icons](https://fonts.googleapis.com/icon?family=Material+Icons) style sheet

## Author
**Gary Pang** - [codewritingcow.com](http://codewritingcow.com)

## References
- [New York City Restaurant Inspection Results](https://data.cityofnewyork.us/Health/DOHMH-New-York-City-Restaurant-Inspection-Results/43nn-pn8j) from the city Department of Health and Mental Hygiene (DOHMH)
- [Socrata Open Data API documentation](https://dev.socrata.com/)
