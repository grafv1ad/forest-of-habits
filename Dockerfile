FROM node:18.14.0-alpine as build
WORKDIR /workspace/app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
CMD ["yarn", "start"]
