FROM node:latest

MAINTAINER Felipe Guerra de Oliveira

LABEL version="1.0.0"

RUN mkdir -p /apps/bin

WORKDIR /apps/bin

COPY . /apps/bin

RUN npm install pm2 -g

RUN npm install

EXPOSE 3000

CMD ["pm2", "start", "index.js", "-i", "--no-daemon"]
