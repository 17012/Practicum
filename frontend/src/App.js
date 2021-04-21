import React, { useEffect, useState } from "react";
import eth from "./assets/eth.png";
import bg from "./assets/bg.jpg";
import axios from "axios";
import "./App.css";
const api = "http://localhost:4000/";
function App() {
  const [addresses, setAddresses] = useState();
  const [balances, setBalances] = useState();
  const [balance, setBalance] = useState();
  const [hasSeed, setHasSeed] = useState();
  const [transferFrom, setTransferFrom] = useState();
  const [transferTo, setTransferTo] = useState();
  const [transferAmount, setTransferAmount] = useState();

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(api + `api/addresses`);
      const hasSeed = await axios.get(api + "hasSeed");
      setHasSeed(hasSeed.data);
      setAddresses(res.data);
      setTransferFrom(res.data[0]);
    };
    fetch();
  }, []);

  useEffect(() => {
    if (!addresses) return;
    const fetch = async () => {
      const res = await axios.get(api + `api/balance`);
      setBalance(res.data);
      const res2 = await Promise.all(
        addresses.map((address) => {
          return axios.get(api + `api/balance/` + address);
        })
      );
      let obj = {};
      res2.map((res) => {
        obj = { ...obj, ...res.data };
      });
      setBalances(obj);
    };

    fetch();
  }, [addresses]);

  const transfer = async () => {
    if (!transferFrom || !transferTo || !transferAmount) {
      return;
    }
    window.confirm(
      `Send ETH amount ${transferAmount} From ${transferFrom} To ${transferTo}. Do you confirm?`
    );
    console.log(transferFrom, transferTo, transferAmount);
    const tx = await axios.post(
      api +
        `api/transferETH/${transferAmount}/from/${transferFrom}/to/${transferTo}`
    );
    alert("Transaction Hash: " + tx.data.tx);
  };
  const genSeed = async () => {
    const { data } = await axios.post(api + "wallet");
    alert(data.msg);
  };

  return (
    <div
      class="min-h-screen bg-gray-100py-6 flex flex-col justify-center sm:py-12 bg-cover bg-center text-contessa-light "
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div class="relative py-3 mx-auto">
        <div
          class="relative py-10 shadow-lg sm:rounded-3xl sm:p-20 bg-clip-padding rounded-lg"
          style={{
            backdropFilter: "blur(20px)",
            backgroundColor: "rgba(0,0,0,0.3)",
          }}
        >
          <div class="mx-auto">
            <div class="flex items-center mb-5">
              <img src={eth} class="h-7 sm:h-8" />
              <span class="ml-5 text-2xl text-contessa-half">
                Rinkeby <span class="text-contessa-full"> Beta!</span>
              </span>
            </div>

            {hasSeed ? (
              <div>
                <div> Not Have Seed Setup Yet.</div>
                <button
                  class="mt-5 px-8 rounded-sm bg-contessa-crescent  text-white  p-2 uppercase"
                  onClick={() => genSeed()}
                >
                  {" "}
                  Generate Seed
                </button>
              </div>
            ) : (
              <div>
                <div class="flex flex-col">
                  {addresses &&
                    addresses.map((address) => (
                      <div
                        class="flex items-center text-contessa-light justify-between mb-5"
                        key={address}
                      >
                        <div
                          class="py-2 px-5 mr-5 text-contessa-light flex-grow"
                          style={{
                            backdropFilter: "blur(20px)",
                            backgroundColor: "rgba(0,0,0,0.6)",
                          }}
                        >
                          {address}
                        </div>
                        <div
                          class="py-2 rounded-md flex items-center w-64 justify-end px-4"
                          style={{
                            backdropFilter: "blur(20px)",
                            backgroundColor: "rgba(0,0,0,0.6)",
                          }}
                        >
                          {balances && balances[address] / 1e18}{" "}
                          <img src={eth} class="h-6 sm:h-5 ml-2" />
                        </div>
                      </div>
                    ))}
                  <div class="flex items-center text-contessa-light justify-between mb-5">
                    <div></div>
                    <div
                      class="py-2 rounded-md flex items-center w-64 justify-end px-4"
                      style={{
                        backdropFilter: "blur(20px)",
                        backgroundColor: "rgba(0,0,0,0.6)",
                      }}
                    >
                      {balance && balance / 1e18}{" "}
                      <img src={eth} class="h-6 sm:h-5 ml-2" />
                    </div>
                  </div>
                </div>
                {addresses && transferFrom && (
                  <div class="py-8 text-base leading-6 space-y-4 sm:text-lg sm:leading-7">
                    Transfer ETH
                    <div class="m-4 flex flex-col">
                      {/* <input
                        class="p-2 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white"
                        placeholder="transfer From"
                      /> */}
                      <select
                        class="text-contessa-light bg-black bg-opacity-50 p-4 mb-5"
                        value={transferFrom}
                        onChange={(e) => setTransferFrom(e.target.value)}
                      >
                        {addresses.map((address) => {
                          return (
                            <option
                              class="h-10 p-5"
                              value={address}
                              key={address}
                            >
                              {address}
                            </option>
                          );
                        })}
                      </select>

                      <input
                        class="text-contessa-light bg-black bg-opacity-50 p-4 mb-5"
                        placeholder="To"
                        onChange={(e) => {
                          setTransferTo(e.target.value);
                        }}
                      />

                      <input
                        class="text-contessa-light bg-black bg-opacity-50 p-4 mb-5"
                        placeholder="Amount"
                        onChange={(e) => {
                          setTransferAmount(e.target.value);
                        }}
                      />
                      <button
                        class="px-8 rounded-sm bg-contessa-crescent  text-white  p-2 uppercase"
                        onClick={() => transfer()}
                      >
                        Transfer
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
