FROM node:latest

MAINTAINER Felipe Guerra de Oliveira

LABEL version="1.0.0"

RUN mkdir -p /apps/bin

WORKDIR /apps/bin

COPY . /apps/bin

COPY docker-entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

RUN npm install pm2 -g

RUN npm install

EXPOSE 3000

CMD ["pm2", "start", "index.js", "-i", "--no-daemon"]
