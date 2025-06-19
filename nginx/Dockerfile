# frontend layer
FROM node:lts-slim AS builder
WORKDIR /app
COPY ../frontend ./
RUN npm install
RUN npm run build

# nginx layer
FROM nginx:alpine

RUN apk add --no-cache gettext

COPY nginx/default.conf.template /etc/nginx/templates/default.conf.template
COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx/start.sh /start.sh
RUN chmod +x /start.sh

CMD ["/start.sh"]
