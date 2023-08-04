FROM node:16-alpine

WORKDIR /app

COPY ./package*.json .
COPY ./yarn.lock .

RUN yarn

COPY . .

EXPOSE 5000

EXPOSE 27017

CMD [ "yarn" ,"dev" ]



