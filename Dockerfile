FROM mcr.microsoft.com/playwright:v1.51.0-noble

COPY . .

RUN npm ci

ENTRYPOINT [ "npx", "playwright"]
