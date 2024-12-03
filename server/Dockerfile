FROM node:20.16.0 AS build

WORKDIR /usr/src/app

COPY package*.json ./
ENV HOSTNAME=ytai-server
RUN npm install

COPY . .

FROM node:20.16.0-alpine3.20

WORKDIR /usr/src/app
COPY --from=build /usr/src/app/package*.json ./
COPY --from=build /usr/src/app/src ./src
COPY --from=build /usr/src/app/node_modules ./node_modules

EXPOSE 4173

ENV HOSTNAME=ytai-server

CMD ["npm", "run", "start"]