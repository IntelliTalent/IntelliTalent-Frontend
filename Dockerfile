FROM node AS development
WORKDIR /app
COPY package*.json ./
RUN npm install --save --legacy-peer-deps
COPY . .

COPY ./public/ /public


RUN npm run build

FROM nginx:alpine AS Web
WORKDIR /usr/share/nginx/html

RUN rm -rf /etc/nginx/conf.d/default.conf

COPY ./nginx/nginx.conf /etc/nginx/conf.d

COPY --from=development /app/build .
EXPOSE 80
# run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
