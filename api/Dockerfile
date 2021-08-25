FROM node:16.7-alpine3.14

WORKDIR /app
COPY package*.json .
RUN npm i
ENV PATH /app/api/node_modules/.bin:$PATH
CMD ["nodemon"]