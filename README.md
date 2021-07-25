# Relationship-Builder

This app lets you find the relation or link between 2 people using the find relation function.

I have used the PERN stack for making the app.

# Setting up the app:

1) Firstly install all the dependencies using npm install or yarn install.
2) Setup the database as given in the database.sql file
3) Create a .env file and add the lines as given in the envexample file
4) Start the backend server using "npm start" or "node index"
5) CD into client folder and start the client development server using "npm start"

# Handling 1M requests with AWS

With AWS Lambda, you pay only for what you use. You are charged based on the number of requests for your functions and the duration, the time it takes for your code to execute.
The monthly request price is $0.20 per 1 million requests and the free tier provides 1M requests per month.

Total requests – Free tier request = Monthly billable requests

30M requests – 1M free tier requests = 29M Monthly billable requests

Monthly request charges = 29M * $0.2/M = $5.80
