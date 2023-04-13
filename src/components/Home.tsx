import { Component, createEffect, createSignal } from "solid-js";
import HomeForm from "./HomeForm";
import HomeChart from "./HomeChart";
import bitcoin from "../assets/bitcoin.png";
const Home: Component = () => {
  const [currentCoin, setCurrentCoin] = createSignal({
    coin: "Bitcoin",
    token: "BTC",
    image: bitcoin,
  });
  createEffect(() => {
    console.log(currentCoin());
  });

  return (
    <div class="flex flex-row h-screen">
      <HomeForm
        coin={currentCoin()}
        setCoin={(coinData) => setCurrentCoin(coinData)}
      />
      <HomeChart coin={currentCoin()} />
    </div>
  );
};
export default Home;
