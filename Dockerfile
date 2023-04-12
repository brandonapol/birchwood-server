# Set the base image to use for the container
FROM node:14-alpine

# Create a directory for our app in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies for our app
RUN npm install --production

# Copy the rest of our app's files to the container
COPY . .

# Expose the port that the app will listen on
EXPOSE 8000

# Set the command to start the app
CMD ["npm", "start"]