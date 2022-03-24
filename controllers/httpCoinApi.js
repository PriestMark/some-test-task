const https = require("https");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

var options = {
  method: "GET",
  hostname: "rest.coinapi.io",
  path: "/v1/assets",
  headers: { "X-CoinAPI-Key": process.env.API_Key },
};

function getCurrs(callback) {
  getRequest = https.request(options, (res, error) => {
    let data = "";
    console.log(`statusCode: ${res.statusCode}`);
    res.on("data", (chunk) => {
      data += chunk;
    });
    res.on("aborted", function (thisError) {});
    res.on("end", () => {
      if (res.statusCode == 200) {
        result = JSON.parse(data);
        return callback(false, result);
      } else {
        error = res.statusMessage;
        return callback(error, null);
      }
    });
  });
  getRequest.end();
}
exports.getCurrentciesList = (req, res) => {
  getCurrs((err, data) => {
    if (err) return res.send(err);
    data = data.map(
      (curr) => (curr = { asset_id: curr.asset_id, name: curr.name })
    );
    res.status(200).json(data);
  });
};
