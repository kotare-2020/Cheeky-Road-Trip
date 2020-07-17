# Cheeky Roadtrip Readme!

## Team Doc Below - MVP,  Team Stress Profiles, Roles e.t.c
https://docs.google.com/document/d/1G1vxb_tp2uqvVKinbZbWiEapFCZpSqPEerkcmeP-hlw/edit


## Setup

Run the following commands in your terminal:

```sh
npm install
```

When we have stretch:

```sh
npx knex migrate:latest
npx knex seed:run
```

make sure you have in your .env:

```sh
JWT_SECRET="<the special password we put in here ;)>"
```

To run in development: (make sure you have a .env file)
```sh
npm run dev
```

To run in production:
```sh
npm start
```



## Wireframes

##### Landing Page

<img src="readme-images/landing-page.jpg" width="500">


##### Inital Map Page / Roadtrip Page

<img src="readme-images/initial-map-page.jpg" width="500">

## New Tech

* Leaflet and React-Leaflet
Node modules used to set up the map interface and the markers using react components.

* Leaflet Routing Machine
Creates the route between our established waypoints.

* Position Stack API
Used to convert street addresses into GPS coordinates for our user start/end point input.

* Something to filter out markers that aren't close to our route
To be researched and implemented.

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
 
 


## Reducers

| name | purpose |
  | --- | --- |
  | auth | Store information regarding user logins, auth status and auth errors |
  | currentTrip | Store info about the users current road trip (waypoints, trip name) |
  
## Actions

currently some overlap in action/reducer as work on this develops, will reconvene and re-establish these.

| type | data | purpose |
  | --- | --- | --- |
  | ADD_WAYPOINT | coordinates | For adding waypoints to the map |
  | ADD_NEW_TRIP | coordinates/name | For establishing the details of the new trip |
  
  
## Useful boilerplate stuff that was removed

* FoundForm
* LostForm

#### App 
Renders Homepage - on button click renders Dashboard

#### Homepage 
Lets user enter a start point and an end point for roadtrip. 
On form submit *Homepage* renders *Dashboard* component

#### Dashboard

This component will display the map. With route overlaid. 
Dashboard will render these components:
* Map
* Directions - step by step instructions created by Leaflet
* Trip Info - Display start and end point + list of bathrooms near route

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


