#!/bin/sh
set -e
docker build -t web_app_online:latest .
# docker-compose -p web_app:latest build
echo "auto web app build completed"

docker ps -q --filter "name=web_app_online" | grep -q . && docker stop web_app_online
echo "web app is stopped"
docker run --name web_app_online -d --rm -p 1337:80 web_app_online:latest

# docker-compose down
# docker-compose up -d
echo "web app is started and now running"
