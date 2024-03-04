FROM node:21.5.0
WORKDIR .
COPY . .
RUN npm install
EXPOSE 3001
CMD ["npm", "run", "start"]
