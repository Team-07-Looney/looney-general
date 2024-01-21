FROM node:18.9.0
RUN mkdir -p /usr/src/app

COPY ./backend/habits/code ./

RUN npm install

EXPOSE 3010

CMD ["npm", "start"]