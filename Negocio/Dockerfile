FROM node:latest

MAINTAINER Felipe Guerra de Oliveira

LABEL version="1.0.0"

#RUN curl -Ov http://ubuntu.cs.utah.edu/ubuntu/pool/universe/r/rhc/rhc_1.30.3-1_all.deb
#RUN dpkg -i rhc_1.30.3-1_all.deb
#ADD rhc_1.30.3-1_all.deb /rhc_1.30.3-1_all.deb
#WORKDIR /

RUN mkdir -p /apps/bin

WORKDIR /apps/bin

COPY . /apps/bin

COPY docker-entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

RUN npm install pm2 -g

RUN npm install

EXPOSE 3000

CMD ["pm2", "start", "index.js", "-i", "--no-daemon"]
