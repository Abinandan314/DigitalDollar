FROM node:17-alpine3.13

COPY package.json package-lock.json .

RUN npm install

COPY . .

RUN npm run build

CMD [ "executable" ]
