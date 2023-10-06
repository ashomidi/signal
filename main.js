const signals_wrapper = document.getElementById("signal-items");

const SIGNAL_ITEMS = [
    {
        id: 0,
        title: "BTC/USDT",
        value: "23%"
    },
    {
        id: 1,
        title: "ADA/USDT",
        value: "-9%"
    },
    {
        id: 2,
        title: "DOT/USDT",
        value: "-1%"
    },
    {
        id: 3,
        title: "ETH/USDT",
        value: "53%"
    },
    {
        id: 4,
        title: "BTC/USDT",
        value: "12%"
    },
    {
        id: 5,
        title: "XRP/USDT",
        value: "94%"
    },
    {
        id: 6,
        title: "ETH/USDT",
        value: "53%"
    },
    {
        id: 7,
        title: "BTC/USDT",
        value: "12%"
    },
    {
        id: 8,
        title: "XRP/USDT",
        value: "94%"
    },
]

const TIME_FRAME_ITEMS = [
    {
        id: 0,
        label: '24h',
        value: 24,
    },
    {
        id: 1,
        label: '7d',
        value: 7,
    },
    {
        id: 2,
        label: '1M',
        value: 1,
    },
    {
        id: 3,
        label: '6M',
        value: 6,
    },
]


const signalItems = SIGNAL_ITEMS.map(item => {
    return `
        <div class="flex items-center">
            <h4 class="font-semibold text-sm mb-1">${item.title}</h4>
            <span class="ml-1">${item.value}</span>
        </div>
    `
}).join('');

signals_wrapper.innerHTML = `<div class="grid grid-cols-3 gap-4">${signalItems}</div>`;