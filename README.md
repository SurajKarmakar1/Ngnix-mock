# Mini NGINX Server

A lightweight Node.js web server with built-in dashboard for monitoring requests and server statistics.

## 🚀 Features

- **Static File Serving**: Serves HTML, CSS, JS, images and other static files
- **API Endpoints**: Built-in REST API for server monitoring
- **Real-time Dashboard**: Interactive dashboard with charts and statistics
- **Request Logging**: Tracks all incoming requests with detailed logging
- **Security**: Prevents directory traversal attacks
- **Auto Index**: Automatically serves `index.html` for directories



## 🛠️ Installation

1. **Clone the repository**:
   bash:
   git clone <repository-url>
   cd mini-nginx

2. No dependencies required - Uses only built-in Node.js modules!

Start the server:

bash:
node server.js


The server will start on port 5000:

Server URL: http://localhost:5000
Dashboard: http://localhost:5000


📊 Dashboard Features
Real-time Statistics
Total requests counter
Server uptime tracking
Active routes monitoring
Popular routes ranking
Request visualization chart
