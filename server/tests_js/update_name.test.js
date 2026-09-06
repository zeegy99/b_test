const { app, server, io, startServer }= require("../server.js")
const ioClient = require("socket.io-client");
const TEST_PORT = 4001;

beforeAll((done) => {
  startServer(TEST_PORT);
  done();
});

afterAll((done) => {
  server.close(done);
});

test('person changes name', (done) => {
  const client = ioClient(`http://localhost:${TEST_PORT}`);
  client.on("connect", () => {
        client.emit("join_game", { room: "test-room", playerName: "Zeg", playerId: "abc123" });
    });

  
})