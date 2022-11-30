# Db Trip Planner
## Table of contents
* [General info](#general-info)
* [Features](#features)
* [UI](#ui)
* [Technologies](#technologies)
* [Setup](#setup)
* [Use](#use)
* [Future Development](#future-development)
* [Deployed version](#deployed-version)

## General info
This project is a train routes search application, based on the open API from Deutsche Bahn (https://v5.db.transport.rest/).

## Features
* Autocomplete/ Typeahead functionality
* Mobile first UI
* Server and client error handling 

## UI
![App screenshot](./images/screenshot.png)

## Technologies
Project is created with:
* NextJS
* React Hooks
* React-Query
* Tailwindcss
* Playwright
* Jest
* React Testing Library
* Vercel

## Setup
To run this project, clone it and follow the instructions:
- Move to project's folder, install the dependencies and run the client
```
$ cd ../db-trip-planner
$ npm install
$ npm run dev
```

## Use
- Open localhost: `http://localhost:3000/`
- Type your desired origin station
- Type your desired destination station
- Click on the main button
- Notice the text of the main button changing depending on the status of the search
- The search results will appear under the form area
- Get additional details for your desired route by clicking on the Show details anchor

### Testing
* E2E testing (headless):
```
$ npm run test:e2e
```

* E2E testing (headed):
```
$ npm run test:e2e:headed
```

* Unit testing:
```
$ npm run test:unit
```

## Future Development
* Investigate caching using state libraries
* Split components to atoms
* Add additional unit tests
* Add additional e2e tests using Playwright

## Deployed version
The app is deployed on Vercel under the following link: 
https://db-trip-planner.vercel.app/
