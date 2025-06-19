#!/bin/sh
envsubst '${NGINX_PORT} ${API_PORT}' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf
exec nginx -g 'daemon off;'
