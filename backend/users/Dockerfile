FROM node:18.9.0

WORKDIR /usr/src/app

COPY ./code/package*.json ./

RUN npm install

COPY ./code ./

EXPOSE 3012

CMD ["npm", "start"]
