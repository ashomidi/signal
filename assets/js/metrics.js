const metrics_wrapper = document.getElementById("metrics-items");
const spinner_wrapper = document.getElementById("metrics-spinner");

async function fetchDataAndRender() {

  metrics_wrapper.classList.add("hidden");
  spinner_wrapper.classList.remove("hidden");

  const selectedMetricsTimeFrame = document.getElementById(
    "timeFrameSelectForMetrics"
  ).value;
  const keysToDisplay = [
    "signals",
    "pnl",
    "draw_down",
    "win_rate",
    "over_trade_rate",
    "risk",
    "r_r",
    "psyco_rate",
  ];
  try {
    const response = await fetch(
      `https://master.soroosh.app/api/master/godofweb3/metrics?format=json&time_frame=${selectedMetricsTimeFrame}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    const metricsData = data.data;

    const metricHtml = keysToDisplay
      .map((key) => {
        const value = metricsData[key];
        const textContent = value === false ? "NA" : Math.floor(value);
        return `
        <div>
            <span class=${
              ("font-semibold",
              value < 0
                ? "text-red-300"
                : value > 0
                ? "text-green-300"
                : "text-gray-400")
            }>${textContent}</span>
            <h4 class="text-xs mb-1 uppercase">${key}</h4>                    
        </div>
            `;
      })
      .join("");

    metrics_wrapper.innerHTML = `<div class="grid grid-cols-4 gap-4">${metricHtml}</div>`;

    metrics_wrapper.classList.remove("hidden");
    spinner_wrapper.classList.add("hidden");
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

document
  .getElementById("timeFrameSelectForMetrics")
  .addEventListener("change", fetchDataAndRender);
fetchDataAndRender();
