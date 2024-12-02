# ***Que sais tu ? (What do you know ?)***

## Description

As students of the great O'clock School of Computer Science, we have the honor at the end of the bootcamp to put into practice the knowledge we have been able to acquire throughout the semester. Our project consists of the development of a quiz website allowing users to test their general knowledge. The specifics of our application are described in the following chapters.

## App features

* Access to the list of quizzes,
* Answer the questions of the quizzes,
* Get my score at the end of each game,
* Create a user area,
* Access the history of my score(s) and played game(s),
* Create quizzes,
* Propose quizzes to put online,
* Access the ranking of the best players

## Used technologies

* PostgreSQL,
* NodeJs,
* ExpressJs
* Sequelize,
* SQL,
* Sqitch,
* Swagger


## Run app

Add .env file to ""/project-13-quizs-front" according to the /.env.example
  Back :
  - Create database "psql -U postgres" or with our username.
  - Update .env informations if needed to access to your database.
  - connect to the SQL file to your database : 'psql -U postgres -d work -f data/quiz_seeding.sql' (replace 'postgres' by your database username and 'work' by your database name if differen)
  - 'sqitch deploy'
  - 'npm run dev', from roots.
 
  Front : 
  'npm run build'
  'npm start index.js' from "/project-13-quizs-front".


## Supported browser

* Google Chrome
* Mozilla Firefox

## DevDependencies

* eslint,
* eslint-config-airbnb-base
* eslint-plugin-import
* nodemon

## Required installs and instructions

You can install the modules with "npm i -S

* dotenv
* express
* pg
* jsonwebtoken
* debug
* email-validator
* cors
* express-session
* swagger-jsdoc
* swagger-ui-express"

## Code tests

## How to use our code

## Contributing

1. Product owner : Ulas ONDER
2. Backend lead developer : Gérald VENTADOUR
3. Frontend lead developer : Léo DURILLON
4. Scrum master : Caline BRUNO
5. Technical&Git referent : Gérald VENTADOUR

## Sources acknowledgements

* Kourou.oclock.io
* Sqitch.org
* Eslint
* Atlassian.com
* gitignore.io

## Direction for future development

* Background music
* Register your started quiz to finish later
* Create avatar for profil picture
* Create quiz journey to gain point and update your avatar
* Searchbar to search for quizzes by keywords
* Darkmode
* Visually and hearing impaired accessibility
  
