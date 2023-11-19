<<<<<<< Updated upstream
FROM node:18-alpine
WORKDIR /app
=======
FROM node:latest
WORKDIR .
>>>>>>> Stashed changes
COPY . .
RUN npm i
RUN npm i -g serve
RUN npm run build
<<<<<<< Updated upstream
EXPOSE 3000
CMD ["serve", "-s", "build"]
=======
CMD ["serve", "-s", "build"]
>>>>>>> Stashed changes
