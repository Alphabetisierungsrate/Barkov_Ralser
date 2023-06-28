FROM node:18

# Create app directory
RUN mkdir -p /usr/src/app/monitor
WORKDIR /usr/src/app/monitor

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --omit=dev

# Bundle app source
COPY . .

EXPOSE 3006

#CMD ["node", "app.js"]
CMD ["npm", "start"]