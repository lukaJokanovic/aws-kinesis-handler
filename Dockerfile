FROM node:18-alpine3.18 AS builder

# Set up directories
RUN mkdir -p /home/node/aws-kinesis-handler && chown -R node:node /home/node/aws-kinesis-handler
WORKDIR /home/node/aws-kinesis-handler

# # Copy dependencies
COPY --chown=node:node ./package.json ./yarn.lock ./

RUN yarn install --frozen-lockfile

USER node

# # Copy app
COPY --chown=node:node src/ /home/node/aws-kinesis-handler/src/
COPY --chown=node:node ./.prettierrc ./tsconfig.json ./.eslintrc.js ./.nycrc ./.mocharc.js /home/node/aws-kinesis-handler/

RUN yarn run build