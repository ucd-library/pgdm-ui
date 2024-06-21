FROM node:20

RUN dpkg --add-architecture i386
RUN apt-get update && apt-get install -y wine wine32

RUN mkdir build
WORKDIR /build

COPY package.json .
RUN npm install

COPY app app
COPY build-resources build-resources
COPY bundle.js .
COPY index.html .
COPY main.js .

