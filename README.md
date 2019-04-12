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

## Package usage
To see which packages I've used, open the [package.json](https://github.com/cenikk/datingapp/blob/master/package.json) file and look under (dev)dependencies.

## Wiki 
To see my whole research as well as what my perfect coding setup is, locate to my wiki in pageheader tab. Or [click here](https://github.com/cenikk/datingapp/wiki/5.0-Sources).
> Note: Everything in my Wiki is written in Dutch.

## MongoDB
Our database stores the users basic information and his/her favorite movies or series.
To get all the film information were using an Api which is: http://www.omdbapi.com/

Our database design(Api not included)
![Database](https://github.com/cenikk/datingapp/blob/develop/assets/database.png)

## Sources
You can see a full list of the sources I've used in my Wiki under [Page 5.0: Sources](https://github.com/cenikk/datingapp/wiki/5.0-Sources)

## License 
[MIT](https://opensource.org/licenses/MIT)

### Keywords 
[Datingapp](https://lovesome-date.herokuapp.com/) - [NodeJS](https://nodejs.org/en/) - [Express](https://expressjs.com/) - [PUG](https://pugjs.org/api/getting-started.html) - [MongoDB](https://www.mongodb.com/) - [HTTP](https://tools.ietf.org/html/rfc2068) - [Project](https://github.com/cmda-bt/) - [CMDA](https://github.com/cmda) - [Backend](https://cmda-bt.github.io/be-course-18-19/docs/) - [Frontend](https://cmda-bt.github.io/fe-course-18-19/docs/) - [Tech](https://cmda-bt.github.io/pt-course-18-19/docs/)