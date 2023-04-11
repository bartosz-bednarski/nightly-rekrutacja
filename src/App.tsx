import type { Component } from "solid-js";
import Header from "./components/Header";
import Home from "./components/Home";
const App: Component = () => {
  return (
    <div class="flex flex-col bg-background-blue h-screen">
      <Header />
      <Home />
    </div>
  );
};

export default App;
