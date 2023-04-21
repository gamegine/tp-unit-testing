FROM node:12
WORKDIR /home/node/app
COPY . /home/node/app
EXPOSE 8080
CMD npm run deploy