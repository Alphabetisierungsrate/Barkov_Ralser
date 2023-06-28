FROM node:18

RUN mkdir -p /usr/src/app/client
WORKDIR /usr/src/app/client

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "node", "index.js" ]