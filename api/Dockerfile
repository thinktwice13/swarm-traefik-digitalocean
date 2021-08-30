FROM node:16.7-alpine3.14
ENV NODE_ENV=development
EXPOSE 4000
WORKDIR /app
COPY package*.json ./
RUN npm install
ENV PATH /app/api/node_modules/.bin:$PATH
CMD ["npm","run","dev"]
