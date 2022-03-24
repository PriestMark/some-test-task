var WebSocketClient = require("websocket").client;
const dotenv = require("dotenv");
const req = require("express/lib/request");
dotenv.config({ path: "./config.env" });
let msgOut;

function procWS(msgIn) {
  return new Promise((resolve, reject) => {
    var client = new WebSocketClient();
    client.connect("ws://ws-sandbox.coinapi.io/v1/");

    client.on("connectFailed", function (error) {
      console.log("Connect Error: " + error.toString());
    });

    client.on("connect", function (connection) {
      console.log("WebSocket Client Connected");
      //   resolve(client);
      connection.on("error", function (error) {
        console.log("Connection Error: " + error.toString());
        reject(error);
      });
      connection.on("close", function () {
        console.log("echo-protocol Connection Closed");
      });
      connection.on("message", function (message) {
        if (message.type === "utf8") {
          // console.log("Received: '" + message.utf8Data + "'");
          connection.close();
          msgOut = JSON.parse(message.utf8Data);
          resolve(msgOut);
        }
      });

      function sendReq() {
        if (connection.connected) {
          message = msgIn;
          connection.send(message);
        }
      }
      sendReq();
    });
  });
}
exports.getPrice = async (req, res, next) => {
  try {
    const assets = req.params.id.split("-");
    const msgIn = JSON.stringify({
      type: "hello",
      apikey: process.env.API_Key,
      heartbeat: false,
      subscribe_data_type: ["quote"],
      subscribe_filter_asset_id: assets,
    });
    await procWS(msgIn);
    res.status(200).json({
      Bid: msgOut.bid_price,
      Ask: msgOut.ask_price,
      At: msgOut.time_exchange,
    });
  } catch (err) {
    console.log(err.message);
  }
};
