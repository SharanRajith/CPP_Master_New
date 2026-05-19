# ── Stage: runtime ───────────────────────────────────────────────────────────
FROM node:20-slim

# Install g++ (the only system dependency needed by compile-server.js)
RUN apt-get update && apt-get install -y \
    g++ \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install only the server-side packages (express + cors live in devDependencies
# in the shared package.json, so we need a full install here)
COPY package.json package-lock.json* ./
RUN npm install --ignore-scripts

# Copy the compile server
COPY compile-server.js ./

EXPOSE 2000

CMD ["node", "compile-server.js"]
