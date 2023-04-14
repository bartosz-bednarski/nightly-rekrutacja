import { Component, createEffect, createSignal } from "solid-js";
import { z } from "zod";
import Dropdown from "../dropdown/Dropdown";
import Alert from "../Alert";
const Form: Component<{
  setCoin: (coinData: any) => any;
  coin: { coin: string; token: string; image: any };
}> = (props) => {
  const [menuIsShown, setMenuIsShown] = createSignal(true);
  const [withdrawInput, setWithdrawInput] = createSignal("");
  const [amountInput, setAmountInput] = createSignal(0);
  const [minAmount, setMinAmount] = createSignal(0);
  const [maxAmount, setMaxAmount] = createSignal(0);
  const [networkFee, setNetworkFee] = createSignal(0);
  const [buttonDisabled, setButtonDisabled] = createSignal(true);
  const [showAlert, setShowAlert] = createSignal(false);
  const capital = RegExp(
    /^(0x)(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/g
  );

  createEffect(() => {
    menuIsShown();
    setMinAmount(Math.floor(Math.random() * (10 - 5) + 5) / 100000);
    setNetworkFee(Math.floor(Math.random() * (1 - 8) + 8) / 1000000);
    setMaxAmount(
      Math.floor(Math.random() * (155 - 95) + 95) / 10 - networkFee()
    );
  });
  createEffect(() => {
    console.log(withdrawInput());
    amountInput();
    const WithdrawSchema = z.object({
      withdraw: z.string().length(32).regex(capital),
      amount: z.number().positive().min(minAmount()).max(maxAmount()),
    });
    const submitData = { withdraw: withdrawInput(), amount: amountInput() * 1 };
    const results = WithdrawSchema.safeParse(submitData);
    console.log(results);
    results.success && setButtonDisabled(false);
    !results.success && setButtonDisabled(true);
  });
  const submitHandler = (event: any) => {
    event.preventDefault();
  };
  return (
    <>
      {showAlert() && (
        <Alert
          hideAlert={() => setShowAlert(false)}
          amount={amountInput()}
          fee={networkFee()}
          token={props.coin.token}
        />
      )}
      <div class="relative flex flex-col bg-background-component shadow-withdraw-shadow border-2 border-border-component h-auto text-white mt-16 mr-10 mb-auto ml-14 p-4 w-332px rounded-lg">
        <span class="text-base/[22px]">Withdraw crypto</span>
        <label for="select-coin" class="text-label-color text-xs mt-22px mb-2">
          Select a coin
        </label>
        {menuIsShown() && (
          <Dropdown
            hideMenu={() => setMenuIsShown(false)}
            setCoin={props.setCoin}
          />
        )}
        <button
          name="select-coin"
          class="bg-button-grey py-2 px-3 flex flex-row justify-between w-300px"
          onClick={() => setMenuIsShown(true)}
        >
          <div class="flex flex-row gap-2 text-sm">
            <img src={props.coin.image} class="w-6 h-6" />
            <span>{props.coin.coin}</span>
            <span class="text-label-color">({props.coin.token})</span>
          </div>
          <div class="flex flex-row items-center gap-2">
            <span class="text-label-color text-sm">0.0522103</span>

            <svg
              width="12"
              height="6"
              viewBox="0 0 12 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 6L5.24537e-07 -1.04907e-06L12 0L6 6Z"
                fill="#F7F7F7"
              />
            </svg>
          </div>
        </button>
        <form class="mt-4 pr-0 w-auto" onSubmit={submitHandler}>
          <label for="withdraw-to" class="text-label-color text-xs  mb-2 ">
            Withdraw to
          </label>
          <div class="flex flex-row content-between bg-input-background border-2 border-input-border py-6px px-3 gap-4">
            <input
              onchange={(event) => setWithdrawInput(event.target.value)}
              name="withdraw-to"
              class="bg-transparent w-237px h-5 text-sm text-input-text-color"
            />
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="12"
                cy="12"
                r="12"
                fill="#6067F9"
                fill-opacity="0.25"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12.362 5.50143C10.4093 5.4938 8.40453 6.39534 7.26032 8.09292C6.06958 9.83378 5.76942 12.132 6.16359 14.208C6.44045 15.5937 7.20925 16.9033 8.38619 17.6273C9.72869 18.4831 11.3656 18.6113 12.8957 18.4267C13.6636 18.3285 14.4195 18.1123 15.1219 17.7735V16.2386C13.5434 16.9286 11.7389 17.2647 10.0613 16.7694C8.88271 16.4192 7.92471 15.3483 7.66548 14.0866C7.35601 12.8023 7.43119 11.4212 7.82338 10.1682C8.24339 8.91601 9.15408 7.83271 10.3499 7.3771C11.5431 6.88473 12.9138 6.83964 14.1315 7.26472C15.2169 7.68438 16.1013 8.67205 16.3721 9.85595C16.6536 10.9396 16.6212 12.1366 16.2236 13.1797C16.0482 13.6193 15.652 14.0676 15.1578 13.967C14.8844 13.9205 14.6709 13.6761 14.6442 13.3876C14.5523 12.9297 14.5894 12.4653 14.6266 12.0006C14.6484 11.7279 14.6702 11.455 14.6659 11.1833L14.6767 10.9701C14.7107 10.2981 14.7447 9.62607 14.7798 8.95414C13.6671 8.60294 12.4652 8.37706 11.3172 8.66058C10.1549 8.99646 9.2634 10.099 9.06888 11.3481C8.89903 12.2781 8.97282 13.2825 9.38082 14.1283C9.7581 14.8533 10.4884 15.3694 11.2803 15.4014C12.1539 15.4879 13.0846 15.1034 13.581 14.3257C13.9042 15.1033 14.7692 15.5456 15.5553 15.3881C16.493 15.2525 17.2498 14.4788 17.5802 13.5714C18.1265 12.226 18.1019 10.677 17.7231 9.28658C17.2715 7.75197 16.1476 6.43885 14.6969 5.90445C13.9538 5.60974 13.156 5.48498 12.362 5.50143ZM13.1882 10.0564C12.8886 9.98756 12.5786 9.9611 12.2698 9.96215C12.2242 9.96316 12.1787 9.96578 12.1333 9.96993C11.4851 9.9768 10.935 10.4913 10.7188 11.1121C10.5259 11.7878 10.4637 12.5413 10.6746 13.222C10.7848 13.735 11.3091 14.0274 11.7811 13.9786C12.232 13.9849 12.6364 13.6552 12.8214 13.231C13.0984 12.5115 13.1217 11.7377 13.1449 10.9668C13.1541 10.6617 13.1633 10.3571 13.1882 10.0564Z"
                fill="#8793FF"
              />
            </svg>
          </div>
          <label for="amount" class="text-label-color text-xs mt-4 mb-2">
            Amount
          </label>
          <div class="flex flex-row content-between bg-input-background border-2 border-input-border py-6px px-3 gap-4 mb-4 ">
            <input
              onChange={(event: any) => setAmountInput(event.target.value)}
              type="number"
              step="0.000001"
              name="amount"
              class="bg-transparent w-237px h-5 text-sm text-input-text-color"
            />
            <button class="bg-input-button-background px-2 py-1 rounded text-input-button-color text-xs">
              Max
            </button>
          </div>
          <div class="flex flex-wrap border-t pt-4 border-border-component ">
            <div class="flex flex-col w-36">
              <label for="min-amount" class="text-label-color text-xs  mb-2">
                Minimum amount
              </label>
              <output name="min-amount" class="text-base">
                {minAmount()} {props.coin.token}
              </output>
            </div>
            <div class="flex flex-col w-36">
              <label for="max-amount" class="text-label-color text-xs  mb-2">
                Maximum amount
              </label>
              <output name="max-amount" class="text-base">
                {maxAmount()} {props.coin.token}
              </output>
            </div>
            <div class="flex flex-col w-36 mt-14px">
              <label for="network-fee" class="text-label-color text-xs  mb-2">
                Network fee
              </label>
              <output name="network-fee" class="text-base">
                ~ {networkFee()} {props.coin.token}
              </output>
            </div>
          </div>
          <button
            name="withdraw"
            class={`mt-22px px-4 py-6px text-sm ${
              buttonDisabled()
                ? "bg-border-component"
                : "bg-withdraw-button-background"
            }  rounded w-300px mb-4`}
            disabled={buttonDisabled()}
            onClick={() => setShowAlert(true)}
          >
            Withdraw
          </button>
        </form>
      </div>
    </>
  );
};
export default Form;
