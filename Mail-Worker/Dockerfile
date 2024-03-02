FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production && npm cache clean --force

COPY . .

EXPOSE 3970

CMD ["npm", "run", "start"]
