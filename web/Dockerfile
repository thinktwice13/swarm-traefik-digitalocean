# base image with dev deps
FROM node:16-alpine3.15 as base
LABEL org.opencontainers.image.authors=thinktwice13
LABEL org.opencontainers.image.title=stdo
LABEL org.opencontainers.image.created=$CREATED_DATE
LABEL org.opencontainers.image.revision=$SOURCE_COMMIT
LABEL org.opencontainers.image.url=thinktwice13/stdo-webclient:v1
LABEL org.opencontainers.image.source=https://github.com/thinktwice13/swarm-traefik-digitalocean/tree/main/api
LABEL org.opencontainers.image.licenses=MIT
ENV NODE_ENV=production
EXPOSE 3000
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production \
    && npm cache clean --force
ENV PATH /app/node_modules/.bin:$PATH

FROM base as dev
ENV NODE_ENV=development
RUN npm install --only=development
# No need to copy files here. Use volumes instead
CMD ["next","dev"]

FROM dev as ci
ENV NODE_ENV=test
COPY . .

FROM ci as build
# RUN jest # Run in web-test github workflow instead
RUN npm run build
# Scan image for vulnerabilities (Disable for this demo)
# COPY --from=aquasec/trivy:latest /usr/local/bin/trivy /usr/local/bin/trivy
# RUN trivy filesystem --severity HIGH,CRITICAL --exit-code 1 --no-progress /

FROM base as prod
COPY --from=build /app/.next/ ./.next/
CMD ["next","start"]