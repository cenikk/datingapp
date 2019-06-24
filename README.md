# Lovesome
![dating-app](https://github.com/cenikk/datingapp/blob/master/assets/lovesome.png)

[Link to website](https://lovesome-date.herokuapp.com)

## Description
We've build a dynamic prototype of a web application, in this case a dating app. You are  able to register a user and make sure they can upload a profile picture. After a user registers, a session is being made which stores some of the user's personal data. The user can now add movies that he likes to his profile page via a build-in IMDB API. You also have the option to log back out, which will destroy the session that was created. This way users won't have access to profile pages of other users whenever they're not logged into their account. At last, you also have the option to log back into your account with the username and password you used when registering. 

To summarize, you can:

1. Register an account.
2. Login with an existing account.
3. Try to login with the wrong credentials, it will show an error.
4. Upload a profile picture.
5. Search a movie through live filtering, and adding this movie to your account.
6. Match up with people who like the same movies as you.
7. Log out (this destroys the current session).

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
=======
# Datingapp
[Link to website](https://lovesome-date.herokuapp.com)

## Description
I've build a dynamic prototype of a web application, in this case a dating app. My focus was on being able to register a user and make sure they can upload a profile picture. After a user registers, a session is being made which stores some of the user's personal data. The user can now add movies that he likes to his profile page via a build-in IMDB API. You also have the option to log back out, which will destroy the session that was created. This way users won't have access to profile pages of other users whenever they're not logged into their account. At last, you also have the option to log back into your account with the username and password you used when registering. 

![dating-app](https://github.com/cenikk/datingapp/blob/master/assets/lovesome.png)

## How to install this repository
1. Open your Terminal
2. To install this repository, type in your terminal  
   ```
   $ git clone https://github.com/cenikk/datingapp.git
   ```  
3. To install the Node modules, type in your terminal  
   ```
   $ npm install
   ```
4. To run the application, type in your terminal  
   ```
   $ npm run start
   ```
5. To open the application in your browser, open your favorite browser and type:
   ```
   localhost:8000
   ```

## Package usage
To see which packages I've used, open the [package.json](https://github.com/cenikk/datingapp/blob/master/package.json) file and look under (dev)dependencies.

## Wiki 
To see my whole research as well as what my perfect coding setup is, locate to my wiki in pageheader tab. Or [click here](https://github.com/cenikk/datingapp/wiki/5.0-Sources).
> Note: Everything in my Wiki is written in Dutch.

## MongoDB
Our database stores the users basic information and his/her favorite movies or series.
To get all the film information were using an Api which is: http://www.omdbapi.com/

## Sources
You can see a full list of the sources we've used in our [Wiki](https://github.com/cenikk/datingapp/wiki/5.0-Sources)

Our database design(Api not included)
![Database](https://github.com/cenikk/datingapp/blob/develop/assets/database.png)

## License 
[MIT](https://github.com/cenikk/datingapp/blob/master/LICENSE)

## Keywords 
[Datingapp](https://lovesome-date.herokuapp.com/) - [NodeJS](https://nodejs.org/en/) - [Express](https://expressjs.com/) - [PUG](https://pugjs.org/api/getting-started.html) - [MongoDB](https://www.mongodb.com/) - [HTTP](https://tools.ietf.org/html/rfc2068) - [Project](https://github.com/cmda-bt/) - [CMDA](https://github.com/cmda) - [Backend](https://cmda-bt.github.io/be-course-18-19/docs/) - [Frontend](https://cmda-bt.github.io/fe-course-18-19/docs/) - [Tech](https://cmda-bt.github.io/pt-course-18-19/docs/)