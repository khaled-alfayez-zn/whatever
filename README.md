# First Project
## Using docker run a simple app (db, and backend)

This is the first project for me to learn how to use Docker. The idea of the app is to have a simple database, running on PostgreSQL with Docker, and have an API that retrieves data from this database, also running on Docker.
The backend could be programmed with whatever language I am most comfortable with.

## Plan
### Create the init db using a script
This is simply the first step of creating the database using a script. It should create the database, tables, attributes, and relations if any.
The data stored should be persistent, regardless of whether a container is running or not.

### Create the db docker file
The docker file should be able to start a container, create the db as specified in the init script, and then fill it with any data from previous runs.

### Create an app to access the data
The app should be able to connect to the bd, do CRUD operations on the db, and have these changes persist in the db after the db contianer is terminated or restarted.

### Create the app docker file
The app should be able to run in a container, and based on the lanaguge I pick, have an appropriate docker file.


## Step Two
Use multi-stage docker file to tunrun the app. Use volume to store db data.


## NOT UPDATED
## STEP ???
Set up argocd to keep your cluster settings up to date with the repo.

THIS REPO IS PURELY FOR ARGOCD STUFF!!!
Feeling cute, might delete later. (most likely, I'll forget)