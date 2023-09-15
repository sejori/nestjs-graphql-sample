# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN yarn

# Bundle app source code into the container
COPY . .

# Expose the port that the app will run on
EXPOSE 3000

# Define the command to run your application
CMD [ "yarn", "start" ]