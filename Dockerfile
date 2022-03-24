FROM node:12-alpine
RUN apk add --no-cache python2 g++ make
WORKDIR /sometesttask
COPY . .
RUN yarn install --production
CMD ["node", "server.js"]
EXPOSE 8888