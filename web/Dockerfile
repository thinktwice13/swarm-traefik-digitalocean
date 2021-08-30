FROM node:16.7-alpine3.14
ENV NODE_ENV=development
EXPOSE 3000
WORKDIR /app
COPY package*.json ./
RUN npm install
CMD ["npm","run","dev"]
