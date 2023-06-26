FROM node:17-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --omit=dev

COPY . ./

CMD [ "npm", "run" ]