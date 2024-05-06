FROM node:18.14.0-alpine as build
WORKDIR /app
RUN yarn install
COPY package.json yarn.lock ./
COPY . .
RUN yarn build 
FROM nginx:1.25.2-alpine 
COPY --from=build /app/build /usr/share/nginx/html 
RUN rm /etc/nginx/conf.d/default.conf
COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80 
CMD ["nginx", "-g", "daemon off;"]