FROM node:22.20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* ./

RUN --mount=type=cache,target=/root/.npm npm ci

COPY . .

RUN npm run build


FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/nginx.conf

COPY --chown=nginx:nginx --from=builder /app/dist/*/browser /usr/share/nginx/html

USER nginx:nginx

EXPOSE 8080

RUN echo "Chatterup web will be running on http://localhost:8080"

ENTRYPOINT [ "nginx", "-c", "/etc/nginx/nginx.conf" ]
CMD ["-g", "daemon off;"]

