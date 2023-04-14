import { Component, createEffect, createSignal } from "solid-js";
import bitcoin from "../../assets/bitcoin.png";
import ethereum from "../../assets/ethereum.png";
import usd from "../../assets/usd.png";
import tetherus from "../../assets/tetherus.png";
import near from "../../assets/near.png";
import aptos from "../../assets/aptos.png";
import DropdownItem from "./DropdownItem";

const MENU_ITEMS = [
  { coin: "Bitcoin", token: "BTC", image: bitcoin },
  { coin: "Ethereum", token: "ETH", image: ethereum },
  { coin: "USD Coin", token: "USDC", image: usd },
  { coin: "TetherUS", token: "USDT", image: tetherus },
  { coin: "NEAR Protocol", token: "NEAR", image: near },
  { coin: "Aptos", token: "APT", image: aptos },
];
const Dropdown: Component<{
  hideMenu: any;
  setCoin: (coinData: {
    coin: string;
    token: string;
    image: any;
    data3m: [any];
    data1m: [any];
    data1w: [any];
  }) => any;
}> = (props) => {
  const [searchCoin, setSearchCoin] = createSignal("");
  createEffect(() => {
    searchBarHandler();
    console.log(searchCoin());
  });
  const searchBarHandler = () => {
    const output = MENU_ITEMS.filter((element) =>
      element.token.toLowerCase().startsWith(searchCoin())
    ).map((item) => (
      <DropdownItem
        setCoin={props.setCoin}
        hideMenu={props.hideMenu}
        src={item.image}
        coin={item.coin}
        token={item.token}
      />
    ));
    return output;
  };

  return (
    <div class="flex flex-col w-300px h-312px absolute top-20 gap-1 p-2 bg-button-grey rounded shadow-menu-shadow border border-border-component">
      <div class="flex flex-row rounded gap-7 py-6px px-2 content-between items-center bg-input-background h-8">
        <input
          placeholder="Search coin"
          class="w-11/12 text-sm text-label-color"
          onInput={(e) => setSearchCoin(e.target.value)}
        />
        <svg
          width="13"
          height="12"
          viewBox="0 0 13 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M2.20644 1.24322C0.548821 2.90084 0.548821 5.58838 2.20644 7.246C3.76332 8.80288 6.22872 8.8975 7.89604 7.52987L12.3662 12L13 11.3662L8.52601 6.89217C9.8591 5.22565 9.7535 2.78749 8.20922 1.24322C6.5516 -0.414406 3.86407 -0.414406 2.20644 1.24322ZM2.84028 6.61216C1.53271 5.3046 1.53271 3.18462 2.84028 1.87705C4.14784 0.569485 6.26783 0.569485 7.57539 1.87705C8.88296 3.18462 8.88296 5.3046 7.57539 6.61216C6.26783 7.91973 4.14784 7.91973 2.84028 6.61216Z"
            fill="#7685A0"
          />
        </svg>
      </div>
      {searchBarHandler()}
    </div>
  );
};

export default Dropdown;
