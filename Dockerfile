FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 80

CMD ["npm", "run", "dev"]
