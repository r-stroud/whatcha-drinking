# Whatcha Drinking
![image](https://github.com/r-stroud/whatcha-drinking/assets/106875994/de208b19-f19d-458f-b177-db615fa8e577)
![image](https://github.com/r-stroud/whatcha-drinking/assets/106875994/0399b915-a010-468f-ab9b-631c3a9007ab)
![image](https://github.com/r-stroud/whatcha-drinking/assets/106875994/a6616d44-822c-41b2-8611-1cb958a192f4)
![image](https://github.com/r-stroud/whatcha-drinking/assets/106875994/c4e167e0-5fd5-4307-ae16-a0fd1fc3c1fd)





Whatcha Drinking is a CRUD web application to allow users to show off what new drink they have discovered and find new drinks through posts from other uses or by searching the available colleciton. Users can update and keep track of their current drink and how the number of times they have tried each drink, post about drinks they have tried, edit preferences to alter what drinks are displayed, preview other users profiles and send friend reqeusts, and more!

This project was created as a Final Capstone project while attending Nashville Software School's Full Stack Web Development Bootcamp. 

## Table of Contents
- Whatcha Drinking
  - Table of Contents
  - Project Description
  - Technologies Used
  - Project Goals
  - Challenges
  - Future Updates
  - How to Install and Run
  - Credits

## Project Description

I always love a good recommendation, especially when that recommendation is a drink recommendation! However, when recommendations are in abundance and life keeps you busy, it is very easy to lose track of what was recommended. This application is to make finding the perfect drink recommendation easy and fun. 

## Technologies Used

- .NET
- C#
- CSS
- React
- React-Router NPM
- SQL
- Victory NPM

## Project Goals

This capstone project focus was to include all of the skills I had learned over the front end and back end portions at NSS. I also wanted to implement firebase as I had yet to work that into a project myself and inlcude as much interactive features to keep the user engaged, such as the drag and drop features on the edit profile view.

## Project Challenges

There were several challenges that faced throughout the completion of this project. Implementing firebase authorization was a big accomplishment and I was really happy that I was able to pull that off. Another challenge was the drag and drop section. I had issues communication the correct target Id I wanted to update and required a bit of rework on both the front end and back end to get the issue resolved. Other key challenges worth mentioning are coding all the CSS without frameworks with the exception of an npm package for the graphs on the user profile view, validating if a user has registered with the app if clicking sign in with google and bringing them to the registration page if they are not, and the back end for the friend requests.

## Future Updates

I feel very happy with how this project turned out, but there is still a lot more I want to achieve with it!

Here a just a few of the features I would still like to implement:
- Comment section on posts
- Trending feature
- like / favorite buttons on posts and drinks
- rate drinks and show the signed in user vs total user ratings
- message between users
- drink queue for drinks user wants to try in the future
- recommendation button to recommend a specific drink to a specific user

## How to Install and Run

1. Git clone this repo to your local machine.
2. Open the project file whatcha-drinking.sln in Visual Studios
3. Find the DB_Creation.sql file in the Data folder and copy and paste that code into SQL Server Management Studio
4. Execute the pasted code in SQL
5. In your terminal within the project folder navigate to the whatcha-drinking-client folder
6. Open the project in Visual Studios Code
7. Create a new Firebase Web Project
8. Copy the firebaseConfig details from the Firebase Web Project creation and past into the ApiKeys.js file in Visual Studios Code
9. Back in Visual Studios, right click whatch-drinking in the Solution Explorer and select Manage User Secrets
10. Enter in the below connection string. Project ID will be found in the project settings of your newly created Firebase Web Project :
 ```{
  "ConnectionStrings": {
    "DefaultConnection": "server=localhost\\SQLExpress;database=WhatchaDrinking;integrated security=true;Trust Server Certificate=true"
  },
  "FirebaseProjectId": "Project ID"
}```
11. Back in your terminal, navigate to the whatcha-drinking-client folder and type npm start to run the app.
12. The project should be running in Visual Studios as well for it to fully funciton.


## Credits

A big thank you to everyone at NSS! You are the best!
