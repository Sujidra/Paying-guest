FROM node:14.5.0-alpine3.10 as builder

COPY package.json package-lock.json ./

RUN npm install --silent && mkdir /app && mv ./node_modules ./app

WORKDIR /app

COPY . .

RUN npm run build

FROM nginx:alpine

#!/bin/sh

# remove any existing data
RUN rm -rf /usr/share/nginx/html/*

# copy new build data to nginx to serve
COPY --from=builder /app/build /usr/share/nginx/html

#copy config to nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf


EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]