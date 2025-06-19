FROM node:lts-slim
WORKDIR /app
COPY . .
COPY package*.json ./
RUN npm i
CMD ["npm", "run", "start"]