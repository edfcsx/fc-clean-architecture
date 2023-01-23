FROM node:18.12

RUN apt update
RUN npm install -g npm@latest
RUN apt-get install sqlite3 -y

USER node
COPY --chown=node:node . /home/node/app

WORKDIR /home/node/app
