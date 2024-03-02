FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production && npm cache clean --force

COPY . .

RUN npm install prisma && npx prisma generate

EXPOSE 3969

CMD ["npm", "run", "start"]
