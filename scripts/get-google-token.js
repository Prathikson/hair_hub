#!/usr/bin/env node
/**
 * Harry's Hair Hub — Google OAuth Token Helper
 * Run: node scripts/get-google-token.js
 * This will print the refresh token you need for .env.local
 */

const http = require("http");
const { URL } = require("url");

const CLIENT_ID     = process.env.GOOGLE_CLIENT_ID     || "";
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "";
const REDIRECT_URI  = "http://localhost:8080/callback";
const SCOPE = "https://www.googleapis.com/auth/calendar";

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error("❌  Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET first.");
  process.exit(1);
}

const authUrl =
  `https://accounts.google.com/o/oauth2/v2/auth` +
  `?client_id=${CLIENT_ID}` +
  `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
  `&response_type=code` +
  `&scope=${encodeURIComponent(SCOPE)}` +
  `&access_type=offline` +
  `&prompt=consent`;

console.log("\n📋  Open this URL in your browser:\n");
console.log(authUrl);
console.log("\n⏳  Waiting for callback on http://localhost:8080 ...\n");

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost:8080");
  const code = url.searchParams.get("code");
  if (!code) { res.end("No code"); return; }

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id:     CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri:  REDIRECT_URI,
      grant_type:    "authorization_code",
    }),
  });
  const tokens = await tokenRes.json();

  res.writeHead(200, { "Content-Type": "text/html" });
  res.end("<h2>✅ Success! Check your terminal.</h2>");
  server.close();

  console.log("✅  Add these to your .env.local:\n");
  console.log(`GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}`);
  console.log();
});

server.listen(8080);
