FROM node:18-alpine

WORKDIR /app
COPY ./package.json ./package.json
COPY ./yarn.lock ./
COPY . .
RUN yarn

EXPOSE 8000
CMD yarn run dev