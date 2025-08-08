
```
# Mini NGINX Server

A lightweight Node.js web server with built-in dashboard for monitoring requests and server statistics.

## 🚀 Features

- **Static File Serving**: Serves HTML, CSS, JS, images and other static files
- **API Endpoints**: Built-in REST API for server monitoring
- **Real-time Dashboard**: Interactive dashboard with charts and statistics
- **Request Logging**: Tracks all incoming requests with detailed logging
- **Security**: Prevents directory traversal attacks
- **Auto Index**: Automatically serves `index.html` for directories
)
```
📸 Demo:

https://github.com/SurajKarmakar1/Ngnix-mock/blob/main/src/%7BE62A39D0-35E2-4DF4-B939-D1F8FBF48505%7D.png
Dashboard showing real-time request statistics and server monitoring

## 🛠️ Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/SurajKarmakar1/Ngnix-mock/tree/main
 
   ```

2. **No dependencies required** - Uses only built-in Node.js modules!

## ▶️ Running the Server

Start the server:
```bash
node server.js
```

The server will start on port `5000`:
- **Server URL**: http://localhost:5000
- **Dashboard**: http://localhost:5000

## 📊 Dashboard Features

### Real-time Statistics
- Total requests counter
- Server uptime tracking
- Active routes monitoring
- Popular routes ranking
- Request visualization chart

### API Endpoints

#### `GET /api/stats`
Returns server statistics

#### `GET /api/health`
Returns server health status:


## 🎨 Dashboard Quick Actions

- **About Page**: View server information
- **Contact**: Contact page (customizable)
- **Health Check**: Test server status

## 🔒 Security Features

- **Directory Traversal Protection**: Prevents access to files outside the `src` directory
- **MIME Type Validation**: Proper content-type headers for all file types
- **404 Handling**: Custom 404 pages for missing files
- **Error Handling**: Graceful error responses

## 📝 Supported File Types

| Extension | MIME Type |
|-----------|-----------|
| .html | text/html |
| .css | text/css |
| .js | text/javascript |
| .json | application/json |
| .png | image/png |
| .jpg/.jpeg | image/jpeg |
| .gif | image/gif |
| .svg | image/svg+xml |
| .ico | image/x-icon |

## 🛑 Stopping the Server

Press `Ctrl + C` in the terminal to stop the server gracefully.

If the server doesn't stop properly:
```bash
# Windows
taskkill /PID <process-id> /F

# macOS/Linux
kill -9 <process-id>
```

## 🐛 Troubleshooting

### Port Already in Use
If you get an `EADDRINUSE` error:
1. Change the port in `server.js`:
   ```javascript
   const port = 5001; // or any available port
   ```
2. Or kill the existing process using port 5000

### Dashboard Charts Not Updating
- Ensure you're making actual requests to the server
- Charts show real data, not simulated data
- Check browser console for JavaScript errors

### 404 Errors
- Make sure files exist in the `src` directory
- Check file paths and extensions
- Verify directory structure

## 📈 Monitoring

The dashboard automatically updates every 2-3 seconds with real server statistics. Charts show actual request patterns over time.

