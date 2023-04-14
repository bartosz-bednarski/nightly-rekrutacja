import { Component } from "solid-js";

const DropdownItem: Component<{
  hideMenu: any;
  setCoin: any;
  src: any;
  coin: string;
  token: string;
}> = (props) => {
  const buttonHandler = () => {
    const endDate = new Date();
    const currDay = new Date();
    const getDateArray = function (start: Date, end: Date) {
      const arr = new Array();
      const dt = new Date(start);

      while (dt <= end) {
        const date = new Date(dt);
        const year = date.getFullYear();
        const month = `${("0" + (date.getMonth() + 1)).slice(-2)}`;
        const day = `${("0" + date.getDate()).slice(-2)}`;
        arr.push({
          time: `${year}-${month}-${day}`,
          value: Number((Math.random() * 100).toFixed(2)),
        });
        dt.setDate(dt.getDate() + 1);
      }

      return arr;
    };
    const DAILY_DATA: any = getDateArray(
      new Date(new Date().setDate(currDay.getDate() - 600)),
      endDate
    );
    const THREE_MONTHS_DATA = [];
    const ONE_MONTH_DATA = [];
    const ONE_WEEK_DATA = [];
    for (let i = 0; i < DAILY_DATA.length; i = i + 91) {
      THREE_MONTHS_DATA.push(DAILY_DATA[i]);
    }
    for (let i = 0; i < DAILY_DATA.length; i = i + 30) {
      ONE_MONTH_DATA.push(DAILY_DATA[i]);
    }

    for (let i = 0; i < DAILY_DATA.length; i = i + 7) {
      ONE_WEEK_DATA.push(DAILY_DATA[i]);
    }
    props.hideMenu();
    props.setCoin({
      coin: props.coin,
      token: props.token,
      image: props.src,
      dataDaily: DAILY_DATA,
      data3m: THREE_MONTHS_DATA,
      data1m: ONE_MONTH_DATA,
      data1w: ONE_WEEK_DATA,
    });
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
export default DropdownItem;
