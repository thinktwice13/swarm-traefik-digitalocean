#!/bin/bash

# This script will create droplets on DigitalOcean using values in config.sh
# Requires doctl: https://docs.digitalocean.com/reference/doctl/how-to/install/
# Requires IDs of any of the ssh keys added to your DigitalOcean account as comma-separated argument. You can see all the added ssh keys with `doctl compute ssh-key ls`

# Check if SSH key provided
if [ $# -eq 0 ]; then
    echo "SSH key not provided"
    exit 1
fi 

DO_SSH_IDS=$1

# Check if doctl tool available
if ! type "doctl" > /dev/null; then
  echo "This script uses doctl CLI tool from DigitalOcean, but it was not found. Please install."
fi

# Read config
source ./do-config.sh

# Creates droplets
init_node () {
  NODE_NUMBER=$1
  IS_MANAGER="${2:-false}"
  TAGS=$DO_TAGS

  if [ $IS_MANAGER = true ]; then
    TAGS="manager,$TAGS"
  fi
  
  # Create droplet and return ID
  doctl compute droplet create $DO_DROPLET_NAME-$NODE_NUMBER --size $DO_SIZE --image $DO_IMAGE_NAME --region $DO_REGION --ssh-keys="$DO_SSH_IDS" --enable-monitoring --enable-private-networking --tag-names=$TAGS --wait --format "ID" --no-header
}

for (( i=2; i<=${DO_DROPLETS_COUNT}; i++ ));
  do
    init_node $i
done

# Create manager node
init_node 1 true

echo "Done."
exit 0
