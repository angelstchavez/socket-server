const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const SocketManager = require("./sockets");

class AppServer {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;
    this.httpServer = http.createServer(this.app);
    this.io = socketio(this.httpServer, {
      // Configuración adicional de Socket.IO si es necesaria
    });
  }

  initializeMiddlewares() {
    this.app.use(express.static(path.resolve(__dirname, "../public")));
  }

  configureSocketConnections() {
    new SocketManager(this.io);
  }

  startServer() {
    this.initializeMiddlewares();

    this.configureSocketConnections();

    // Iniciar el servidor HTTP
    this.httpServer.listen(this.port, () => {
      console.log(
        `Servidor ejecutándose en http://localhost:${this.port}. Socket.IO listo y esperando conexiones.`
      );
    });
  }
}

module.exports = AppServer;
