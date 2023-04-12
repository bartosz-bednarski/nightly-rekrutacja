// import type { Component } from "solid-js";
import { LineData, LineType, createChart } from "lightweight-charts";
import { createEffect, createRenderEffect, createSignal } from "solid-js";
import type { Component } from "solid-js";

const HomeChart: Component = () => {
  createEffect(() => {
    createChartBox(chartTime());
  });
  const endDate = new Date();
  const currDay = new Date();

  //Create array fnc
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
  const ONE_WEEK_DATA: any = getDateArray(
    new Date(new Date().setDate(currDay.getDate() - 7)),
    endDate
  );
  const ONE_MONTH_DATA: any = getDateArray(
    new Date(new Date().setDate(currDay.getDate() - 30)),
    endDate
  );
  const THREE_MONTHS_DATA: any = getDateArray(
    new Date(new Date().setDate(currDay.getDate() - 90)),
    endDate
  );
  console.log(THREE_MONTHS_DATA);
  const [chartTime, setChartTime] = createSignal(THREE_MONTHS_DATA);
  const createChartBox = (chartData) => {
    const chartbox = document.createElement("div");
    chartbox.style.position = "relative";
    const chart = createChart(chartbox, {
      width: 806,
      height: 300,

      layout: {
        background: {
          color: "#040407",
        },
        textColor: "#7685A0",
      },

      rightPriceScale: { visible: false },

      timeScale: {
        borderColor: "#2B344D",
        barSpacing: 6,
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
        top: 0.3, // leave some space for the legend
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
        const dateStr = param.time;

        toolTip.style.display = "block";
        const data: object | any = param.seriesData.get(lineSeries);
        const price = data.value;
        toolTip.innerHTML = `<div class='text-label-color text-10px' >${dateStr}</div>
        
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
    <div class="w-806px h-300px mt-16 rounded-lg  relative">
      <div class="flex flex-row gap-1 items-center justify-center absolute top-0 left-0 z-20 p-2">
        <button class="py-1 px-2 text-xs text-white rounded bg-border-component">
          24H
        </button>
        <button
          class="py-1 px-2 text-xs text-white rounded bg-border-component"
          onClick={() => {
            setChartTime(ONE_WEEK_DATA);
            console.log(chartTime);
          }}
        >
          1W
        </button>
        <button
          class="py-1 px-2 text-xs text-white rounded bg-border-component"
          onClick={() => {
            setChartTime(ONE_MONTH_DATA);
            console.log(chartTime);
          }}
        >
          1M
        </button>
        <button
          class="py-1 px-2 text-xs text-white rounded bg-border-component"
          onClick={() => {
            setChartTime(THREE_MONTHS_DATA);
            console.log(chartTime);
          }}
        >
          3M
        </button>
      </div>
      {createChartBox(chartTime())}
    </div>
  );
};

export default HomeChart;
