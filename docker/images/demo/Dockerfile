FROM shiqiufang/n8n-dev:latest

# # Set a custom user to not have n8n run as root
USER root

WORKDIR /data/n8n
RUN git pull https://github.com/coolmay/n8n
RUN npm run build

WORKDIR /data

COPY docker-entrypoint.sh /docker-entrypoint.sh
#ENTRYPOINT ["tini", "--", "/docker-entrypoint.sh"]
ENTRYPOINT ["su-exec","node","n8n"]

EXPOSE 5678/tcp
