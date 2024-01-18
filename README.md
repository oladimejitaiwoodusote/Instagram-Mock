# Instagram-Mock

A fullstack instagram clone application built with react.js and flask

Deployed site: https://instagram-mock-one.vercel.app/

<img width="377" alt="Screen Shot 2023-12-09 at 4 57 21 PM" src="https://github.com/oladimejitaiwoodusote/Instagram-Mock/assets/79773788/ec66087a-28fe-4ca3-9deb-972a7a3f2b60">

## Technologies Used

### Front End Technologies

- React.js
- Material-UI
- React Icons

### Back End Technologies 

- Flask
- Flask-SQL Alchemy
- Flask-Migrate

### Database

- PostgreSQL
- ElephantSQL

### Cloud and Storage

- Google Cloud Storage

### Deployment

- Heroku: Hosting for Flask Backend
- Vercel: Hosting for React Frontend

## Features

### User Account and Profile Management

- Account Creation: Users can sign up to create personal accounts
<img width="404" alt="Screen Shot 2023-12-10 at 3 48 43 PM" src="https://github.com/oladimejitaiwoodusote/Instagram-Mock/assets/79773788/95bd3190-62d0-473f-94a9-83750c495d38">

- User Authentication
<img width="377" alt="Screen Shot 2023-12-09 at 4 57 21 PM" src="https://github.com/oladimejitaiwoodusote/Instagram-Mock/assets/79773788/ec66087a-28fe-4ca3-9deb-972a7a3f2b60">

- Profile Customization: Users can edit their profiles
<img width="582" alt="Screen Shot 2023-12-10 at 3 52 57 PM" src="https://github.com/oladimejitaiwoodusote/Instagram-Mock/assets/79773788/02006c87-575d-4c9d-8abb-180cc567526e">
<img width="547" alt="Screen Shot 2023-12-10 at 3 53 17 PM" src="https://github.com/oladimejitaiwoodusote/Instagram-Mock/assets/79773788/74eb23b2-4cca-4bbc-94ff-f34a7f502394">

### Social Interaction

- Following System: Users can follow and unfollow other users, creating a personalized network
- Post Interactions: Ability to like and comment on posts
- Discovery Page: Explore posts from users not currently followed
<img width="1237" alt="Screen Shot 2023-12-10 at 3 57 36 PM" src="https://github.com/oladimejitaiwoodusote/Instagram-Mock/assets/79773788/639eade6-932b-42a9-b2aa-8882ede7221d">
- User Search: Users can search for other profiles using search bar in the navbar

### Content Creation and Management

- Post Creation: Users can upload new posts
<img width="624" alt="Screen Shot 2023-12-10 at 4 08 29 PM" src="https://github.com/oladimejitaiwoodusote/Instagram-Mock/assets/79773788/20a31e17-6058-44a8-a1e2-2739127e75ff">
- Post Editing: Users can edit uploaded posts
- Posts Deleting: Users can delete uploaded posts

### User Feeds

- Main Feed: A customized feed displaying posts from followed users
<img width="1281" alt="Screen Shot 2023-12-10 at 4 13 12 PM" src="https://github.com/oladimejitaiwoodusote/Instagram-Mock/assets/79773788/324731df-88f7-465c-90ff-c835addbfa72">
- Profile Pages: Dedicated pages for each user, showcasing their individual posts and profile information
<img width="1271" alt="Screen Shot 2023-12-10 at 4 13 39 PM" src="https://github.com/oladimejitaiwoodusote/Instagram-Mock/assets/79773788/a8b2f078-29bb-424d-aec3-440b16f3621c">

## Installation and Setup

This project consists of two main parts: the backend (Flask app) and the frontend (React app). Follow the steps below to set up and run both parts of the application.

### Backend (Flask App)

- Clone the repo `git clone git@github.com:oladimejitaiwoodusote/Instagram-Mock.git`
- Navigate to the server directory `cd server`
- Create a virtual python environment `python -m venv myenv`
- Activate virtual environment `source myenv/bin/activate`
- Install required project dependencies  `pip install -r requirements.txt`
- Set up the flask database  `flask db init` `flask db migrate -m 'Initial migration'` `flask db upgrade`
- Run the flask app  `flask run`

### Frontend (React App)

- Open new terminal and navigate to the client directory `cd ..` `cd client`
- Install the necessary npm packages `npm install`
- Start the React development server `npm run`
