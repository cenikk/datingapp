# datingapp

## Description
We've build a dynamic prototype of a web application, in this case a dating app. You can do the following things in this app:

1. Register an account.
2. Login with an existing account.
3. If you login with the wrong credentials, it shows an error.
4. Being able to upload a profile picture.
5. Being able to search a movie through live filtering, and adding this movie to your account.
6. Being able to match up with people who like the same movies as you.

![dating-app](https://github.com/cenikk/project-tech/blob/master/assets/wireflow-mijngegevens.png)

## Installation

#### 1. Clone this repository
Type `git clone https://github.com/cenikk/datingapp.git` in your terminal.

#### 2. Install all dependencies
Make sure you're located into the right folder you can do this by running `cd datingapp` in your terminal.

Type `npm install` in your terminal

#### 3. Running the application
Type `npm run start` in your terminal.

#### 4. Viewing the website
Open your browser and type in:

`localhost:8000`

You can change the port on the third code line in the server.js file. When you change this port, make sure it matches with the port after localhost:

## Package usage
To see which packages we've used, open the package.json file and look under (dev)dependencies.

## Wiki 
To see our whole research as well as how we managed to work as a team, locate to our wiki in pageheader tab. 
> Note: Everything in our Wiki is written in Dutch.

## Sources
You can see a full list of the sources we've used in our [Wiki](https://github.com/cenikk/datingapp/wiki/5.0-Sources)

## MongoDB
Our database stores the users basic information and his/her favorite movies or series.
To get all the film information were using an Api which is: http://www.omdbapi.com/

Our database design(Api not included)
![Database](https://github.com/cenikk/datingapp/blob/develop/assets/database.png)