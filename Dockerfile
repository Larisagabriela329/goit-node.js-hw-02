# 1. Use official Node.js LTS image
FROM node:20

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy package.json and package-lock.json (for caching)
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy the rest of the app
COPY . .

# 6. Expose the port your app runs on
EXPOSE 4000

# 7. Define the default command
CMD ["npm", "start"]
