# Lost and Found

# Kokako 2018 Large Group Project

The focus of this app is to practice using the Full Stack we teach, (with auth) in a large scale app.

The idea of the app is to create a "billboard" style site for people to post about their animals that have gone missing, and for people who have found stray animals to post about them on another page.

The hope is that within a small community this could be a great go to for making sure those run-away cats make it home safely.

## User Stories

### MVP

As a non-registered user:
  * I want to register for the App under my name
  * I want to be able to browse all of the "Found" animals on the site.
  * I want to be able to sort the "Found" animals by species. (such as Cat / Dog)

As a registered user:
  * I want to be able to inform a user that their "Found" animal is mine, and provide them with contact information of my own, or to view their contact information.
  * I want to be able to post about a Lost animal that I have "Found"
  * I want to be able to post about an animal of my own that has been "Lost"

### Stretch

As an unregistered user:
  * I want to be able to see a list of all the Animals that have been "Found" after being posted as lost within the site, to give me hope <3

As a registered user:
  * I want to be able to remove a lost animal that I have posted, as it has been "Found"
  * I want to be able to edit a post I have made about a Lost animal of mine
  * I want to be able to edit a post I have made about a Found animal of mine

  ---
<!--
## Views (Client Side)
  | name | purpose |
  | --- | --- |
  | Login | View for user to enter their login credentials |
  | Register | View for user to sign up for the App |
  | CreateMeeting | View for user to arrange meeting attendees and information before starting the timer |
  | Meeting | View to display current meeting time, cost and other information while the meeting is in progress |
  | History | Display a list of past meetings the user has attended with select preview information |
  | PastMeeting | Display a single meeting from the history list, displaying more information and a list of attendees for the past meeting |


## Reducers (Client Side)

  | name | purpose |
  | --- | --- |
  | auth | Store information regarding user logins, auth status and auth errors |
  | currentMeeting | Track meeting progress such as current cost and current duration |
  | meetings | store the list of meetings the user has attended in the past |
  | users | store the list of users who can attend meetings |


## API (Client - Server)

| Method | Endpoint | Protected | Usage | Response |
| --- | --- | --- | --- | --- |
| Post | /api/auth/login | Yes | Log In a User | The Users JWT Token |
| Post | /api/auth/register | Yes | Register a User | The Users JWT Token |
| Get | /api/meetings | Yes | Get a Users Meeting Histroy | An Array of Meetings |
| Post | /api/meetings | Yes | Save a completed meeting | The Meeting that has been saved in db read format |
| Get | /api/meetings/:id/users | Yes | Get the attendees of a Meeting | An Array of User objects |
| Get | /api/users | Yes | Get the users of the app | An Array of User Objects |

## DB (Server Side)
  There should be three tables for MVP

### Users
  | Column Name | Data Type |
  | --- | --- |
  | id | Integer |
  | user_name | String |
  | first_name | String |
  | last_name | String |
  | hash | text |

### Meetings
  | Column Name | Data Type |
  | --- | --- |
  | id | Integer |
  | meeting_name | String |
  | time | Timestamp |
  | attendees | integer |
  | cost | Decimal |

### Attendees (Join Table M2M)

  Many Users attend Many Meetings

 | Column Name | Data Type |
 | --- | --- |
 | user_id | Integer |
 | meeting_id | Integer |

 ---
 -->

## Setup

Run the following commands in your terminal:

```sh
npm install (or yarn install)
knex migrate:latest
knex seed:run

```

  `npm run dev` || `yarn dev` for bundling, watch and nodemon

  `npm start` only runs server (setup for heroku)


## Heroku!!!

### Creating your app

Create your app with `heroku create [name]`

You can check that this was successful by running `heroku apps` to view a list of your apps


### Adding postgres

Add postgresql (hobby dev) to your app at `https://dashboard.heroku.com/apps/[APP NAME HERE]/resources`

Check that pg has been added by running `heroku addons` to ensure the postgresql db is on your app


### Deploying!

I have created several npm scripts that will be useful for deploying your app to heroku easily.

`npm run h:deploy` will push your local master branch to your heroku app

`npm run h:migrate` will run your knex migrations on your deployed heroku app

`npm run h:seed` will run your seeds on your deployed app

If ever you need to rollback, you can also just use `npm run h:rollback`


### Ta-Da!
Your app should be deployed!
