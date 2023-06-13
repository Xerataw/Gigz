FROM node:16

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

RUN yarn prisma generate
RUN yarn build

EXPOSE $PORT
CMD yarn start
