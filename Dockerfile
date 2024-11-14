FROM oven/bun:1.1-slim

WORKDIR /myapp

COPY ./package.json ./bun.lockb ./
RUN bun install

COPY . .

CMD ["bun", "-b", "run", "build"]
