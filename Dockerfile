FROM ubuntu:latest

MAINTAINER mitsuhiko.kai@beproud.jp

ENV LANG C.UTF-8
ENV WORKING_DIR /var/www/html

WORKDIR $WORKING_DIR

RUN apt-get update && \
    apt-get install -y sudo \
                       vim
RUN sudo apt-get -y install curl
RUN apt-get update && apt-get install -my wget gnupg

# install node.js
RUN curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
RUN sudo apt-get install -y nodejs

# install vue, vue-cli
RUN npm install vue
RUN npm i -global @vue/cli

EXPOSE 8000
EXPOSE 8080
