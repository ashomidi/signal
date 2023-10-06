const chartOptions = {
    height: 200,
    layout: {
        background: { color: 'transparent' },
        textColor: '#DDD',
    },
    grid: {
        vertLines: { color: '#2b2b2b' },
        horzLines: { color: '#2b2b2b' },
    },
    timeScale: {
        timeVisible: true,
        secondsVisible: false,
    },
}

const updateChartData = async () => {
    const selectedTimeFrame = document.getElementById('timeFrameSelectForPnl').value;
    const totalPnlWrapper = document.getElementById('total_pnl_item');

    try {
        const response = await fetch(`https://master.soroosh.app/api/report/chart/master/godofweb3?format=json&report=PNL&time_frame=${selectedTimeFrame}`);
        const data = await response.json();

        totalPnlWrapper.innerHTML = data.total_pnl.toFixed(2);

        const chartData = data.data.map(item => ({
            time: item.timestamp / 1000,
            value: item.value,
        }));

        if (chart) {
            chart.remove();
        }

        const container = document.getElementById('chart-container');
        chart = LightweightCharts.createChart(container, chartOptions);

        const series = chart.addAreaSeries();
        series.setData(chartData);
        chart.timeScale().fitContent();

    } catch (error) {
        console.error('Error fetching or rendering data:', error);
    }
};

let chart;

document.getElementById('timeFrameSelectForPnl').addEventListener('change', updateChartData);
updateChartData();
