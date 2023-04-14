import { Component, createEffect, createSignal } from "solid-js";
import Form from "./form/Form";
import Chart from "./chart/Chart";
import bitcoin from "../assets/bitcoin.png";
const Home: Component = () => {
  const [currentCoin, setCurrentCoin] = createSignal({
    coin: "Bitcoin",
    token: "BTC",
    image: bitcoin,
    data3m: [],
    data1m: [],
    data1w: [],
    dataDaily: [],
  });
  createEffect(() => {
    console.log(currentCoin());
  });

  return (
    <div class="flex flex-row h-screen ">
      <Form
        coin={currentCoin()}
        setCoin={(coinData) => setCurrentCoin(coinData)}
      />
      <Chart coin={currentCoin()} />
    </div>
  );
};
export default Home;
