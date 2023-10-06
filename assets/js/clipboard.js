const handleCopy = () => {
    const textToCopy = document.getElementById('copyText').innerText;
    try {
        navigator.clipboard.writeText(textToCopy);
        Toastify({
            text: "Text Copied",
            duration: 2000,
            gravity: "bottom",
            position: "left",
            style: {
                background: "#1F2125",
                boxShadow: 'none'
            },
        }).showToast();
    } catch (err) {
        console.error('Unable to copy text: ', err);
    }
}