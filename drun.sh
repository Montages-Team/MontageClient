#!/bin/sh

docker run -it \
-p 8000:8000 \
-p 8080:8080 \
-v "$PWD/src":/var/www/html:Z \
--name $1 $2 \
/bin/bash
