FROM node:16-alpine as development
ENV NODE_ENV=development

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install dependencies

COPY package.json .

RUN rm -rf node_modules
RUN npm cache clean --force

RUN npm install -g nodemon

RUN npm install

# Bundle app source
COPY . .

# Exports
EXPOSE 4000
CMD [ "npm", "run", "dev:nodemon" ]