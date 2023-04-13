import { Component } from "solid-js";

const DropdownMenuItem: Component<{
  hideMenu: any;
  setCoin: any;
  src: any;
  coin: string;
  token: string;
}> = (props) => {
  const buttonHandler = () => {
    props.hideMenu();
    props.setCoin({ coin: props.coin, token: props.token, image: props.src });
  };
  return (
    <button
      class="flex flex-row gap-1 p-2 items-center"
      onClick={buttonHandler}
    >
      <img class="w-6 h-6 mr-1" src={props.src} />
      <span class="text-white text-sm">{props.coin}</span>
      <span class="text-label-color text-sm">({props.token})</span>
    </button>
  );
};
export default DropdownMenuItem;
