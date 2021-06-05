FROM node:14-alpine
LABEL maintainer "collelog <collelog.cavamin@gmail.com>"

WORKDIR /opt/53cal

COPY ./src /opt/53cal/
RUN npm install

RUN npm cache verify
RUN rm -rf /tmp/* /var/cache/apk/*

EXPOSE 8901
ENTRYPOINT ["node"]
CMD ["index.js"]
