# Cheeky Roadtrip Readme!

## Team Doc Below - MVP,  Team Stress Profiles, Roles e.t.c
https://docs.google.com/document/d/1G1vxb_tp2uqvVKinbZbWiEapFCZpSqPEerkcmeP-hlw/edit


## Setup

Run the following commands in your terminal:

```sh
npm install
cp .env.example .env
```
Input API keys into .env

When we have stretch/use db:

```sh
npx knex migrate:latest
npx knex seed:run
```

To run in development: (make sure you have a .env file)
```sh
npm run dev
```

To run in production:
```sh
npm start
```

## User Stories
### MVP
* I want to be able to establish my road trip with a title, and start/end waypoints
* I want to see a map that shows me the route between my waypoints
* I want to see all the public bathrooms near my route
* I want to see direction instructions

### Stretch
* I want to log in
* I want to be able to leave ratings of bathrooms and see the average rating 
* I want to be able to see other neat stops besides public bathrooms (e.g. swimming spots, cafe's) 
* I want to be able to select these stops on the map to add them as waypoints
* I want to be able to save my road trip as a img or text file to refer to later

## Wireframes

##### Homepage

<img src="readme-images/update-landing-page.jpg" width="500">


##### Dashboard

<img src="readme-images/update-dashboard.jpg" width="500">

## New Tech

* Leaflet and React-Leaflet
Node modules used to set up the map interface and the markers using react components.

* Leaflet Routing Machine
Creates the route between our established waypoints.

* Position Stack API
Used to convert street addresses into GPS coordinates for our user start/end point input.

* Something to filter out markers that aren't close to our route
To be researched and implemented.

## Views
| name | purpose |
| --- | --- |
| Login | View for user to enter their login credentials | 
| Register | View for user to sign up for the App |
| Homepage | Establish details of trip |
| Dashboard | Shows the map, route, directions and relevant stops |


## Database

No database needed for barebones MVP, as bathroom data can be stored as simple GeoJSON. 
First step once MVP completed will be converting this into data tables.
Rough outline of projected database tables (Subject to change):

### Auth
| Column Name | Data Type | Purpose |
 | --- | --- | --- |
 | id | integer | Unique identifier for each user |
 | username | string | Used for login |
 | contact_details | string | displayed for contact information |
 | email_address | string | displayed for contact information |
 | hash | text | hashed login password |
 
 ### Bathrooms
 | Column Name | Data Type | Purpose |
 | --- | --- | --- |
 | id | integer | Unique identifier for each bathroom |
 | name | string | Name of bathroom |
 | latitude | decimal | GPS latitude of bathroom |
 | longitude | decimal | GPS longitude of bathroom |
 | rating | integer/decimal | rating out of 5 for this bathroom |
 | accessibility | boolean | whether the bathroom has disability access |
 
 


## Reducers

| name | purpose |
  | --- | --- |
  | auth | Store information regarding user logins, auth status and auth errors |
  | currentTrip | Store info about the users current road trip (waypoints, trip name) |
  
## Actions

currently some overlap in action/reducer as work on this develops, will reconvene and re-establish these.

| type | data | purpose |
  | --- | --- | --- |
  | ADD_TRIP | object | For saving the details of a trip (start/end points, name) |
  | ADD_INSTRUCTIONS | array of strings | For saving the directions of the trip |
  
## API (Client - Server)

| Method | Endpoint | Protected | Usage | Response |
| --- | --- | --- | --- | --- |
| Post | /api/auth/login | Yes | Log In a User | The Users JWT Token |
| Post | /api/auth/register | Yes | Register a User | The Users JWT Token |
| Get | /api/bathrooms | No | Get the list of bathrooms | Array of Objects (object = bathroom) |


## Heroku!!!

### Creating your app

Create your app with `heroku create [name]`

You can check that this was successful by running `heroku apps` to view a list of your apps


### Adding postgres

Add postgresql (hobby dev) to your app at `https://dashboard.heroku.com/apps/[APP NAME HERE]/resources`

Check that pg has been added by running `heroku addons` to ensure the postgresql db is on your app




### Deploying!

I have created several npm scripts that will be useful for deploying your app to heroku easily.

To push your local master branch to your heroku app:
```sh
npm run h:deploy
```

Run heroku migrations:
```sh
npm run h:migrate
```

Run heroku seeds:
```sh
npm run h:seed
```

If ever you need to rollback, you can also:
```sh
npm run h:rollback
```


### Ta-Da!
Your app should be deployed!


