FROM node:18-alpine3.17

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

RUN yarn prisma generate
RUN yarn build

EXPOSE 3000
CMD yarn start
