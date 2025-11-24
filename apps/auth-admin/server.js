require("dotenv").config({ path: ".env.local" }); // 👈 حمل القيم من .env.local

const { createServer } = require("http");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const port = process.env.PORT || 4006;

app.prepare().then(() => {
  createServer((req, res) => handle(req, res)).listen(port, () => {
    console.log(`> Ready on http://localhost:${port}/auth-admin`);
  });
});
