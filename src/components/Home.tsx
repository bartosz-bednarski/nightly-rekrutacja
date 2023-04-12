import { Component } from "solid-js";
import HomeForm from "./HomeForm";
import HomeChart from "./HomeChart";

const Home: Component = () => {
  return (
    <div class="flex flex-row h-screen">
      <HomeForm />
      <HomeChart />
    </div>
  );
};
export default Home;
