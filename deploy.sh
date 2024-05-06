#!/bin/bash

start=$(date +"%s")

ssh -p ${SERVER_PORT} ${SERVER_USER}@${SERVER_HOST} -i key.txt -t -o StrictHostKeyChecking=no << 'ENDSSH'

sudo docker pull d8ml/forest_of_habits_front

cd docker/
sudo docker compose up -d

ENDSSH

end=$(date +"%s")

diff=$(($end - $start))

echo "Deployed in : ${diff}s"

if [ $? -eq 0 ]; then
  exit 0
else
  exit 1
fi

