// Penyebab Kematian di Indonesia
async function getData1() {
    const response = await fetch('https://docs.google.com/spreadsheets/d/1TTTLYu0i2vHSCT5vWiNAvOD7yPEqDHikbdJ9CLAJW08/export?format=csv&id=1TTTLYu0i2vHSCT5vWiNAvOD7yPEqDHikbdJ9CLAJW08&gid=810444858');
    const data = await response.text();
    return data;
}

async function drawChart1() {
    const rawData = await getData1();
    const rows = rawData.split('\n');
    const labels = rows[0].split(',');
    const datasets = [];

    for (let i = 1; i < rows.length; i++) {
        const row = rows[i].split(',');
        const type = row[0];
        const data = row.slice(1).map(Number);

        datasets.push({
            label: type,
            data: data,
            backgroundColor: getRandomColor(),
        });
    }

    const ctx = document.getElementById('chart1').getContext('2d');
    const chart1 = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels.slice(1),
            datasets: datasets,
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Penyebab Kemtian di Indonesia'
                },
                // Menampilkan data ketika grafik di hover
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    filter: function (tooltipItem) {
                        // Mengatur agar tooltip hanya ditampilkan untuk data point dengan nilai bukan 0
                        return tooltipItem.raw !== 0;
                    },
                }
            },
            responsive: true,
            scales: {
                x: {
                    stacked: true,
                    title: {
                        display: true,
                        text: 'Tahun'
                    }
                },
                y: {
                    stacked: true,
                    title: {
                        display: true,
                        text: 'Jumlah Kematian'
                    }
                }
            }
        }
    });
}

function getRandomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

// Kematian di Indonesia Berdasarkan Tahun dan Tipe
async function getData2() {
    const response = await fetch('https://docs.google.com/spreadsheets/d/1TTTLYu0i2vHSCT5vWiNAvOD7yPEqDHikbdJ9CLAJW08/export?format=csv&id=1TTTLYu0i2vHSCT5vWiNAvOD7yPEqDHikbdJ9CLAJW08&gid=1480790998');
    const data = await response.text();
    return data;
}

async function drawChart2() {
    const rawData = await getData2();
    const rows = rawData.split('\n');
    const labels = rows[0].split(',');
    const datasets = [];

    for (let i = 1; i < rows.length; i++) {
        const row = rows[i].split(',');
        const type = row[0];
        const data = row.slice(1).map(Number);

        datasets.push({
            label: type,
            data: data,
            backgroundColor: getRandomColor(), 
            borderColor: 'rgba(0, 0, 0, 0.2)', 
            borderWidth: 1,
            fill: true,
        });
    }

    const ctx = document.getElementById('chart2').getContext('2d');
    const chart2 = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels.slice(1),
            datasets: datasets,
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Kematian di Indonesia Berdasarkan Tahun dan Tipe'
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function (context) {
                            const label = context.dataset.label || '';
                            const value = context.parsed.y;
                            if (value === 0) {
                                // Kembalikan null untuk mencegah tampilan tooltip untuk data dengan nilai 0
                                return null;
                            }
                            return label + ': ' + value;
                        }
                    }
                }
            },
            responsive: true,
            scales: {
                x: {
                    stacked: true,
                    title: {
                        display: true,
                        text: 'Tahun'
                    }
                },
                y: {
                    stacked: true,
                    title: {
                        display: true,
                        text: 'Jumlah Kematian'
                    }
                }
            }
        }
    });
}


drawChart1();
drawChart2();