FROM node:8.11-alpine

EXPOSE 3000
WORKDIR /app

ADD package.json .
ADD yarn.lock .
ADD .postinstall.js .

RUN yarn install --production

ADD public/ ./public/
ADD main/ ./main/

CMD [ "yarn", "start" ]
