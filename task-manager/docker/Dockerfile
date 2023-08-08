FROM node:19.6-alpine

WORKDIR /app

COPY . .

RUN npm i -g pnpm nest
RUN pnpm install
RUN pnpm build

EXPOSE 8443
EXPOSE 8080

CMD ["node", "dist/main"]
