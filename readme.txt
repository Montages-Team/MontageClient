docker build -t image名 ./
docker run -it -p 8080:8080 -v "$PWD/src":/var/www/html:Z --name コンテナ名 IMAGE名:1.0 /bin/bash

