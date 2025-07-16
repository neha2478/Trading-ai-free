# This is Docker file 

FROM node:18-alpine
WORKDIR /app

# install dependencies
COPY package*.json ./
RUN npm install

# copy source
COPY . .

# launch dev server
CMD ["npm", "run", "dev", "--", "--hostname", "0.0.0.0"]

