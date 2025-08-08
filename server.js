const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const port = 5000;
const publicDir = path.join(__dirname, "src"); // This should point to src folder

// Enhanced MIME types
const mimeTypes = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

// Server statistics
let serverStats = {
  startTime: Date.now(),
  requests: 0,
  routes: {},
};

// Simple logging
const logRequest = (method, route, statusCode) => {
  console.log(`${new Date().toISOString()} - ${method} ${route} ${statusCode}`);
  serverStats.requests++;
  serverStats.routes[route] = (serverStats.routes[route] || 0) + 1;
};

// API endpoints
const handleAPI = (req, res, pathname) => {
  if (pathname === "/api/stats") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        ...serverStats,
        uptime: Math.floor((Date.now() - serverStats.startTime) / 1000),
        mostVisited: Object.entries(serverStats.routes)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 5),
      })
    );
    logRequest(req.method, pathname, 200);
    return true;
  }

  if (pathname === "/api/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        status: "healthy",
        timestamp: new Date().toISOString(),
        uptime: Math.floor((Date.now() - serverStats.startTime) / 1000),
      })
    );
    logRequest(req.method, pathname, 200);
    return true;
  }

  return false;
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // Handle API routes first
  if (pathname.startsWith("/api/")) {
    if (handleAPI(req, res, pathname)) {
      return;
    }
  }

  // Handle static files
  let filePath = path.join(
    publicDir,
    pathname === "/" ? "index.html" : pathname
  );

  // Security check - prevent directory traversal
  if (!filePath.startsWith(publicDir)) {
    res.writeHead(403, { "Content-Type": "text/html" });
    res.end("<h1>403 Forbidden</h1>");
    logRequest(req.method, pathname, 403);
    return;
  }

  const extName = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[extName] || "application/octet-stream";

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        // Try index.html for directories
        if (extName === "" || extName === ".html") {
          const indexPath = path.join(filePath, "index.html");
          fs.readFile(indexPath, (err, content) => {
            if (err) {
              res.writeHead(404, { "Content-Type": "text/html" });
              res.end(`
                <!DOCTYPE html>
                <html>
                  <head>
                    <title>404 Not Found</title>
                    <link href="/output.css" rel="stylesheet">
                  </head>
                  <body class="bg-black text-white min-h-screen flex items-center justify-center">
                    <div class="text-center">
                      <h1 class="text-6xl font-bold text-gray-300 mb-4">404</h1>
                      <h2 class="text-2xl mb-4">Page Not Found</h2>
                      <p class="text-gray-400 mb-6">The requested URL was not found on this server.</p>
                      <a href="/" class="bg-white hover:bg-gray-200 text-black px-4 py-2 rounded-lg transition-colors">Go Home</a>
                    </div>
                  </body>
                </html>
              `);
              logRequest(req.method, pathname, 404);
            } else {
              res.writeHead(200, { "Content-Type": "text/html" });
              res.end(content, "utf-8");
              logRequest(req.method, pathname + "/index.html", 200);
            }
          });
        } else {
          res.writeHead(404, { "Content-Type": "text/html" });
          res.end("404: File Not Found");
          logRequest(req.method, pathname, 404);
        }
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
        logRequest(req.method, pathname, 500);
      }
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf-8");
      logRequest(req.method, pathname, 200);
    }
  });
});

server.listen(port, () => {
  console.log(`🚀 Mini NGINX Server running at http://localhost:${port}/`);
  console.log(`📊 Dashboard available at http://localhost:${port}/`);
});
