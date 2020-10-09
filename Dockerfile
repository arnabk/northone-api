FROM keymetrics/pm2:latest-alpine

WORKDIR /root/build

COPY ./src /root/src
COPY package.json /root
COPY yarn.lock /root
COPY tsconfig.json /root
COPY pm2.yaml /root

RUN yarn && yarn build

CMD [ "pm2-runtime", "start", "pm2.yaml" ]
