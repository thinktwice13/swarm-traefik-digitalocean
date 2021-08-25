FROM node:16.7-alpine3.14
EXPOSE 3000
WORKDIR /app
COPY package*.json ./
RUN npm install
CMD ["npm","run","dev"]
