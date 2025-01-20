# syntax=docker/dockerfile:1
FROM node:20

WORKDIR /app

RUN npm install -g npm@latest

# Add a script to be executed every time the container starts.
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000

CMD ["npm", "run", "dev"]