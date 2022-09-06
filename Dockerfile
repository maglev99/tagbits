FROM node:16-alpine

WORKDIR /app

COPY --chown=node:node . .

RUN npm ci

CMD [ "npm", "run", "dev" ]