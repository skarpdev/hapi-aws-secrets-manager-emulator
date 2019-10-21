FROM node:8.11-alpine

EXPOSE 3000
WORKDIR /app
ENV SECRETS_MANAGER_PRELOAD_DIRECTORY=/secrets

ADD package.json .
ADD yarn.lock .

RUN yarn install --production

ADD public/ ./public/
ADD main/ ./main/

CMD [ "yarn", "start" ]
