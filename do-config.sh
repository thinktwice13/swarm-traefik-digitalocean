#!/bin/bash

APP_NAME=swarm-traefik-do

# Droplet name. Droplet number will be appended
DO_DROPLET_NAME=swarm-traefik-do 

#check available size with 'doctl compute size list`. See options here: https://slugs.do-api.dev
DO_SIZE=s-1vcpu-1gb 

# Image to use. Default ubunutu 18.04 with docker
DO_IMAGE_NAME=docker-20-04 

# Derver region. See options here https://docs.digitalocean.com/products/platform/availability-matrix/
DO_REGION=fra1 

# Optional tags. The 'manager' tag will be added automatically to the first node
DO_TAGS= 

# Number of nodes to create. First node will be the manager
DO_DROPLETS_COUNT=1
