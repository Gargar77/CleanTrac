# CleanTrac

A janitorial management app that helps small to medium sized cleaning companies organize their accounts and facilitate communications between workers, all in a user-friendly web app.

# Description
  The main reason I decided to develop this app, was based on my previous expereince owning a small janitorial company with 10 employees. Even with such a small amount of employees, there were still difficulties when it came to communicating specific account changes or request to my team.

  This Project is structured using Rails as the backend API, and React-redux environment handling the frontend. Users are able to register for an account using their email/ address. This is received, verified, and saved by the backend. Once a user is registered, they are able to login to the account by providing their email and password. Once the backend reveives this request, it will verify if it exists, and if it does, it will send a JWT to the frontend. This token must be used for any consecutive request to the rails server, as this is proof that the current user has an active session. expired JWT tokens must re-login to receive a new token. 

### Dependencies

**Backend**
Ruby v2.5.3
Rails v5.2.0
Database: PostgresQL  v10.14

NOTE: see ``/Gemfile`` for a full list of backend dependencies
**Frontend**
create-react-app library ( this creates all the optimal boilerplate and folder structure for an optimal react application)

NOTE: see ``/client/package.json`` for a full list of front-end dependencies

### Installing

1. run ```bundle install``` on root folder (install rails dependencies)
2. ``cd client`` ( this is where the front end is being built)
3. ``npm install`` (install frontend dependencies)
4. ``rails start``

``rails start`` script will run a Procfile which will do the following:
1. start the Postgresql database ( if running on WSL)
2. start the react development server on port 3000
3. start the rails API server on port 3001

with these two servers up and running, you are able to edit either the backend or frontend and see the results in real time ( thanks to hotloading on both servers).
