import { default as axios } from "axios";
import WebSocket from "ws";

const BASE_URL = "https://api.kucoin.com";
const PUBLIC_TOKEN = "/api/v1/bullet-public";

const subscribeConfig = {
  id: 1545910660739,
  type: "subscribe",
  topic: "/market/ticker:BTC-USDT",
  privateChannel: false,
  response: true,
};

const run = async () => {
  const {
    data: { data },
  } = await axios.post(`${BASE_URL}${PUBLIC_TOKEN}`);
  const {
    token,
    instanceServers: [{ endpoint }],
  } = data;

  console.log({ token, endpoint });

  const ws = new WebSocket(`${endpoint}?token=${token}`);

  ws.on("open", () => {
    console.log("OPEN");
    ws.send(JSON.stringify(subscribeConfig));
  });
  ws.on("close", () => console.log("CLOSE"));
  ws.on("error", (err) => console.log("ERROR: ", err));
  ws.on("message", (msg) => console.log("MESSAGE: ", msg.toString()));
};

run();
