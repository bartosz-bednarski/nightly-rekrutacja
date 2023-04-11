import type { Component } from "solid-js";
import Header from "./components/Header";
import Home from "./components/Home";
const App: Component = () => {
  return (
    <div>
      <Header />
      <Home />
      <h1 class="text-3xl font-bold underline">Hello world!</h1>
    </div>
  );
};

export default App;
