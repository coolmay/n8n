FROM shiqiufang/n8n-dev:latest

# # Set a custom user to not have n8n run as root
USER root

WORKDIR /data/n8n
RUN git pull https://github.com/coolmay/n8n --autostash -r
RUN npm run build



COPY docker-entrypoint.sh /docker-entrypoint.sh
#WORKDIR /data
#ENTRYPOINT ["tini", "--", "/docker-entrypoint.sh"]
ENTRYPOINT ["npm","run","start"]

EXPOSE 5678/tcp
