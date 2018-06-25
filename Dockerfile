FROM ubuntu:latest

MAINTAINER Mitsuhiko Kai

ENV LANG C.UTF-8
ENV WORKING_DIR /var/www/html

WORKDIR $WORKING_DIR

RUN apt-get update && \
    apt-get install -y sudo \
                       vim
RUN sudo apt-get -y install curl

# install node.js
RUN curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -
RUN sudo apt-get install -y nodejs

EXPOSE 1234