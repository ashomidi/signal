const aum_spinner = document.getElementById("aum-chart-spinner");

const aumChartOptions = {
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

const updateAUMChartData = async () => {
  aum_spinner.classList.remove("hidden");
  const selectedTimeFrame = document.getElementById(
    "timeFrameSelectForAUM"
  ).value;
  const totalFlwsWrapper = document.getElementById("total-followers-item");

  try {
    const response = await fetch(
      `https://master.soroosh.app/api/report/chart/master/godofweb3?format=json&report=FOLLOWERS&time_frame=${selectedTimeFrame}`
    );
    const data = await response.json();

    aum_spinner.classList.add("hidden");
    totalFlwsWrapper.innerHTML = data.total_followers;

    const chartData = data.data.map((item) => ({
      time: item.timestamp / 1000,
      value: item.value,
    }));

    if (chartAum) {
      chartAum.remove();
    }

    const container = document.getElementById("aum-chart-container");
    chartAum = LightweightCharts.createChart(container, aumChartOptions);

    const series = chartAum.addAreaSeries();
    series.setData(chartData);
    chartAum.timeScale().fitContent();
  } catch (error) {
    console.error("Error fetching or rendering data:", error);
  }
};

let chartAum;

document
  .getElementById("timeFrameSelectForAUM")
  .addEventListener("change", updateAUMChartData);
updateAUMChartData();
