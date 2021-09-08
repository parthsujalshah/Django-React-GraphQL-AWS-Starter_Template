FROM node:14.17.4-alpine
WORKDIR /react
COPY package.json .
RUN npm install
COPY . .
RUN npm run build