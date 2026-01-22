/**
 * Mock Data - Polymarket Style
 */
const markets = [
    {
        id: 'hps-sports-day-2026',
        title: 'Who will win Sports Day in HPS in 2026',
        icon: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=100&q=80',
        volume: 4200,
        volume24hr: 850,
        liquidity: 8500,
        createdAt: new Date('2026-01-20'),
        endDate: new Date('2026-03-15'),
        category: 'Sports',
        tags: ['New', 'Trending', 'Sports', 'HPS', 'HPS Sports', 'Athletics'],
        isNew: true,
        options: [
            { name: 'Nagarjuna', percent: 42.5, color: '#ef4444' },
            { name: 'Nalanda', percent: 35.1, color: '#3b82f6' },
            { name: 'Vijaynagar', percent: 15.2, color: '#f59e0b' },
            { name: 'Taxila', percent: 7.2, color: '#10b981' }
        ],
        chartData: [20, 25, 30, 28, 35, 42.5]
    },
    {
        id: 'hps-football-2026',
        title: 'Who will win the football match between Taxila and Nagarjuna',
        icon: 'https://images.unsplash.com/photo-1551952237-954a01c00a26?auto=format&fit=crop&w=100&q=80',
        volume: 1800,
        volume24hr: 420,
        liquidity: 3200,
        createdAt: new Date('2026-01-21'),
        endDate: new Date('2026-02-10'),
        category: 'Sports',
        tags: ['New', 'Sports', 'HPS', 'HPS Sports', 'Football'],
        isNew: true,
        options: [
            { name: 'Taxila', percent: 55.0, color: '#10b981' },
            { name: 'Nagarjuna', percent: 45.0, color: '#ef4444' }
        ],
        chartData: [40, 45, 50, 52, 55]
    },
    {
        id: 'cricket-nagarjuna-nalanda',
        title: 'Who will win the cricket match between Nagarjuna and Nalanda in 2026',
        icon: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=100&q=80',
        volume: 2400,
        volume24hr: 680,
        liquidity: 4800,
        createdAt: new Date('2026-01-19'),
        endDate: new Date('2026-02-05'),
        category: 'Sports',
        tags: ['Trending', 'Sports', 'HPS', 'HPS Sports', 'Cricket'],
        isNew: false,
        options: [
            { name: 'Nagarjuna', percent: 68, color: '#ef4444' },
            { name: 'Nalanda', percent: 32, color: '#3b82f6' }
        ],
        chartData: [50, 55, 60, 65, 68]
    },
    {
        id: 'vice-principal-hps',
        title: 'Who will be appointed as vice-principal of Hyderabad Public School after the current vice-principal retires',
        icon: 'https://images.unsplash.com/photo-1544650030-3c698527819c?auto=format&fit=crop&w=100&q=80',
        volume: 850,
        volume24hr: 125,
        liquidity: 1700,
        createdAt: new Date('2026-01-18'),
        endDate: new Date('2026-06-30'),
        category: 'Politics',
        tags: ['Politics', 'HPS', 'HPS Politics'],
        isNew: false,
        options: [
            { name: 'Senior Faculty P', percent: 45, color: '#3b82f6' },
            { name: 'External Candidate Q', percent: 30, color: '#ef4444' },
            { name: 'Department Head R', percent: 25, color: '#f59e0b' }
        ],
        chartData: [10, 20, 35, 40, 45]
    },
    {
        id: 'hps-dance-2026',
        title: 'Who will win the Dance competition 2026 in HPS',
        icon: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=100&q=80',
        volume: 1200,
        volume24hr: 290,
        liquidity: 2100,
        createdAt: new Date('2026-01-22'),
        endDate: new Date('2026-03-20'),
        category: 'Culture',
        tags: ['New', 'Trending', 'Culture', 'HPS', 'HPS Culture'],
        isNew: true,
        options: [
            { name: 'Nagarjuna', percent: 30, color: '#ef4444' },
            { name: 'Nalanda', percent: 25, color: '#3b82f6' },
            { name: 'Vijaynagar', percent: 25, color: '#f59e0b' },
            { name: 'Taxila', percent: 20, color: '#10b981' }
        ],
        chartData: [20, 22, 25, 28, 30]
    },
    {
        id: 'dance-nagarjuna-taxila',
        title: 'Who will win Interhouse Dance competition between Nagarjuna and Taxila',
        icon: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=100&q=80',
        volume: 950,
        volume24hr: 180,
        liquidity: 1900,
        createdAt: new Date('2026-01-17'),
        endDate: new Date('2026-02-28'),
        category: 'Culture',
        tags: ['Culture', 'HPS', 'HPS Culture'],
        isNew: false,
        options: [
            { name: 'Nagarjuna', percent: 52, color: '#ef4444' },
            { name: 'Taxila', percent: 48, color: '#10b981' }
        ],
        chartData: [45, 48, 50, 51, 52]
    },
    {
        id: 'points-nalanda-vijaynagar',
        title: 'Who will score higher points in inter-house dance competition between Nalanda and Vijaynagar',
        icon: 'https://images.unsplash.com/photo-1504609770354-fac4f342c4ef?auto=format&fit=crop&w=100&q=80',
        volume: 1100,
        volume24hr: 245,
        liquidity: 2200,
        createdAt: new Date('2026-01-16'),
        endDate: new Date('2026-03-01'),
        category: 'Culture',
        tags: ['Culture', 'HPS', 'HPS Culture'],
        isNew: false,
        options: [
            { name: 'Nalanda', percent: 55, color: '#3b82f6' },
            { name: 'Vijaynagar', percent: 45, color: '#f59e0b' }
        ],
        chartData: [40, 45, 50, 53, 55]
    },
    {
        id: 'hps-science-fair-2026',
        title: 'Who will win the Inter-house Science Fair 2026 in HPS',
        icon: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=100&q=80',
        volume: 3100,
        volume24hr: 720,
        liquidity: 6200,
        createdAt: new Date('2026-01-15'),
        endDate: new Date('2026-04-15'),
        category: 'Academics',
        tags: ['Trending', 'Academics', 'HPS', 'HPS Academics', 'Science Fair'],
        isNew: false,
        options: [
            { name: 'Nagarjuna', percent: 28, color: '#ef4444' },
            { name: 'Nalanda', percent: 32, color: '#3b82f6' },
            { name: 'Vijaynagar', percent: 22, color: '#f59e0b' },
            { name: 'Taxila', percent: 18, color: '#10b981' }
        ],
        chartData: [20, 25, 30, 31, 32]
    },
    {
        id: 'hps-boards-2026',
        title: 'Which house will have the highest average in the Grade 10 Board Exams',
        icon: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=100&q=80',
        volume: 5500,
        volume24hr: 1200,
        liquidity: 11000,
        createdAt: new Date('2026-01-10'),
        endDate: new Date('2026-05-30'),
        category: 'Academics',
        tags: ['Trending', 'Academics', 'HPS', 'HPS Academics', 'Exams'],
        isNew: false,
        options: [
            { name: 'Nagarjuna', percent: 35, color: '#ef4444' },
            { name: 'Nalanda', percent: 30, color: '#3b82f6' },
            { name: 'Vijaynagar', percent: 20, color: '#f59e0b' },
            { name: 'Taxila', percent: 15, color: '#10b981' }
        ],
        chartData: [25, 28, 30, 33, 35]
    },
    {
        id: 'ayaan-board-exams',
        title: 'Will Ayaan get more than 3 A*s in his AS Level Board exams?',
        icon: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=100&q=80',
        volume: 3200,
        volume24hr: 450,
        liquidity: 5000,
        createdAt: new Date('2026-01-22'),
        endDate: new Date('2026-08-15'),
        category: 'Academics',
        tags: ['New', 'Academics', 'HPS', 'Exams', 'Ayaan'],
        isNew: true,
        options: [
            { name: 'Yes', percent: 65, color: '#10b981' },
            { name: 'No', percent: 35, color: '#ef4444' }
        ],
        chartData: [40, 45, 50, 60, 65]
    }
];

let currentChart = null;
let currentSortMethod = 'newest';
let currentVolumeDisplay = '24hr';

/**
 * Navigation Logic
 */
function showHomepage() {
    document.getElementById('homepage').style.display = 'block';
    document.getElementById('eventpage').style.display = 'none';
    renderMarkets();
}

function showEventPage(marketId) {
    const market = markets.find(m => m.id === marketId);
    if (!market) return;

    document.getElementById('homepage').style.display = 'none';
    document.getElementById('eventpage').style.display = 'block';

    // Update Text Content
    document.getElementById('eventTitle').innerText = market.title;
    document.getElementById('eventIcon').src = market.icon;
    document.getElementById('eventVolume').innerText = formatVolume(market.volume);
    const dateStr = market.endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    document.getElementById('eventDate').innerText = dateStr;

    // Default to first outcome
    currentOutcome = market.options[0].name;
    currentMarket = market;

    // Update Widget Header Dropdown
    const selector = document.getElementById('widgetOutcomeSelector');
    selector.innerHTML = market.options.map(opt =>
        `<option value="${opt.name}">${opt.name}</option>`
    ).join('');
    selector.value = currentOutcome;

    document.getElementById('widgetOutcomeIcon').src = market.icon;

    renderChart(market);

    // Initialize betting interface for this market
    initializeBettingInterface(market);
}

/**
 * Betting Interface Logic
 */
let currentBetAmount = 0;
let currentOutcome = 'Yes';
let currentMarket = null;
let currentTradeMode = 'buy'; // 'buy' or 'sell'

function initializeBettingInterface(market) {
    currentMarket = market;
    const quickButtons = document.querySelectorAll('.q-btn');
    const tradeTabs = document.querySelectorAll('.trade-tab-simple');
    const tradeButton = document.getElementById('tradeButtonMain');
    const outcomeSelector = document.getElementById('widgetOutcomeSelector');

    // Reset State
    currentBetAmount = 0;
    updateBettingDisplay();

    // Outcome selector change
    outcomeSelector.onchange = (e) => {
        currentOutcome = e.target.value;
        updateBettingDisplay();
    };

    // Trade tab switching (Buy/Sell)
    tradeTabs.forEach(tab => {
        tab.onclick = () => {
            tradeTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentTradeMode = tab.dataset.action;
            updateBettingDisplay();
        };
    });

    // Quick amounts
    quickButtons.forEach(btn => {
        btn.onclick = () => {
            if (btn.dataset.mode === 'max') {
                currentBetAmount = 1000; // Simulated Max
            } else {
                currentBetAmount += parseInt(btn.dataset.amount);
            }
            updateBettingDisplay();
        };
    });

    // Trade execution (simulated)
    tradeButton.onclick = () => {
        const actionLabel = currentTradeMode === 'buy' ? 'Buy' : 'Sell';
        alert(`Order Placed: ${actionLabel.toUpperCase()} for ${currentOutcome} at $${currentBetAmount}`);
        currentBetAmount = 0;
        updateBettingDisplay();
    };
}

// Removed old betting logic helpers

function updateBettingDisplay() {
    if (!currentMarket) return;

    const outcomeOption = currentMarket.options.find(opt => opt.name === currentOutcome);
    if (!outcomeOption) return;

    const price = outcomeOption.percent;
    const priceDecimal = price / 100;

    // Calculate returns
    const potentialReturn = currentBetAmount > 0 ? (currentBetAmount / priceDecimal) : 0;

    // Update DOM
    document.getElementById('betAmountDisplay').innerText = currentBetAmount + '.';
    document.getElementById('statAvgPrice').innerText = price.toFixed(1) + '¢';
    document.getElementById('statPotentialReturn').innerText = '$' + potentialReturn.toFixed(2);

    const actionText = currentTradeMode === 'buy' ? 'Buy' : 'Sell';
    document.getElementById('tradeButtonMain').innerText = `${actionText} ${currentOutcome}`;
}


/**
 * Utility Functions
 */
function formatVolume(volume) {
    if (volume >= 1000000) return '$' + (volume / 1000000).toFixed(1) + 'M Vol.';
    if (volume >= 1000) return '$' + (volume / 1000).toFixed(1) + 'k Vol.';
    return '$' + volume + ' Vol.';
}

function calculateCompetitiveness(market) {
    // Calculate how close the top options are (lower is more competitive)
    const sorted = [...market.options].sort((a, b) => b.percent - a.percent);
    if (sorted.length < 2) return 100;
    return sorted[0].percent - sorted[1].percent;
}

function getDaysUntilEnd(market) {
    const now = new Date();
    const diff = market.endDate - now;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

/**
 * Sorting Functions
 */
function sortMarkets(marketsArray, method) {
    const sorted = [...marketsArray];

    switch (method) {
        case 'newest':
            return sorted.sort((a, b) => b.createdAt - a.createdAt);
        case 'trending':
            // Combination of recent volume and activity
            return sorted.sort((a, b) => (b.volume24hr * 2 + b.volume) - (a.volume24hr * 2 + a.volume));
        case 'volume':
            return sorted.sort((a, b) => b.volume - a.volume);
        case 'liquidity':
            return sorted.sort((a, b) => b.liquidity - a.liquidity);
        case 'ending_soon':
            return sorted.sort((a, b) => getDaysUntilEnd(a) - getDaysUntilEnd(b));
        case 'competitive':
            return sorted.sort((a, b) => calculateCompetitiveness(a) - calculateCompetitiveness(b));
        default:
            return sorted;
    }
}

/**
 * Rendering Logic
 */
function renderMarkets(activeFilter = 'All') {
    const grid = document.getElementById('marketGrid');
    grid.innerHTML = '';

    const activeMainCat = document.querySelector('.cat-item.active')?.dataset.cat || 'Trending';

    // Filter markets
    const filtered = markets.filter(m => {
        const query = activeFilter.toLowerCase();

        // If "All" is selected, show all markets (no filtering by sub-category)
        if (activeFilter === 'All') {
            return true;
        }

        // Context-aware HPS filtering
        if (query === 'hps') {
            if (activeMainCat === 'Sports') return m.tags.includes('HPS Sports');
            if (activeMainCat === 'Politics') return m.tags.includes('HPS Politics');
            if (activeMainCat === 'Culture') return m.tags.includes('HPS Culture');
            if (activeMainCat === 'Academics') return m.tags.includes('HPS Academics');
            return m.tags.includes('HPS');
        }

        // Filter by sub-category (tags, category, or title match)
        return m.tags.some(tag => tag.toLowerCase() === query) ||
            m.category.toLowerCase() === query ||
            m.title.toLowerCase().includes(query);
    });

    // Sort markets
    const sorted = sortMarkets(filtered, currentSortMethod);

    // Render markets
    sorted.forEach(m => {
        const card = document.createElement('div');
        card.className = 'market-card animate-in';
        card.onclick = () => showEventPage(m.id);

        // Determine volume to display
        let displayVolume;
        if (currentVolumeDisplay === '24hr') {
            displayVolume = formatVolume(m.volume24hr);
        } else if (currentVolumeDisplay === 'all') {
            displayVolume = formatVolume(m.volume);
        } else { // active
            displayVolume = formatVolume(m.volume24hr + m.volume * 0.1);
        }

        let buttonsHtml = `
            <div class="card-buttons" style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                ${m.options.map((opt, index) => {
            const isLastOdd = (m.options.length % 2 !== 0) && (index === m.options.length - 1);

            // House color mapping
            let houseColor = 'rgba(255,255,255,0.05)'; // Default
            let textColor = 'var(--text-primary)';

            const name = opt.name.toLowerCase();
            if (name.includes('nagarjuna')) {
                houseColor = 'rgba(239, 68, 68, 0.15)'; // Red
                textColor = '#ef4444';
            } else if (name.includes('nalanda')) {
                houseColor = 'rgba(59, 130, 246, 0.15)'; // Blue
                textColor = '#3b82f6';
            } else if (name.includes('vijaynagar')) {
                houseColor = 'rgba(245, 158, 11, 0.15)'; // Yellow
                textColor = '#f59e0b';
            } else if (name.includes('taxila')) {
                houseColor = 'rgba(16, 185, 129, 0.15)'; // Green
                textColor = '#10b981';
            } else if (name === 'yes') {
                houseColor = 'rgba(16, 185, 129, 0.15)'; // Green
                textColor = '#10b981';
            } else if (name === 'no') {
                houseColor = 'rgba(239, 68, 68, 0.15)'; // Red
                textColor = '#ef4444';
            }

            return `
                    <button class="vote-btn" style="background: ${houseColor}; border: 1px solid var(--border-light); color: ${textColor}; margin-bottom: 0; ${isLastOdd ? 'grid-column: span 2;' : ''}">
                        ${opt.name.toUpperCase()}
                    </button>
                `}).join('')}
            </div>
        `;

        card.innerHTML = `
            ${m.isNew ? '<div class="new-badge">NEW</div>' : ''}
            <div class="card-header">
                <img src="${m.icon}" class="card-icon" style="margin: 0 auto;">
                <h3 class="card-title" style="height: 48px; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">${m.title}</h3>
                <div style="font-size: 0.7rem; font-weight: 700; color: var(--accent-blue); text-transform: uppercase; margin-top: 8px; text-align: center; width: 100%;">
                    ${m.tags.includes('HPS Sports') ? 'HPS SPORTS' :
                m.tags.includes('HPS Politics') ? 'HPS POLITICS' :
                    m.tags.includes('HPS Culture') ? 'HPS CULTURE' :
                        m.tags.includes('HPS Academics') ? 'HPS ACADEMICS' : '&nbsp;'}
                </div>
            </div>
            
            <div class="card-options">
                ${m.options.map(opt => `
                    <div class="option-row">
                        <span class="option-name">${opt.name}</span>
                        <span class="option-percent">${opt.percent}%</span>
                    </div>
                `).join('')}
            </div>

            ${buttonsHtml}

            <div class="card-footer" style="margin-top: 16px;">
                <span>${displayVolume}</span>
                <span>🔖</span>
            </div>
        `;
        grid.appendChild(card);
    });
}

function renderChart(market) {
    const ctx = document.getElementById('marketChart').getContext('2d');

    if (currentChart) {
        currentChart.destroy();
    }

    const legend = document.getElementById('chartLegend');
    legend.innerHTML = market.options.map(opt => `
        <div style="display: flex; align-items: center; gap: 8px;">
            <div style="width: 8px; height: 8px; border-radius: 50%; background: ${opt.color}"></div>
            <span style="font-size: 0.85rem; font-weight: 500; color: var(--text-secondary);">${opt.name} <span style="color: var(--text-primary); font-weight: 700;">${opt.percent}%</span></span>
        </div>
    `).join('');

    const historyLength = 40;
    const allHistory = generateBalancedHistory(market.options, historyLength);

    // Generate some dates
    const labels = [];
    const now = new Date();
    for (let i = 0; i < historyLength; i++) {
        const d = new Date(now);
        d.setDate(d.getDate() - (historyLength - i));
        labels.push(d);
    }

    const datasets = market.options.map((opt, index) => ({
        label: opt.name,
        data: allHistory[index],
        borderColor: opt.color,
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 0,
        fill: index === 0,
        backgroundColor: (context) => {
            if (index !== 0) return 'transparent';
            const chart = context.chart;
            const { ctx, chartArea } = chart;
            if (!chartArea) return null;
            const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
            gradient.addColorStop(0, opt.color + '15');
            gradient.addColorStop(1, 'transparent');
            return gradient;
        }
    }));

    currentChart = new Chart(ctx, {
        type: 'line',
        data: { labels, datasets },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index',
            },
            plugins: {
                legend: { display: false },
                tooltip: { enabled: false } // Custom tooltip via plugin
            },
            scales: {
                x: {
                    display: true,
                    grid: { display: false },
                    border: { display: false },
                    ticks: {
                        color: '#5e6773',
                        maxRotation: 0,
                        autoSkip: true,
                        maxTicksLimit: 6,
                        callback: function (value, index) {
                            const date = labels[index];
                            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                            return months[date.getMonth()];
                        }
                    }
                },
                y: {
                    position: 'right',
                    grid: { color: 'rgba(255,255,255,0.03)' },
                    border: { display: false },
                    ticks: {
                        color: '#5e6773',
                        font: { size: 11 },
                        callback: v => v + '%',
                        maxTicksLimit: 5
                    },
                    min: 0,
                    max: 100
                }
            }
        },
        plugins: [{
            id: 'customHover',
            afterDraw: (chart) => {
                const { ctx, chartArea: { top, bottom, left, right }, scales: { x, y } } = chart;
                const activePoint = chart.getActiveElements()[0];

                if (activePoint) {
                    const xPos = activePoint.element.x;
                    const index = activePoint.index;
                    const date = labels[index];

                    // Draw Vertical Line
                    ctx.save();
                    ctx.beginPath();
                    ctx.moveTo(xPos, top);
                    ctx.lineTo(xPos, bottom);
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = '#333a4d';
                    ctx.setLineDash([4, 4]);
                    ctx.stroke();
                    ctx.restore();

                    // Draw Date Label at top
                    const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                    const timeStr = '5:30 pm'; // Simulated time
                    ctx.fillStyle = '#1e2330';
                    const text = `${dateStr} ${timeStr}`;
                    const textWidth = ctx.measureText(text).width;

                    ctx.fillStyle = '#2563eb';
                    ctx.beginPath();
                    ctx.roundRect(xPos - (textWidth + 20) / 2, top - 24, textWidth + 20, 18, 4);
                    ctx.fill();

                    ctx.fillStyle = '#fff';
                    ctx.font = 'bold 10px sans-serif';
                    ctx.textAlign = 'center';
                    ctx.fillText(text, xPos, top - 11);

                    // Draw floating pills for each dataset
                    chart.data.datasets.forEach((dataset, i) => {
                        const val = dataset.data[index];
                        const yPos = y.getPixelForValue(val);
                        const color = dataset.borderColor;
                        const labelText = `${dataset.label} ${val.toFixed(1)}%`;

                        ctx.font = 'bold 11px sans-serif';
                        const labelWidth = ctx.measureText(labelText).width;
                        const pillWidth = labelWidth + 16;
                        const pillHeight = 20;

                        // Pill position: Offset from the line
                        const pillX = xPos < (left + right) / 2 ? xPos + 10 : xPos - pillWidth - 10;

                        ctx.fillStyle = '#1e2330'; // Dark background for pill
                        ctx.beginPath();
                        ctx.roundRect(pillX, yPos - pillHeight / 2, pillWidth, pillHeight, 4);
                        ctx.fill();

                        ctx.strokeStyle = color;
                        ctx.lineWidth = 1.5;
                        ctx.stroke();

                        ctx.fillStyle = '#fff';
                        ctx.textAlign = 'left';
                        ctx.fillText(labelText, pillX + 8, yPos + 4);

                        // Draw Circle on line
                        ctx.beginPath();
                        ctx.arc(xPos, yPos, 4, 0, Math.PI * 2);
                        ctx.fillStyle = color;
                        ctx.fill();
                        ctx.strokeStyle = '#fff';
                        ctx.lineWidth = 2;
                        ctx.stroke();
                    });
                }
            }
        }]
    });
}

function generateBalancedHistory(options, length) {
    const numOptions = options.length;
    const histories = Array.from({ length: numOptions }, () => []);

    // 1. Initial State: Equal distribution (all start at the same point)
    const startVal = 100 / numOptions;

    for (let i = 0; i < numOptions; i++) {
        histories[i][0] = startVal;
    }

    // 2. Intermediate points: Random walk that sums to 100
    for (let t = 1; t < length - 1; t++) {
        let sum = 0;
        const weights = options.map((opt, idx) => {
            // Gradually lean towards the current/target percentage
            const target = opt.percent;
            const progress = t / length;
            const drift = target * progress + startVal * (1 - progress);
            const noise = (Math.random() - 0.5) * 10;
            const weight = Math.max(5, drift + noise);
            sum += weight;
            return weight;
        });

        // Normalize so sum is exactly 100
        weights.forEach((w, idx) => {
            histories[idx][t] = (w / sum) * 100;
        });
    }

    // 3. Final State: Current actual percentages
    options.forEach((opt, idx) => {
        histories[idx][length - 1] = opt.percent;
    });

    return histories;
}

const subCategoryMap = {
    'Trending': ['All', 'HPS', 'Football', 'Cricket', 'Basketball', 'Hockey', 'Tennis', 'Badminton', 'Exams', 'Science Fair'],
    'New': ['All', 'HPS', 'Politics', 'Sports', 'Culture', 'Academics'],
    'Politics': ['All', 'HPS'],
    'Sports': ['All', 'HPS', 'Football', 'Cricket', 'Basketball', 'Hockey', 'Tennis', 'Badminton'],
    'Culture': ['All', 'HPS'],
    'Academics': ['All', 'HPS', 'Exams', 'Science Fair']
};

function updateSubCategories(mainCat) {
    const slider = document.getElementById('subCatSlider');
    const topics = subCategoryMap[mainCat] || ['All'];

    slider.innerHTML = topics.map((topic, i) => `
        <div class="sub-cat-pill ${i === 0 ? 'active' : ''}">${topic}</div>
    `).join('');
}

/**
 * Initialization
 */
document.addEventListener('DOMContentLoaded', () => {
    // Initialize sub-categories for the default "Trending" category
    updateSubCategories('Trending');

    showHomepage();

    // Home Button
    document.getElementById('goHome').onclick = (e) => {
        e.preventDefault();
        showHomepage();
    };

    // Nav Dropdown Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navDropdown = document.getElementById('navDropdown');

    menuToggle.onclick = (e) => {
        e.stopPropagation();
        navDropdown.classList.toggle('show');
    };

    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    darkModeToggle.onclick = (e) => {
        e.stopPropagation();
        document.body.classList.toggle('light-mode');
        // Update Chart if it exists to match colors
        if (currentMarket) renderChart(currentMarket);
    };

    // Close dropdown on outside click
    document.addEventListener('click', (e) => {
        if (!navDropdown.contains(e.target) && e.target !== menuToggle) {
            navDropdown.classList.remove('show');
        }
    });

    // Back Button
    document.getElementById('backBtn').onclick = () => {
        showHomepage();
    };

    // Search Input
    document.getElementById('searchInput').oninput = (e) => {
        renderMarkets(e.target.value);
    };

    // Main Category Toggles
    document.getElementById('mainCategoryBar').onclick = (e) => {
        const item = e.target.closest('.cat-item');
        if (!item) return;

        document.querySelectorAll('.cat-item').forEach(v => v.classList.remove('active'));
        item.classList.add('active');

        const cat = item.dataset.cat;
        updateSubCategories(cat);
        renderMarkets(cat);
    };

    // Sub-category Toggles
    document.getElementById('subCatSlider').onclick = (e) => {
        const pill = e.target.closest('.sub-cat-pill');
        if (!pill) return;

        document.querySelectorAll('.sub-cat-pill').forEach(v => v.classList.remove('active'));
        pill.classList.add('active');

        const cat = pill.innerText;
        renderMarkets(cat);
    };


    // Volume Toggle
    document.querySelectorAll('.volume-option').forEach(option => {
        option.onclick = (e) => {
            document.querySelectorAll('.volume-option').forEach(v => v.classList.remove('active'));
            e.target.classList.add('active');

            currentVolumeDisplay = e.target.dataset.volume;
            renderMarkets(document.querySelector('.sub-cat-pill.active')?.innerText || 'All');
        };
    });
});
