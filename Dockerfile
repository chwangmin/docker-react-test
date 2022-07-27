FROM node:alpine as builder

WORKDIR '/usr/src/app'

COPY package.json ./

RUN npm install

COPY ./ ./

# ENV CHOKIDAR_USEPOLLING=true

RUN npm run build

#nginx base image
FROM nginx
#포트 매핑 문제 nginx는 80번 포트에서 켜진다
EXPOSE 80

ARG NGINX_PROXY_VERSION
# Add DOCKER_GEN_VERSION environment variable
# Because some external projects rely on it
ARG DOCKER_GEN_VERSION
ENV NGINX_PROXY_VERSION=${NGINX_PROXY_VERSION} \
   DOCKER_GEN_VERSION=${DOCKER_GEN_VERSION} \
   DOCKER_HOST=http://ec2-13-124-176-240.ap-northeast-2.compute.amazonaws.com/api/

#builder stage에서 생성된 파일들은 /usr/src/app/build에 들어가는데 이 폴더를 nginx에 넣어준다.
#웹 브라우저에 http 요청이 올때 마다 nginx가 알맞게 표시해준다. 
COPY --from=builder /usr/src/app/build /usr/share/nginx/html