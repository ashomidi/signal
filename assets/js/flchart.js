const flws_spinner = document.getElementById("flws-chart-spinner");

const chartOptions = {
  height: 200,
  layout: {
    background: { color: "transparent" },
    textColor: "#DDD",
  },
  grid: {
    vertLines: { color: "#2b2b2b" },
    horzLines: { color: "#2b2b2b" },
  },
  timeScale: {
    timeVisible: true,
    secondsVisible: false,
  },
};

const updateChartData = async () => {
  flws_spinner.classList.remove("hidden");
  const selectedTimeFrame = document.getElementById(
    "timeFrameSelectForflws"
  ).value;
  const totalFlwsWrapper = document.getElementById("total-followers-item");

  try {
    const response = await fetch(
      `https://master.soroosh.app/api/report/chart/master/godofweb3?format=json&report=FOLLOWERS&time_frame=${selectedTimeFrame}`
    );
    const data = await response.json();
    flws_spinner.classList.add("hidden");

    totalFlwsWrapper.innerHTML = data.total_followers;

    const chartData = data.data.map((item) => ({
      time: item.timestamp / 1000,
      value: item.value,
    }));

    if (chart) {
      chart.remove();
    }

    const container = document.getElementById("flws-chart-container");
    chart = LightweightCharts.createChart(container, chartOptions);

    const series = chart.addAreaSeries();
    series.setData(chartData);
    chart.timeScale().fitContent();
  } catch (error) {
    console.error("Error fetching or rendering data:", error);
  }
};

let chart;

document
  .getElementById("timeFrameSelectForflws")
  .addEventListener("change", updateChartData);
updateChartData();
