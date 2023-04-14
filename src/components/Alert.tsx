import { Component } from "solid-js";

const Alert: Component<{
  hideAlert: any;
  amount: number;
  fee: number;
  token: string;
}> = (props) => {
  const hideAlertHandler = () => {
    props.hideAlert();
  };
  return (
    <div class="flex bg-transparent w-11/12 h-screen z-40  absolute top-0">
      <div class=" min-w-max flex flex-col items-center p-3 gap-0 mt-3 left-0 w-1/4 h-32 border border-input-border mx-auto bg-input-background">
        <div class="flex flex-row gap-3">
          <span class="text-label-color text-xl  mb-2 ">Withdraw: </span>
          <span class="text-xl  text-white">
            {props.amount} {props.token}
          </span>
        </div>
        <div class="flex flex-row gap-3">
          <span class="text-label-color text-xs  mb-2 ">Network fee: </span>
          <span class="text-xs text-white">
            {props.fee} {props.token}
          </span>
        </div>
        <button
          class=" px-4 py-6px text-sm bg-withdraw-button-background
              rounded w-3/4 "
          onClick={hideAlertHandler}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};
export default Alert;
