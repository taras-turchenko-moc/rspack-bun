FROM oven/bun:1.1-slim

WORKDIR /myapp

COPY ./package.json ./bun.lockb ./
RUN bun install

COPY . .

EXPOSE 8080
CMD ["bun", "-b", "run", "build"]
