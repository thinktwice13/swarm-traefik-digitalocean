# Swarm Traefik DigitalOcean

> This repo is an example of using Docker Swarm with Traefik reverse proxy and automated deployment to DigitalOcean

## Uses

- Infrastructure:
  - [Docker compose](https://docs.docker.com/compose/) for local development
  - [Docker Swarm](https://docs.docker.com/engine/swarm/) with [Secrets](https://docs.docker.com/engine/swarm/secrets/) as production development
  - [Traefik](https://doc.traefik.io/traefik/) reverse proxy with _Let's Encrypt_ certificates and HTTPS in production
  - [Github Actions](https://docs.github.com/en/actions) testing and deployment worflows
  - [DigitalOcean](https://www.digitalocean.com) nodes creation and manual deployment scripts
- Services
  - Minimal Nodejs Express api service with session auth and VSCode debugger
  - Redis (here only as session store)
  - PostgreSQL database with custom initialization scripts and pgadmin
  - React with [Nextjs](https://nextjs.org) and TypeScript for the frontend. Uses [ChakraUI](https://chakra-ui.com)

## Run locally

**Requires** Docker

- Clone the repo
  ```
  git clone https://github.com/thinktwice13/swarm-traefik-digitalocean.git
  ```
- Install dependencies:
  ```
  cd api && npm i && cd ../web && npm i
  ```
- Run with docker compose from project root
  ```
  docker-compose up
  ```
- Open the app on `localhost`. Api available on `localhost/api`;
- Run api and webclient tests from `/`api`and`/web`subdirectories with`npm run test`. Will run Jest in --watch mode;

## Deploy

**Requires**:

- [Docker](https://docs.docker.com/engine/install/)
- [Doctl](https://docs.digitalocean.com/reference/doctl/)
- [SSH Keys added to DigitalOcean account](https://docs.digitalocean.com/products/droplets/how-to/add-ssh-keys/to-account/)

### Prepare droplets

- [Create the droplets maually](https://docs.digitalocean.com/products/droplets/how-to/create/) or edit `do-config.sh`and run `do-bootstrap.sh` script (Droplets will be created in the `Default` DigitalOcean project in DO console);
- Get manager droplet public IP in DO console or with:
  ```
  doctl compute droplet ls
  ```
- SSH into each droplet and adjust ports used by Docker:

  ```
    ssh root@$DROPLET_PUBLIC_IP

  # Docker now uses an additional port, 2377, for managing the Swarm. The port should be blocked from public access and only accessed by trusted users and nodes. We recommend using VPNs or private networks to secure access

  ufw allow 2376/tcp
  ufw allow 2377/tcp
  ufw allow 7946/tcp
  ufw allow 7946/udp
  ufw allow 4789/udp
  # sudo ufw allow 22/tcp # Rate limiting by default on port 22
  ufw reload
  ```

- Enable Docker on startup:
  ```
  sudo systemctl enable docker.service
  sudo systemctl enable containerd.service
  ```

### Initialize Docker Swarm

You can do this section by sshing into the droplet or creating a new [Docker Context](https://docs.docker.com/engine/context/working-with-contexts/) on your machine.

- Initilize Docker Swarm
  ```
  docker swarm init --advertise-addr $MANAGER_DROPLET_PRIVATE_IP
  ```
- Create the overlay network
  ```
  docker network create -d overlay web-public
  ```
- If you created more than one node, [join the worker nodes to the manager](https://docs.docker.com/engine/swarm/join-nodes/)
  ```
  TODO
  ```

### Initial deploy

Docker CLI looks for `DOCKER_HOST` variable. If not set, it uses `unix:///var/run/docker.sock`. For remote host set and unset `DOCKER_HOST` or use [Docker Context](https://docs.docker.com/engine/context/working-with-contexts/)

- Setup [Swarm Secrets](https://docs.docker.com/engine/swarm/secrets/) (Only `pg_password` and `cookie_secret` used in this example stack);
- For deployment, use `docker stack deploy $APP_NAME -c docker-compose.yaml` or use `do-deploy.sh` script;
- For single service updates, use `docker service update --force $SERVICE_NAME (or $SERVICE_ID)

### Github Deployment Workflow

- Set Github Secrets

  ```
  # Docker credentials to push updated images
  DOCKER_USERNAME
  DOCKER_PASSWORD

  # DigitalOcean manager droplet user and host (public ip or domain) for ssh
  DO_HOST
  DO_USER (Usually root)

  # SSH private key used for the ssh connection
  DO_SSH_PRIVATE
  ```

## NOTE: SSH errors

If you get **Permission denied (publickey)** error while trying to ssh into a node:

- Check the ssh key used to create the nodes. To use custom ssh key name on ssh root@$NODE_IP: `ssh -i $PATH_TO_KEY=~/.ssh/<KEY_NAME>`
- Or [try this solution from DigitalOcean.com](https://www.digitalocean.com/community/questions/error-permission-denied-publickey-when-i-try-to-ssh?answer=44730)
