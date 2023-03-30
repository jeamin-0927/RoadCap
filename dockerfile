FROM node:18-alpine

COPY react ./react
COPY express ./express

WORKDIR /react

RUN yarn install && yarn build

WORKDIR /express
RUN yarn install

EXPOSE 3000

CMD ["yarn", "start"]