// Pascal's Triangle Generator
function generatePascalTriangle(rows) {
    const triangle = [];
    for (let i = 0; i < rows; i++) {
        triangle[i] = [];
        for (let j = 0; j <= i; j++) {
            if (j === 0 || j === i) {
                triangle[i][j] = 1;
            } else {
                triangle[i][j] = triangle[i - 1][j - 1] + triangle[i - 1][j];
            }
        }
    }
    return triangle;
}

function renderPascalTriangle(triangle) {
    const output = document.getElementById('pascal-output');
    output.innerHTML = '';
    const totalRows = triangle.length;
    triangle.forEach((row, i) => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'pascal-row';
        // Center the row visually by adding left/right margin
        const maxCells = triangle[totalRows - 1].length;
        const cellWidth = 40; // px, approx
        const rowWidth = row.length * cellWidth;
        const totalWidth = maxCells * cellWidth;
        const margin = Math.max((totalWidth - rowWidth) / 2, 0);
        rowDiv.style.marginLeft = margin + 'px';
        rowDiv.style.marginRight = margin + 'px';
        row.forEach(num => {
            const cell = document.createElement('span');
            cell.className = 'pascal-cell';
            cell.textContent = num;
            rowDiv.appendChild(cell);
        });
        output.appendChild(rowDiv);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('pascal-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const rows = parseInt(document.getElementById('rows').value, 10);
        if (rows > 0 && rows <= 20) {
            const triangle = generatePascalTriangle(rows);
            renderPascalTriangle(triangle);
        }
    });
    // Generate default triangle
    const triangle = generatePascalTriangle(5);
    renderPascalTriangle(triangle);
});

// Draw modern Pascal curves in the hero section
function drawPascalCurves() {
    const canvas = document.getElementById('pascal-curves');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    // Set canvas size to hero size
    const hero = document.querySelector('.hero');
    const dpr = window.devicePixelRatio || 1;
    const width = hero.offsetWidth;
    const height = hero.offsetHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    // Generate Pascal's Triangle rows
    function pascalRow(n) {
        let row = [1];
        for (let k = 0; k < n; k++) {
            row.push(row[k] * (n - k) / (k + 1));
        }
        return row;
    }

    // Draw several layered curves
    const numCurves = 6;
    const colors = [
        'rgba(106,130,251,0.18)', // blue
        'rgba(252,92,125,0.13)',  // pink
        'rgba(162,89,255,0.13)',  // purple
        'rgba(255,214,10,0.10)',  // gold
        'rgba(249,246,238,0.13)', // bone
        'rgba(67,97,238,0.10)'    // accent blue
    ];
    for (let i = 0; i < numCurves; i++) {
        const row = pascalRow(6 + i * 2);
        ctx.beginPath();
        ctx.moveTo(0, height * 0.7);
        for (let j = 0; j < row.length; j++) {
            const x = (width / (row.length - 1)) * j;
            // Use Pascal value to modulate y for a wavy effect
            const y = height * 0.7 - row[j] * 0.015 * (1 + i * 0.12);
            ctx.lineTo(x, y);
        }
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        ctx.fillStyle = colors[i % colors.length];
        ctx.fill();
    }
}

window.addEventListener('resize', drawPascalCurves);
drawPascalCurves(); 