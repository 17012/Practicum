const express = require("express");
const cors = require("cors");
const app = express();
const EthereumWallet = require("node-ethereum-wallet");
let myWallet = new EthereumWallet();
myWallet.init();
app.use(cors());
app.use("/api", async (req, res, next) => {
  await myWallet.unlock("your-wallet-password");
  next();
});

app.get("/hasSeed", async (req, res) => {
  res.send(await myWallet.hasKeystore);
});

app.post("/wallet", async (req, res) => {
  if (await myWallet.hasKeystore) {
    res.status(201).send({
      msg: "Seed has been created already.",
    });
  } else {
    let seed = myWallet.generateSeed();
    require("child_process").exec(
      "python count-sw-display.py",
      async function (err, stdout, stderr) {
        console.log("pwd: stdout");
        if (stderr || err)
          return res.send({ msg: "failed on something." + stderr || err });
        await myWallet.createKeystore(stdout, seed);
        console.log(myWallet.isUnlocked);
        console.log(myWallet.addresses);
        res.send(myWallet.addresses);
      }
    );
  }
});

app.get("/api/addresses", (req, res) => {
  res.send(myWallet.addresses);
});

app.get("/api/balance", async (req, res) => {
  res.send(await myWallet.balance);
});

app.post(
  "/api/transferETH/:amountETH/from/:sender/to/:receiver",
  async (req, res) => {
    const { amountETH, sender, receiver } = req.params;
    let amount = parseFloat(amountETH.replaceAll("_", ".")) * 1e18; // in Wei (1*10^18 Wei = 1 Ether)
    console.log(myWallet.isUnlocked);
    console.log(sender, receiver, amount);
    try {
      let txid = await myWallet.sendToAddress(sender, receiver, amount);
      res.send({ tx: txid });
    } catch (e) {
      console.log("Could not send Ether. Reason: " + e.message);
    }
  }
);

app.get("/api/balance/:address", async (req, res) => {
  res.send({
    [req.params.address]: await myWallet.getBalance(req.params.address),
  });
});

app.post("/api/addresses", async (req, res) => {
  console.log(myWallet.isUnlocked);

  let address = await myWallet.getNewAddress();
  res.send(address);
});

app.listen(4000, () => console.log("It's work!"));
