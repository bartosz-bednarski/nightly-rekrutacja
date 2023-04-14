// import type { Component } from "solid-js";
import { createChart } from "lightweight-charts";
import { createEffect, createSignal } from "solid-js";
import type { Component } from "solid-js";

const Chart: Component<{
  coin: {
    coin: String;
    token: string;
    image: any;
    data3m: any;
    data1m: any;
    data1w: any;
    dataDaily: any;
  };
}> = (props) => {
  createEffect(() => {
    if (props.coin) {
      setChartTime(props.coin.dataDaily);
    }
  });

  const [chartTime, setChartTime] = createSignal(props.coin.dataDaily);
  const createChartBox = (chartData: any) => {
    const chartbox = document.createElement("div");
    chartbox.setAttribute(
      "class",
      "w-4/5 h-300px bg-input-background border-border-component border flex items-center content-center rounded-lg   xl:w-auto "
    );
    // chartbox.style.width = "auto";
    // chartbox.style.height = "300px";
    // chartbox.style.background = "#040407";
    // chartbox.style.borderRadius = "8px";
    // chartbox.style.display = "flex";
    // chartbox.style.alignItems = "center";
    // chartbox.style.justifyContent = "center";
    // chartbox.style.border = "1px solid #2B344D";
    const chart = createChart(chartbox, {
      width: 800,
      height: 290,

      layout: {
        background: {
          color: "#040407",
        },
        textColor: "#7685A0",
      },

      rightPriceScale: { visible: false },

      timeScale: {
        borderColor: "#2B344D",
        barSpacing: 5,
        timeVisible: false,
        fixLeftEdge: true,
        secondsVisible: true,
      },

      grid: {
        horzLines: {
          visible: false,
        },
        vertLines: {
          visible: false,
        },
      },
      crosshair: {
        horzLine: {
          visible: false,
        },
        vertLine: {
          labelBackgroundColor: "#F7F7F7",
        },
      },
    });

    const lineSeries = chart.addLineSeries({
      color: "#5AB88B",
      lineWidth: 1,
      baseLineVisible: false,
    });
    lineSeries.priceScale().applyOptions({
      scaleMargins: {
        top: 0.3,
        bottom: 0.1,
      },
    });
    chart.timeScale().fitContent();
    //SET DATA
    lineSeries.setData(chartData);
    //TOOLTIP STYLES
    const toolTipWidth = 80;
    const toolTipHeight = 80;
    const toolTipMargin = 15;
    const toolTip = document.createElement("div");
    toolTip.style.position = "absolute";
    toolTip.style.zIndex = "2";
    toolTip.style.top = "1";
    toolTip.style.left = "0";
    toolTip.style.padding = "4px 8px";
    toolTip.style.borderLeft = "2px solid #5AB88B";
    toolTip.style.background = "#171C2F";
    toolTip.style.boxShadow = "0px 2px 8px rgba(0, 0, 0, 0.5)";
    toolTip.style.borderRadius = "0px 8px 8px 0px";
    toolTip.style.color = "black";
    toolTip.style.borderColor = "rgba( 38, 166, 154, 1)";
    chartbox.appendChild(toolTip);
    chart.subscribeCrosshairMove((param) => {
      if (
        param.point === undefined ||
        !param.time ||
        param.point.x < 0 ||
        param.point.x > chartbox.clientWidth ||
        param.point.y < 0 ||
        param.point.y > chartbox.clientHeight
      ) {
        toolTip.style.display = "none";
      } else {
        const monthNames = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        const tooltipDate = param.time.toLocaleString();
        let month = Number(tooltipDate.slice(5, 7));
        let monthName = monthNames[month - 1];
        let day = tooltipDate.slice(8);
        const dateStr = param.time;

        toolTip.style.display = "block";
        const data: object | any = param.seriesData.get(lineSeries);
        const price = data.value;
        toolTip.innerHTML = `<div class='text-label-color text-10px' >${monthName} ${day}${", 10:23:42 PM"}</div>
        
        <div class='inline-flex'><span class='text-white text-10px'>Balance:</span>
        <span class='text-chart-green text-10px pl-1'> $${price}</span>
        </div>
        <div class='text-white text-10px'>Leverage: 1.25x</div>
        <div class='text-white text-10px'>Margin usage: 9.85%</div>
        `;

        const y = param.point.y;
        let left = param.point.x + toolTipMargin;
        if (left > chartbox.clientWidth - toolTipWidth) {
          left = param.point.x - toolTipMargin - toolTipWidth;
        }

        let top = y + toolTipMargin;
        if (top > chartbox.clientHeight - toolTipHeight) {
          top = y - toolTipHeight - toolTipMargin;
        }
        toolTip.style.left = left + "px";
        toolTip.style.top = top + "px";
      }
    });
    return chartbox;
  };

  //Return main fnc
  return (
    <div class="xl:w-auto xl:mx-0 w-4/5 h-300px mt-16 rounded-lg relative mx-auto">
      <div class="flex flex-row gap-1 items-center justify-center absolute top-0 left-0 z-20 p-2">
        <button
          class="py-1 px-2 text-xs text-white rounded bg-border-component"
          onClick={() => {
            setChartTime(props.coin.dataDaily);
          }}
        >
          24H
        </button>
        <button
          class="py-1 px-2 text-xs text-white rounded bg-border-component"
          onClick={() => {
            setChartTime(props.coin.data1w);
          }}
        >
          1W
        </button>
        <button
          class="py-1 px-2 text-xs text-white rounded bg-border-component"
          onClick={() => {
            setChartTime(props.coin.data1m);
          }}
        >
          1M
        </button>
        <button
          class="py-1 px-2 text-xs text-white rounded bg-border-component"
          onClick={() => {
            setChartTime(props.coin.data3m);
          }}
        >
          3M
        </button>
      </div>
      {createChartBox(chartTime())}
    </div>
  );
};

export default Chart;
