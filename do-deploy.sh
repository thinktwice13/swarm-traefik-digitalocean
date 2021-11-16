#!/bin/bash

source ./do-config.sh

MANAGER_PUBLIC_IP=`doctl compute droplet list | awk '/'"$DO_DROPLET_NAME-1"'/ { print $3 }'`

echo "Deploying stack $APP_NAME to $MANAGER_PUBLIC_IP"
docker build -t thinktwice13/stdo-webclient:v1 ./web && docker push thinktwice13/stdo-webclient:v1 && docker build -t thinktwice13/stdo-api:v1 ./api && docker push thinktwice13/stdo-api:v1
DOCKER_HOST=ssh://root@$MANAGER_PUBLIC_IP docker stack deploy $APP_NAME -c ./docker-compose.yaml -c docker-compose.prod.yaml

echo "Done."
exit 0

