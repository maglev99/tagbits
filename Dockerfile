# STAGE: 1
FROM node:16-alpine as build
COPY package.json /app-stage-1/
COPY /prisma/schema.prisma /app-stage-1/
WORKDIR /app-stage-1
RUN npm install && npm install --save-dev typescript @types/react @types/node 
COPY . /app-stage-1
RUN npm run build

# STAGE: 2
FROM node:16-alpine
WORKDIR /usr/app
COPY --from=build /app-stage-1/node_modules /usr/app/node_modules
COPY --from=build /app-stage-1/package.json /usr/app/package.json
COPY --from=build /app-stage-1/.next /usr/app/.next
ENV NODE_ENV production
CMD ["npm", "start"]