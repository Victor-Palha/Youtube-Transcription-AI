FROM node:20.16.0 AS build

WORKDIR /usr/src/app
COPY package*.json ./

ENV VITE_SERVER_HOST=ytai-server
RUN npm install

COPY . .

RUN npm run build

FROM node:20.16.0-alpine3.20

WORKDIR /usr/src/app
COPY --from=build /usr/src/app/package*.json ./
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules


EXPOSE 3001

CMD ["npm", "run", "preview"]