const app = require('./app');
const PORT = process.env.PORT || 8080;

const startServer = (port) => {
  const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      startServer(8081);
    } else {
      console.error(err);
    }
  });
};

startServer(PORT);
