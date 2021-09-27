# base image with dev deps
FROM node:current-alpine3.14 as base
LABEL org.opencontainers.image.authors=<AUTHOR_EMAIL>
LABEL org.opencontainers.image.title=stdo
LABEL org.opencontainers.image.created=$CREATED_DATE
LABEL org.opencontainers.image.revision=$SOURCE_COMMIT
LABEL org.opencontainers.image.url=thinktwice13/stdo-api:v1
LABEL org.opencontainers.image.source=https://github.com/thinktwice13/swarm-traefik-digitalocean/tree/main/api
LABEL org.opencontainers.image.licenses=MIT
ENV NODE_ENV=production
EXPOSE 4000
WORKDIR /app/api
COPY package*.json ./
RUN npm ci --only=production \
    && npm cache clean --force
ENV PATH /app/api/node_modules/.bin:$PATH

FROM base as dev
ENV NODE_ENV=development
ENV PATH=/app/api/node_modules/.bin:$PATH
RUN npm install --only=development
# No need to copy files here. Use volumes instead
CMD ["nodemon"]

# Example of how to run Jest in a docker container with --watch flag
# Not used in current setup. Check docker-compose.test.yaml for container config
FROM dev as test
ENV NODE_ENV=development
# This container needs Git to track changes in test files
ENV GIT_WORK_TREE=/app/api GIT_DIR=/app/.git NODE_ENV=test
RUN apk update && \
    apk add git
CMD ["/bin/sh", "-c", "jest --watch"]

FROM dev as ci
ENV NODE_ENV=test
COPY . .
# RUN eslint . 

FROM ci as build
# RUN jest unit -c jest.config.unit.js # Run in api-test github workflow instead
RUN npm run build
# Scan image for vulnerabilities (Disable for this demo)
# COPY --from=aquasec/trivy:latest /usr/local/bin/trivy /usr/local/bin/trivy
# RUN trivy filesystem --severity HIGH,CRITICAL --exit-code 1 --no-progress /

FROM base as prod
COPY --from=build /app/api/dist/ .
# Custom entrypoint expands Docker secrets into environment variables
COPY entrypoint.prod.sh /usr/local/bin/entrypoint.prod.sh
RUN chmod +x /usr/local/bin/entrypoint.prod.sh
ENTRYPOINT ["/usr/local/bin/entrypoint.prod.sh"]
CMD ["node","."]