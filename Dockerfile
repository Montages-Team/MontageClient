FROM ubuntu:latest

MAINTAINER Mitsuhiko Kai

ENV LANG C.UTF-8
ENV WORKING_DIR /var/www/html

WORKDIR $WORKING_DIR

RUN apt-get update && \
    apt-get install -y sudo \
                       vim \
                       gnupg
RUN sudo apt-get -y install curl
RUN apt-get update && apt-get install -my wget gnupg

# install node.js
RUN curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -
RUN sudo apt-get install -y nodejs

EXPOSE 1234
<<<<<<< HEAD
<<<<<<< HEAD
EXPOSE 8040
=======
>>>>>>> 862041386ff906532a20946af6cb57dd8914e434
=======
EXPOSE 8040
>>>>>>> staging
