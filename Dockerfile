#运行环境 需要config.json的挂在 由devenv-go驱动
FROM node:12.4.0 as source
LABEL maintainer=""
RUN mkdir -p /react-template
WORKDIR /react-template
COPY . .
RUN ls -al
RUN node -v
RUN npm config set registry https://registry.npm.taobao.org
# 安装插件
RUN npm install
# 执行测试用例
RUN npm run test
#编译
RUN npm run build

FROM alpine
RUN mkdir -p /vwood
WORKDIR /vwood
COPY --from=source /react-template/build /react-template/build

# 采用supervisor守护进程
# RUN apk add --no-cache supervisor
# RUN apk add supervisor
# RUN mkdir /etc/supervisor.d
# ENV CONF="[program:app-%s]\ncommand=npm run serve\nstdout_logfile=/var/log/app-%s.log\nstderr_logfile=/var/log/app-%s.log\nautorestart=true\nstartretries=100\ndirectory=%s\nstartsecs=20\n"
# RUN printf "$CONF" "serve" "serve" "serve" "/vwood"> /etc/supervisor.d/app-serve.ini && \
#     printf "[inet_http_server]\nport=*:3000" >> /etc/supervisord.conf

# ENTRYPOINT ["/usr/bin/supervisord", "-n","-c", "/etc/supervisord.conf"]