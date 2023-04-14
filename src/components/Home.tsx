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
    currentCoin();
  });

  return (
    <div class=" flex xl:mb-auto xl:flex-row xl:h-auto xl:items-start items-center flex-col mb-8 h-auto">
      <Form
        coin={currentCoin()}
        setCoin={(coinData) => setCurrentCoin(coinData)}
      />
      <Chart coin={currentCoin()} />
    </div>
  );
};
export default Home;
