FROM node:20-alpine

WORKDIR /app

COPY ../package*.json ./

RUN npm install
RUN npm install -g nodemon 


COPY . .

EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=5s --retries=3 --start-period=10s \
  CMD wget -qO- http://localhost:5000/ || exit 1

CMD ["sh", "-c", "node backend/seeder.js && npm run server"]
