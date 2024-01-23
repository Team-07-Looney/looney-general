# Dockerfile for publishing to dockerhub

FROM node:18.9.0

WORKDIR /usr/src/app

COPY ./code/package*.json ./

RUN npm install

COPY ./code ./

EXPOSE 3014

CMD ["npm", "start"]