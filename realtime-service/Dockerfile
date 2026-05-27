FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=dev
COPY . .
EXPOSE 8117
CMD ["node", "index.js"]
