const app = require('./app');
const PORT = process.env.PORT || 5000;

const startServer = (port) => {
  const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(
        `Port ${port} is in use. Trying another port...`
      );
      startServer(port + 1);
    } else {
      console.error(err);
    }
  });
};

startServer(PORT);
