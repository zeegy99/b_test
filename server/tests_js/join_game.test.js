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

test('player successfully joins empty room', (done) => {
    const client = ioClient(`http://localhost:${TEST_PORT}`);

    client.on("connect", () => {
        client.emit("join_game", { room: "test-room", playerName: "Zeg", playerId: "abc123" });
    });

    client.on("player_list", (players) => {
        expect(players.length).toBe(1);
        expect(players[0].playerId).toBe("abc123");
        expect(players[0].name).toBe("Zeg");

        client.disconnect();
        done();
    });
})
