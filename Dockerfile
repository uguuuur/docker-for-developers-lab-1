FROM node
WORKDIR .
COPY . .
RUN npm install
EXPOSE 3001
CMD ["npm", "run", "start"]