import {
    auth,
    signUp,
    logIn,
    logInWithGoogle,
    logOut,
    getUserData,
    saveUserData
} from "./auth.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

/**
 * Mock Data - Polymarket Style
 */
const houses = [
    { name: 'Red House', color: '#ef4444' },
    { name: 'Blue House', color: '#3b82f6' },
    { name: 'Yellow House', color: '#f59e0b' },
    { name: 'Green House', color: '#10b981' }
];

const sports = [
    { name: 'Football', icon: 'football.png' }, // Football
    { name: 'Cricket', icon: 'cricket-custom.png' }, // Cricket Bat, Ball, Wickets
    { name: 'Basketball', icon: 'basketball.png' }, // Basketball
    { name: 'Hockey', icon: 'hockey2.png' }, // Hockey
    { name: 'Tennis', icon: 'tennis.png' }, // Tennis
    { name: 'Badminton', icon: 'badminton.png' }, // Badminton
    { name: 'Swimming', icon: 'swimming.png' }, // Swimming
    { name: 'Shooting', icon: 'shooting.png' } // Shooting
];

const generatedMarkets = [];

// 1. Generate "Who will win" for each sport
sports.forEach(sport => {
    generatedMarkets.push({
        id: `hps-${sport.name.toLowerCase()}-2026`,
        title: `Who will win the Inter-house ${sport.name} Championship 2026`,
        icon: sport.icon,
        volume: 25000 + Math.floor(Math.random() * 20000),
        volume24hr: 5000 + Math.floor(Math.random() * 5000),
        liquidity: 50000 + Math.floor(Math.random() * 50000),
        createdAt: new Date('2026-01-15'),
        endDate: new Date('2026-06-30'),
        category: 'Sports',
        tags: ['Trending', 'Sports', sport.name],
        isNew: false,
        options: houses.map(h => ({ ...h, percent: 25 })),
        chartData: [20, 25, 30, 25, 25]
    });

    // 2. Generate fixtures for every team combination (6 combinations: 4C2)
    for (let i = 0; i < houses.length; i++) {
        for (let j = i + 1; j < houses.length; j++) {
            const h1 = houses[i];
            const h2 = houses[j];
            generatedMarkets.push({
                id: `fixture-${sport.name.toLowerCase()}-${h1.name.toLowerCase()}-${h2.name.toLowerCase()}`,
                title: `${sport.name}: ${h1.name} vs ${h2.name}`,
                icon: sport.icon,
                volume: 8000 + Math.floor(Math.random() * 10000),
                volume24hr: 1000 + Math.floor(Math.random() * 3000),
                liquidity: 20000 + Math.floor(Math.random() * 20000),
                createdAt: new Date('2026-02-01'),
                endDate: new Date('2026-03-15'),
                category: 'Sports',
                tags: ['Sports', sport.name, 'Fixture'],
                isNew: true,
                options: [
                    { name: h1.name, percent: 52, color: h1.color, pool: 52000 },
                    { name: h2.name, percent: 48, color: h2.color, pool: 48000 }
                ],
                chartData: [45, 48, 50, 51, 52]
            });
        }
    }
});

// Initialize pools for markets without them
function initializePools(marketList) {
    marketList.forEach(m => {
        const totalBaseLiquidity = m.liquidity || 100000;
        m.options.forEach(opt => {
            if (opt.pool === undefined) {
                opt.pool = (opt.percent / 100) * totalBaseLiquidity;
            }
        });
    });
}


const staticMarkets = [
    {
        id: 'hps-sports-day-2026',
        title: 'Who will win Sports Day in HPS in 2026',
        icon: 'sports.png',
        volume: 42000,
        volume24hr: 8500,
        liquidity: 85000,
        createdAt: new Date('2026-01-20'),
        endDate: new Date('2026-03-15'),
        category: 'Sports',
        tags: ['New', 'Trending', 'Sports', 'Athletics'],
        isNew: true,
        options: houses.map(h => ({ ...h, percent: 25 })),
        chartData: [20, 25, 30, 28, 35, 42.5]
    },
    {
        id: 'hps-dance-2026',
        title: 'Who will win the Inter-house Dance competition 2026',
        icon: 'dance.png',
        volume: 12000,
        volume24hr: 2900,
        liquidity: 21000,
        createdAt: new Date('2026-01-22'),
        endDate: new Date('2026-05-20'),
        category: 'Culture',
        tags: ['New', 'Trending', 'Culture'],
        isNew: true,
        options: houses.map(h => ({ ...h, percent: 25 })),
        chartData: [20, 22, 25, 28, 30]
    },
    {
        id: 'hps-science-fair-2026',
        title: 'Who will win the Inter-house Science Fair 2026',
        icon: 'science.png',
        volume: 31000,
        volume24hr: 7200,
        liquidity: 62000,
        createdAt: new Date('2026-01-15'),
        endDate: new Date('2026-04-15'),
        category: 'Academics',
        tags: ['Trending', 'Academics', 'Science Fair'],
        isNew: false,
        options: houses.map(h => ({ ...h, percent: 25 })),
        chartData: [20, 25, 30, 31, 32]
    },
    {
        id: 'hps-boards-2026',
        title: 'Which house will have the highest average in the Grade 10 Board Exams',
        icon: 'brain.png',
        volume: 55000,
        volume24hr: 12000,
        liquidity: 110000,
        createdAt: new Date('2026-01-10'),
        endDate: new Date('2026-05-30'),
        category: 'Academics',
        tags: ['Trending', 'Academics', 'Exams'],
        isNew: false,
        options: houses.map(h => ({ ...h, percent: 25 })),
        chartData: [25, 28, 30, 33, 35]
    },
    // Example Completed Market

    // Example Completed Market

];

const markets = [...generatedMarkets, ...staticMarkets];
initializePools(markets);

let isInitialized = false; // Flag to prevent saving before loading is done

// --- Persistence Helpers ---
async function saveState() {
    localStorage.setItem('spiral_balance', userBalance);
    localStorage.setItem('spiral_positions', JSON.stringify(userPositions));
    localStorage.setItem('spiral_watchlist', JSON.stringify(Array.from(watchList)));
    localStorage.setItem('spiral_resolved_stats', JSON.stringify(resolvedStatistics));

    // Save market pools
    const pools = {};
    markets.forEach(m => {
        pools[m.id] = m.options.map(o => ({ name: o.name, pool: o.pool }));
    });
    localStorage.setItem('spiral_market_pools', JSON.stringify(pools));

    // Sync with Firestore if logged in
    if (auth.currentUser && isInitialized) {
        try {
            await saveUserData(auth.currentUser.uid, {
                balance: userBalance,
                positions: userPositions,
                watchlist: Array.from(watchList)
            });
        } catch (err) {
            console.error("Firestore sync error:", err);
        }
    }
}

async function loadState(uid = null) {
    isInitialized = false; // Block saving during load process

    // Reset state to defaults
    // If we have a UID, the base is 10,000 (starting gift)
    // If not, the base is 0 (guest mode)
    userBalance = uid ? 10000 : 0;

    Object.keys(userPositions).forEach(key => delete userPositions[key]);
    watchList.clear();

    if (uid) {
        // Load from Firestore with retries
        let data = null;
        for (let i = 0; i < 3; i++) {
            data = await getUserData(uid);
            if (data) break;
            await new Promise(r => setTimeout(r, 1000));
        }

        if (data) {
            userBalance = data.balance ?? 10000;
            if (data.positions) Object.assign(userPositions, data.positions);
            if (data.watchlist) data.watchlist.forEach(id => watchList.add(id));

            updateBalanceUI();
            updateHeaderUserUI(data.username, auth.currentUser.email);

            // Clean guest cache to prevent leakage
            localStorage.removeItem('spiral_balance');
            localStorage.removeItem('spiral_positions');
            return;
        }

        // New user or retry failed - use default 10k
        updateBalanceUI();
        return;
    }

    // Guest Mode: Always start at 0
    userBalance = 0;
    updateBalanceUI();
    isInitialized = true;

    // Cleanup local storage once to wipe out old corrupted balances
    localStorage.removeItem('spiral_balance');
    localStorage.removeItem('spiral_positions');
}

function recalculateOdds(market) {
    if (market.isCompleted) return;
    const totalPool = market.options.reduce((sum, opt) => sum + opt.pool, 0);
    market.options.forEach(opt => {
        opt.percent = parseFloat(((opt.pool / totalPool) * 100).toFixed(1));
        if (opt.percent < 1.0) opt.percent = 1.0; // Min price
        if (opt.percent > 99.0) opt.percent = 99.0; // Max price
    });
}

const userPositions = {};
const watchList = new Set();
const resolvedStatistics = {}; // format: { marketId: { net: number, investment: number } }
let userBalance = 0;

// Load state immediately
loadState();

/**
 * Automatically sells positions and pays out user balance for a completed market
 */
function resolveMarket(marketId, winningOutcome) {
    const market = markets.find(m => m.id === marketId);
    if (!market) return;

    market.isCompleted = true;
    market.winningOutcome = winningOutcome;

    // Auto-payout logic: Scan user positions for this market
    let totalPayout = 0;
    let totalInitialCost = 0;
    let payoutCount = 0;

    Object.keys(userPositions).forEach(key => {
        if (key.startsWith(marketId + "_")) {
            const outcomeName = key.split('_')[1];
            const pos = userPositions[key];
            totalInitialCost += pos.shares * pos.avgPrice;

            if (outcomeName === winningOutcome) {
                // Winning share is worth 100 credits
                totalPayout += pos.shares * 100;
                payoutCount++;
            }
            // Losing positions are just cleared
            delete userPositions[key];
        }
    });

    if (totalInitialCost > 0) {
        resolvedStatistics[marketId] = {
            investment: totalInitialCost,
            payout: totalPayout,
            net: totalPayout - totalInitialCost
        };
    }

    if (totalPayout > 0) {
        userBalance += totalPayout;
        updateBalanceUI();
        saveState(); // Persist changes

        // Notification
        setTimeout(() => {
            const notification = document.createElement('div');
            notification.className = 'watchlist-popup';
            notification.style.background = 'var(--accent-green)';
            notification.style.color = 'white';
            notification.innerHTML = `🏆 Market Resolved! Auto-Redeemed ${payoutCount} position(s) for <img src="bucks.png" class="gbucks-logo-inline"> ${totalPayout.toLocaleString()}`;
            document.body.appendChild(notification);
            setTimeout(() => notification.remove(), 5000);
        }, 500);
    }
}

// Markets are live by default
Object.keys(resolvedStatistics).forEach(key => delete resolvedStatistics[key]); // Clear experimental stats
// REMOVED GLOBAL saveState() TO PREVENT LEAKAGE

function updateBalanceUI() {
    const balEl = document.getElementById('userBalanceText');
    if (balEl) balEl.innerText = userBalance.toLocaleString();
}

function updateHeaderUserUI(username, email) {
    const nameEl = document.querySelector('.user-name');
    const handleEl = document.querySelector('.user-handle');
    const authButtons = document.getElementById('authButtons');
    const user = auth.currentUser;

    const displayUsername = username || (user ? user.displayName : null) || "User Account";
    if (nameEl) nameEl.innerText = displayUsername;
    if (handleEl) handleEl.innerText = email ? `@${email.split('@')[0]}` : "@guest";

    if (user) {
        if (authButtons) authButtons.style.display = 'none';
        const avatar = document.querySelector('.user-avatar-small');
        if (avatar) avatar.style.background = getRandomGradient();
    } else {
        if (authButtons) authButtons.style.display = 'flex';
    }
}


let currentChart = null;
let currentSortMethod = 'newest';
let currentVolumeDisplay = '24hr';
let currentChartTimeframe = 'ALL';

/**
 * Leaderboard Mock Data
 */
const leaderboardData = [
    { rank: 1, name: 'Aryansh', profit: 32000, volume: 85000, joined: 'May 2024', positions: '12k' },
    { rank: 2, name: 'Raajveer', profit: 28500, volume: 72000, joined: 'Aug 2025', positions: '9k' },
    { rank: 3, name: 'Advaith', profit: 24000, volume: 65000, joined: 'Dec 2024', positions: '8k' },
    { rank: 4, name: 'Anirudh', profit: 18500, volume: 54000, joined: 'Jan 2025', positions: '5k' },
    { rank: 5, name: 'Reyan', profit: 15200, volume: 42000, joined: 'Feb 2025', positions: '4k' },
    { rank: 6, name: 'Maroof', profit: 12500, volume: 38000, joined: 'Mar 2025', positions: '3.5k' },
    { rank: 7, name: 'Adhya', profit: 9500, volume: 25000, joined: 'Apr 2025', positions: '2k' }
];

const bigWinsData = [
    { rank: 1, user: 'Raajveer', market: 'Inter-house Football...', marketId: 'hps-football-2026', prevPayout: 12000, currPayout: 25000 },
    { rank: 2, user: 'Anirudh', market: 'Inter-house Cricket...', marketId: 'hps-cricket-2026', prevPayout: 8000, currPayout: 18500 },
    { rank: 3, user: 'Adhya', market: 'HPS Sports Day 2026', marketId: 'hps-sports-day-2026', prevPayout: 5000, currPayout: 12000 },
    { rank: 4, user: 'Aryansh', market: 'Inter-house Dance...', marketId: 'hps-dance-2026', prevPayout: 15000, currPayout: 32000 },
    { rank: 5, user: 'Maroof', market: 'Next Vice-Principal...', marketId: 'vice-principal-hps', prevPayout: 3000, currPayout: 9500 }
];

/**
 * Navigation Logic
 */
function showHomepage() {
    document.getElementById('homepage').style.display = 'block';
    document.getElementById('eventpage').style.display = 'none';
    document.getElementById('leaderboardpage').style.display = 'none';
    document.getElementById('completedEventsPage').style.display = 'none';

    // Default back to 24hr or keep current if valid
    if (currentVolumeDisplay === 'watchlist' && watchList.size === 0) {
        currentVolumeDisplay = '24hr';
        document.querySelectorAll('.volume-option').forEach(v => v.classList.remove('active'));
        document.querySelector('[data-volume="24hr"]').classList.add('active');
    }


    renderMarkets();
}

function showEventPage(marketId) {
    const market = markets.find(m => m.id === marketId);
    if (!market) return;

    document.getElementById('homepage').style.display = 'none';
    document.getElementById('eventpage').style.display = 'block';
    document.getElementById('leaderboardpage').style.display = 'none';
    document.getElementById('completedEventsPage').style.display = 'none';

    // Update Text Content
    document.getElementById('eventTitle').innerText = market.title;
    document.getElementById('eventIcon').src = market.icon;
    document.getElementById('eventVolume').innerHTML = formatVolume(market.volume);
    const dateStr = market.endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    document.getElementById('eventDate').innerText = dateStr;

    currentOutcome = market.options[0].name;
    currentMarket = market;

    // --- Update Icons on Event Page ---
    const watchIcon = document.getElementById('eventWatchlistIcon');

    // Watchlist State
    const updateWatchIcon = () => {
        const isWatched = watchList.has(market.id);
        watchIcon.classList.toggle('active', isWatched);
        watchIcon.setAttribute('data-tooltip', isWatched ? 'Remove from Watch List' : 'Add to Watch List');
    };
    updateWatchIcon();

    watchIcon.onclick = (e) => {
        const added = toggleWatchList(e, market.id);
        if (added) {
            // Simple notification
            const notification = document.createElement('div');
            notification.className = 'watchlist-popup';
            notification.innerText = 'Added to watchlist';
            document.body.appendChild(notification);
            setTimeout(() => notification.remove(), 2000);
        }
        updateWatchIcon(); // Refresh local state
    };

    renderChart(market);

    // Initialize betting interface for this market
    // Initialize betting interface or show outcome
    const hasPosition = Object.keys(userPositions).some(key => key.startsWith(market.id + "_") && userPositions[key].shares > 0.001);

    if (market.isCompleted) {
        if (hasPosition) {
            // Set prices to terminal values (100 for winner, 0 for others) for selling/redeeming
            market.options.forEach(opt => {
                opt.percent = (opt.name === market.winningOutcome) ? 100 : 1; // using 1 instead of 0 to avoid div by zero in some potential logic
            });

            currentTradeMode = 'sell';
            initializeBettingInterface(market);

            // Force sell mode visuals
            const tabs = document.querySelectorAll('.trade-tab-simple');
            tabs.forEach(t => {
                t.classList.remove('active');
                if (t.dataset.action === 'sell') t.classList.add('active');
            });
            const amountLabel = document.querySelector('.amount-label');
            if (amountLabel) amountLabel.innerText = 'Estimated Proceeds';
        } else {
            showOutcomeWidget(market);
        }
    } else {
        // Reset trading mode to buy
        currentTradeMode = 'buy';
        const amountLabel = document.querySelector('.amount-label');
        const amountIcon = document.querySelector('.amount-display-input-wrapper img');
        if (amountLabel) amountLabel.innerText = 'Amount (Credits)';
        if (amountIcon) amountIcon.src = 'bucks.png';
        const tabs = document.querySelectorAll('.trade-tab-simple');
        tabs.forEach(t => {
            t.classList.remove('active');
            if (t.dataset.action === 'buy') t.classList.add('active');
        });

        initializeBettingInterface(market);
    }
}

function showOutcomeWidget(market) {
    const tradeWidget = document.querySelector('.trade-widget');
    tradeWidget.innerHTML = `
        <div class="outcome-display-container">
            <div class="outcome-icon-large">🏆</div>
            <div class="outcome-label">Market Resolved</div>
            <div class="outcome-value">${market.winningOutcome}</div>
            <div class="outcome-subtext">won this event</div>
        </div>
    `;
}

function showLeaderboardPage() {
    document.getElementById('homepage').style.display = 'none';
    document.getElementById('eventpage').style.display = 'none';
    document.getElementById('leaderboardpage').style.display = 'block';
    document.getElementById('completedEventsPage').style.display = 'none';

    renderLeaderboard();
}

function showCompletedEventsPage() {
    document.getElementById('homepage').style.display = 'none';
    document.getElementById('eventpage').style.display = 'none';
    document.getElementById('leaderboardpage').style.display = 'none';
    document.getElementById('completedEventsPage').style.display = 'block';

    renderCompletedEvents();
}

function renderLeaderboard() {
    const tableBody = document.getElementById('lbTableBody');
    const bigWinsList = document.getElementById('bigWinsList');

    // Render Table Rows
    tableBody.innerHTML = leaderboardData.map(u => `
        <tr>
            <td class="lb-col-rank">${u.rank}</td>
            <td class="lb-col-user">
                <div class="lb-user-row" data-user-name="${u.name}">
                    <div class="lb-avatar" style="background: ${getRandomGradient()}"></div>
                    <span class="lb-name">${u.name}</span>
                </div>
            </td>
            <td class="lb-col-profit ${u.profit >= 0 ? 'profit-plus' : 'profit-minus'}">
                ${u.profit >= 0 ? '+' : ''}<img src="bucks.png" class="gbucks-logo-inline"> ${Math.abs(u.profit).toLocaleString()}
            </td>
            <td class="lb-col-volume"><img src="bucks.png" class="gbucks-logo-inline"> ${u.volume.toLocaleString()}</td>
        </tr>
    `).join('');

    // Render Big Wins
    bigWinsList.innerHTML = bigWinsData.map(w => `
        <div class="win-item" onclick="showEventPage('${w.marketId}')" style="cursor: pointer;">
            <div class="win-rank">${w.rank}</div>
            <div class="win-avatar" style="background: ${getRandomGradient()}"></div>
            <div class="win-details">
                <div class="win-user">${w.user}</div>
                <div class="win-market">${w.market}</div>
                <div class="win-stats">
                    <span class="win-prev"><img src="bucks.png" class="gbucks-logo-inline"> ${w.prevPayout.toLocaleString()}</span>
                    <span class="dropdown-chevron" style="transform: rotate(-90deg); font-size: 0.6rem;">⌵</span>
                    <span class="win-curr"><img src="bucks.png" class="gbucks-logo-inline"> ${w.currPayout.toLocaleString()}</span>
                </div>
            </div>
        </div>
    `).join('');

    // Add Hover Listeners for Profile Popup
    const popup = document.getElementById('lbProfilePopup');
    document.querySelectorAll('.lb-user-row').forEach(row => {
        row.onmouseenter = (e) => {
            const userName = row.dataset.userName;
            const userData = leaderboardData.find(u => u.name === userName);

            if (userData) {
                document.getElementById('ppName').innerText = userData.name;
                document.getElementById('ppJoined').innerText = `Joined ${userData.joined}`;
                document.getElementById('ppPositions').innerText = userData.positions;
                document.getElementById('ppProfit').innerHTML = `<img src="bucks.png" class="gbucks-logo-inline"> ${userData.profit.toLocaleString()}`;
                document.getElementById('ppVolume').innerHTML = `<img src="bucks.png" class="gbucks-logo-inline"> ${userData.volume.toLocaleString()}`;

                // Position popup
                const rect = row.getBoundingClientRect();
                popup.style.display = 'block';
                popup.style.left = `${rect.left + 40}px`;
                popup.style.top = `${rect.top - 160}px`;
            }
        };

        row.onmouseleave = () => {
            popup.style.display = 'none';
        };
    });
}

function getRandomGradient() {
    const colors = ['#a855f7', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#ec4899'];
    const c1 = colors[Math.floor(Math.random() * colors.length)];
    const c2 = colors[Math.floor(Math.random() * colors.length)];
    return `linear-gradient(135deg, ${c1}, ${c2})`;
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

    // Restore the trade widget HTML structure if it was replaced by outcome widget
    const tradeWidget = document.querySelector('.trade-widget');
    tradeWidget.innerHTML = `
        <div class="widget-outcome-header">
            <img src="${market.icon}" alt="" id="widgetOutcomeIcon" class="widget-outcome-icon">
            <div class="outcome-select-wrapper">
                <select id="widgetOutcomeSelector" class="widget-outcome-name-dropdown">
                     ${market.options.map(opt => `<option value="${opt.name}">${opt.name}</option>`).join('')}
                </select>
                <span class="dropdown-chevron">⌵</span>
            </div>
        </div>

        <div class="widget-tabs-row">
            <div class="trade-tabs-simple">
                <div class="trade-tab-simple active" data-action="buy">Buy</div>
                <div class="trade-tab-simple" data-action="sell">Sell</div>
            </div>
            <div class="order-type-simple">
                Market ⌵
            </div>
        </div>

        <div class="amount-container">
            <span class="amount-label">Amount</span>
            <div class="amount-display-input-wrapper">
                <img src="bucks.png" class="gbucks-icon" style="width: 24px; height: 24px;">
                <input type="number" id="betAmountInput" class="bet-amount-input" value="0" min="0" step="1">
            </div>
        </div>

        <div class="quick-btns-row">
            <div class="quick-plus-grid" id="quickAmountContainer">
                <!-- Buttons injected via JS based on mode -->
            </div>
        </div>

        <button class="trade-button-main" id="tradeButtonMain">
            Trade
        </button>

        <!-- To Win Section (Polymarket Style) -->
        <div class="to-win-container">
            <div class="to-win-header">
                <span class="to-win-label">To win 💸</span>
                <span id="statPotentialReturn" class="to-win-amount">$0.00</span>
            </div>
            <div class="avg-price-subtext">
                Avg. Price <span id="statAvgPrice">0¢</span> <span class="info-icon">ⓘ</span>
            </div>
        </div>

        <p style="margin-top: 24px; font-size: 0.75rem; color: var(--text-muted); text-align: center;">
            By trading, you agree to the <a href="#" style="color: var(--text-muted)">Terms of Use</a>.
        </p>
    `;

    // Re-attach listeners
    const quickButtons = document.querySelectorAll('.q-btn');
    const tradeTabs = document.querySelectorAll('.trade-tab-simple');
    const tradeButton = document.getElementById('tradeButtonMain');
    const outcomeSelector = document.getElementById('widgetOutcomeSelector');

    currentOutcome = market.options[0].name;
    currentBetAmount = 0;
    updateBettingDisplay();

    outcomeSelector.onchange = (e) => {
        currentOutcome = e.target.value;
        renderQuickButtons(); // Must refresh % buttons for the new outcome's position
        updateBettingDisplay();
    };

    tradeTabs.forEach(tab => {
        tab.onclick = () => {
            tradeTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentTradeMode = tab.dataset.action;
            currentBetAmount = 0; // Reset amount when switching modes

            // Update label based on mode
            const amountLabel = document.querySelector('.amount-label');
            const amountIcon = document.querySelector('.amount-display-input-wrapper img');
            if (currentTradeMode === 'buy') {
                amountLabel.innerText = 'Amount (Credits)';
                amountIcon.src = 'bucks.png';
            } else {
                amountLabel.innerText = 'Estimated Proceeds';
                amountIcon.src = 'bucks.png';
            }

            renderQuickButtons();
            updateBettingDisplay();
        };
    });

    function renderQuickButtons() {
        const container = document.getElementById('quickAmountContainer');
        if (!container) return;

        if (currentTradeMode === 'buy') {
            container.innerHTML = `
                <button class="q-btn" data-amount="1">+1</button>
                <button class="q-btn" data-amount="10">+10</button>
                <button class="q-btn" data-amount="100">+100</button>
                <button class="q-btn" data-amount="1000">+1,000</button>
            `;
        } else {
            container.innerHTML = `
                <button class="q-btn" data-percent="25">25%</button>
                <button class="q-btn" data-percent="50">50%</button>
                <button class="q-btn" data-percent="100">Max</button>
            `;
        }

        // Re-attach listeners to new buttons
        container.querySelectorAll('.q-btn').forEach(btn => {
            btn.onclick = () => {
                const posKey = `${currentMarket.id}_${currentOutcome}`;
                const currentPosition = userPositions[posKey];
                const sharesOwned = currentPosition ? currentPosition.shares : 0;
                const outcomeOption = currentMarket.options.find(opt => opt.name === currentOutcome);
                const pricePerShare = outcomeOption ? outcomeOption.percent : 0;

                if (btn.dataset.amount) {
                    currentBetAmount += parseInt(btn.dataset.amount);
                } else if (btn.dataset.percent) {
                    const percent = parseInt(btn.dataset.percent);
                    // Amount in Sell mode is now Credits (Value), not Shares
                    currentBetAmount = Math.floor((sharesOwned * (percent / 100)) * pricePerShare);
                }

                if (currentBetAmount < 0) currentBetAmount = 0;
                updateBettingDisplay(true);
            };
        });
    }

    renderQuickButtons();

    const betInput = document.getElementById('betAmountInput');

    betInput.oninput = (e) => {
        let val = parseFloat(e.target.value) || 0;
        if (val < 0) val = 0;
        currentBetAmount = val;
        updateBettingDisplay(false); // Update stats but don't re-sync input
    };

    // Unified click helper removed, now handled inside renderQuickButtons

    tradeButton.onclick = () => {
        const amount = currentBetAmount;
        const outcomeOption = currentMarket.options.find(opt => opt.name === currentOutcome);
        const priceDecimal = outcomeOption.percent / 100;
        const posKey = `${currentMarket.id}_${currentOutcome}`;

        if (currentTradeMode === 'buy') {
            if (amount <= 0) {
                alert("Please enter an amount to trade.");
                return;
            }
            if (amount > userBalance) {
                alert("Insufficient balance!");
                return;
            }

            const pricePerShare = outcomeOption.percent;
            const sharesBought = amount / pricePerShare;
            userBalance -= amount;

            // Shift odds based on bet value
            outcomeOption.pool += amount;
            recalculateOdds(currentMarket);

            if (!userPositions[posKey]) {
                userPositions[posKey] = { shares: sharesBought, avgPrice: pricePerShare };
            } else {
                const totalCost = (userPositions[posKey].shares * userPositions[posKey].avgPrice) + amount;
                userPositions[posKey].shares += sharesBought;
                userPositions[posKey].avgPrice = totalCost / userPositions[posKey].shares;
            }
            userPositions[posKey].shares = parseFloat(userPositions[posKey].shares.toFixed(2));

            updateBalanceUI();
            saveState(); // Persist changes

            // Notify
            const notification = document.createElement('div');
            notification.className = 'watchlist-popup';
            notification.style.background = 'var(--accent-blue)';
            notification.innerHTML = `Transaction Successful: Bought ${sharesBought.toFixed(2)} shares of ${currentOutcome}`;
            document.body.appendChild(notification);
            setTimeout(() => notification.remove(), 3000);

            currentBetAmount = 0;
            updateBettingDisplay(true);
            if (currentVolumeDisplay === 'active') renderMarkets();

        } else {
            // Sell logic
            const currentPosition = userPositions[posKey];
            if (!currentPosition || currentPosition.shares <= 0) {
                alert(`You don't own any shares of ${currentOutcome}!`);
                return;
            }

            const pricePerShare = outcomeOption.percent;
            // amount is now Credits (Proceeds)
            const sharesToSell = amount / pricePerShare;

            // If the market is completed, check if it's the winner
            if (currentMarket.isCompleted && currentOutcome !== currentMarket.winningOutcome) {
                alert("This outcome lost. Shares are worthless.");
                return;
            }

            if (sharesToSell > currentPosition.shares + 0.01) {
                alert(`Insufficient shares! You only own ${currentPosition.shares.toLocaleString()} shares (Value: ${(currentPosition.shares * pricePerShare).toLocaleString()}).`);
                return;
            }

            const saleProceeds = amount;
            userBalance += saleProceeds;
            currentPosition.shares -= sharesToSell;

            // Shift odds back
            outcomeOption.pool -= amount;
            if (outcomeOption.pool < 1000) outcomeOption.pool = 1000; // Floor liquidity
            recalculateOdds(currentMarket);

            if (currentPosition.shares <= 0.001) {
                delete userPositions[posKey];
            } else {
                currentPosition.shares = parseFloat(currentPosition.shares.toFixed(2));
            }

            updateBalanceUI();
            saveState(); // Persist changes

            const notification = document.createElement('div');
            notification.className = 'watchlist-popup';
            notification.style.background = 'var(--accent-green)';
            notification.innerHTML = `Sold ${sharesToSell.toLocaleString()} shares for <img src="bucks.png" class="gbucks-logo-inline"> ${saleProceeds.toLocaleString()}`;
            document.body.appendChild(notification);
            setTimeout(() => notification.remove(), 3000);

            currentBetAmount = 0;
            updateBettingDisplay(true);
            if (currentVolumeDisplay === 'active') renderMarkets();
        }
    };
}

function updateBettingDisplay(syncInput = true) {
    if (!currentMarket) return;

    const outcomeOption = currentMarket.options.find(opt => opt.name === currentOutcome);
    if (!outcomeOption) return;

    const price = outcomeOption.percent;
    const priceDecimal = price / 100;

    // Calculate returns
    const potentialReturn = currentBetAmount > 0 ? (currentBetAmount / priceDecimal) : 0;
    const posKey = `${currentMarket.id}_${currentOutcome}`;
    const currentPosition = userPositions[posKey];

    // Update DOM
    if (syncInput) {
        const input = document.getElementById('betAmountInput');
        if (input) input.value = currentBetAmount;
    }

    // Format Avg Price (e.g. 19¢ or 19.5¢)
    document.getElementById('statAvgPrice').innerText = price.toFixed(1) + '¢';

    // Always keep the "To win" label consistent as requested
    document.querySelector('.to-win-label').innerHTML = 'To win 💸';

    if (currentTradeMode === 'buy') {
        // Potential return is Amount / (Price/100)
        document.getElementById('statPotentialReturn').innerText = '$' + potentialReturn.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

        const actionText = currentPosition ? 'Add more to your position' : `Buy ${currentOutcome}`;
        document.getElementById('tradeButtonMain').innerText = actionText;
    } else {
        const pricePerShare = outcomeOption.percent;
        const netShares = currentBetAmount / pricePerShare; // amount is Credits, so shares = Value / Price

        // "To win" for these shares is simply their number (since each winning share = $1.00)
        const potentialWinOfShares = netShares * 1.00;

        document.getElementById('statPotentialReturn').innerText = '$' + potentialWinOfShares.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

        document.getElementById('tradeButtonMain').innerText = `Sell ${currentOutcome}`;
    }
}


/**
 * Utility Functions
 */
function formatVolume(volume) {
    const logo = '<img src="bucks.png" class="gbucks-logo-inline">';
    if (volume >= 1000000) return logo + ' ' + (volume / 1000000).toFixed(1) + 'M Vol.';
    if (volume >= 1000) return logo + ' ' + (volume / 1000).toFixed(1) + 'k Vol.';
    return logo + ' ' + volume + ' Vol.';
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

function toggleWatchList(e, marketId) {
    if (e) e.stopPropagation();
    let added = false;
    if (watchList.has(marketId)) {
        watchList.delete(marketId);
    } else {
        watchList.add(marketId);
        added = true;
    }
    saveState(); // Persist watchlist
    renderMarkets(document.querySelector('.sub-cat-pill.active')?.innerText || 'All');
    return added;
}

/**
 * Rendering Logic
 */
function renderMarkets(activeFilter = 'All') {
    const grid = document.getElementById('marketGrid');
    grid.innerHTML = '';

    const activeMainCat = document.querySelector('.cat-item.active')?.dataset.cat || 'Trending';
    const searchQuery = document.getElementById('searchInput').value.toLowerCase();
    const query = activeFilter.toLowerCase();

    // Filter markets
    const filtered = markets.filter(m => {
        // Exclude completed events from main feed (unless it's the Active view and user has a position)
        if (m.isCompleted && currentVolumeDisplay !== 'active') return false;

        // --- Volume Toggle Filters ---
        if (currentVolumeDisplay === 'active') {
            return Object.keys(userPositions).some(key => {
                return key.startsWith(m.id + "_") && userPositions[key].shares > 0.001;
            });
        }
        if (currentVolumeDisplay === 'watchlist') {
            return watchList.has(m.id);
        }

        // --- Global Search Logic ---
        if (searchQuery.length > 0) {
            return m.title.toLowerCase().includes(searchQuery) ||
                m.category.toLowerCase().includes(searchQuery) ||
                m.tags.some(tag => tag.toLowerCase().includes(searchQuery)) ||
                m.options.some(opt => opt.name.toLowerCase().includes(searchQuery));
        }

        // --- Category Navigation Logic (only if NOT searching) ---
        // 1. Must match main category
        let matchesMain = false;
        if (activeMainCat === 'Trending') {
            matchesMain = m.tags.includes('Trending');
        } else if (activeMainCat === 'New') {
            matchesMain = m.isNew;
        } else {
            matchesMain = m.category === activeMainCat;
        }

        if (!matchesMain) return false;

        // 2. Must match sub-category filter
        if (activeFilter === 'All') {
            return true;
        }

        // Sub-category matching
        return m.tags.some(tag => tag.toLowerCase() === query) ||
            m.category.toLowerCase() === query ||
            m.title.toLowerCase().includes(query);
    });

    // Sort markets based on volume toggle or default method
    let sorted;
    if (currentVolumeDisplay === '24hr') {
        sorted = [...filtered].sort((a, b) => b.volume24hr - a.volume24hr);
    } else if (currentVolumeDisplay === 'all') {
        sorted = [...filtered].sort((a, b) => b.createdAt - a.createdAt);
    } else {
        sorted = sortMarkets(filtered, currentSortMethod);
    }

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
        } else if (currentVolumeDisplay === 'active') {
            let totalValue = 0;
            m.options.forEach(opt => {
                const pos = userPositions[`${m.id}_${opt.name}`];
                if (pos) totalValue += pos.shares * opt.percent;
            });
            displayVolume = `<span style="color: var(--accent-green); font-weight: 700;">Portfolio Value: <img src="bucks.png" class="gbucks-logo-inline"> ${totalValue.toLocaleString()}</span>`;
        } else { // watchlist
            displayVolume = formatVolume(m.volume24hr + m.volume * 0.1);
        }

        const volumeText = currentVolumeDisplay === 'active' ? displayVolume : `${displayVolume} Vol.`;

        card.innerHTML = `
            <div class="card-header">
                <img src="${m.icon}" class="card-icon">
                <h3 class="card-title">${m.title}</h3>
            </div>
            
            <div class="card-options">
                ${m.options.map(opt => {
            const name = opt.name.toLowerCase();
            let houseColor = 'rgba(255, 255, 255, 0.1)';
            let textColor = '#fff';

            if (name.includes('yellow house')) {
                houseColor = 'rgba(245, 158, 11, 0.15)';
                textColor = '#f59e0b';
            } else if (name.includes('green house')) {
                houseColor = 'rgba(16, 185, 129, 0.15)';
                textColor = '#10b981';
            } else if (name.includes('blue house')) {
                houseColor = 'rgba(59, 130, 246, 0.15)';
                textColor = '#3b82f6';
            } else if (name.includes('red house')) {
                houseColor = 'rgba(239, 68, 68, 0.15)';
                textColor = '#ef4444';
            } else if (name === 'yes') {
                houseColor = 'rgba(16, 185, 129, 0.15)';
                textColor = '#10b981';
            } else if (name === 'no') {
                houseColor = 'rgba(239, 68, 68, 0.15)';
                textColor = '#ef4444';
            }

            const posKey = `${m.id}_${opt.name}`;
            const hasPosition = !!userPositions[posKey] && userPositions[posKey].shares > 0.001;

            // If we are in 'Active' view, skip options the user doesn't own
            if (currentVolumeDisplay === 'active' && !hasPosition) return '';

            const highlightStyle = hasPosition && currentVolumeDisplay !== 'active' ? `border: 1px solid ${textColor}; background: ${houseColor}; box-shadow: 0 0 10px ${houseColor};` : '';
            const positionInfo = hasPosition ? `<span style="font-size: 0.75rem; color: var(--accent-green); display: block;">Owned: ${userPositions[posKey].shares} shares</span>` : '';

            return `
                    <div class="option-row" style="${highlightStyle} border-radius: 8px; padding: 4px 8px; margin: 2px -8px;">
                        <div style="flex: 1;">
                            <span class="option-name">${opt.name}</span>
                            ${positionInfo}
                        </div>
                        <div class="option-right">
                            <button class="vote-btn-p" style="background: ${houseColor}; color: ${textColor};" onclick="event.stopPropagation(); showEventPage('${m.id}');">
                                ${opt.percent}%
                            </button>
                        </div>
                    </div>
                `;
        }).join('')}
            </div>

            <div class="card-footer">
                <div class="footer-volume">${volumeText}</div>
                <div class="footer-actions">
                    <span class="footer-icon" data-tooltip="G 100 bet: G ${(100 / (m.options[0].percent / 100)).toFixed(0)} Potential Return">🎁</span>
                    <span class="footer-icon ${watchList.has(m.id) ? 'active' : ''}" 
                          data-tooltip="${watchList.has(m.id) ? 'Remove from Watch List' : 'Add to Watch List'}"
                          onclick="toggleWatchList(event, '${m.id}')">🔖</span>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function renderCompletedEvents() {
    const grid = document.getElementById('completedEventsGrid');
    grid.innerHTML = '';

    const completedMarkets = markets.filter(m => m.isCompleted);

    if (completedMarkets.length === 0) {
        grid.innerHTML = '<p style="color: var(--text-secondary); grid-column: 1/-1; text-align: center;">No completed events yet.</p>';
        return;
    }

    completedMarkets.forEach(m => {
        const card = document.createElement('div');
        card.className = 'market-card animate-in';
        card.onclick = () => showEventPage(m.id);

        let winnerColor = '#10b981'; // Default green
        // Find winner color if possible
        const winnerOpt = m.options.find(o => o.name === m.winningOutcome);
        if (winnerOpt) winnerColor = winnerOpt.color || winnerColor;

        let statHtml = '';
        const stats = resolvedStatistics[m.id];
        if (stats) {
            const isLoss = stats.net < 0;
            const color = isLoss ? 'var(--accent-red)' : 'var(--accent-green)';
            const sign = isLoss ? '-' : '+';
            const label = isLoss ? 'Total Loss' : 'Total Profit';

            statHtml = `
                <div style="margin-top: 12px; padding: 12px; border-radius: 12px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05);">
                    <div style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">${label}</div>
                    <div style="font-size: 1.25rem; font-weight: 800; color: ${color};">
                         <img src="bucks.png" class="gbucks-logo-inline" style="width: 20px; height: 20px;"> ${sign}${Math.abs(stats.net).toLocaleString()}
                    </div>
                    <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 4px;">Investment: ${stats.investment.toLocaleString()}</div>
                </div>
            `;
        }

        card.innerHTML = `
            <div class="card-header">
                <img src="${m.icon}" class="card-icon">
                <h3 class="card-title">${m.title}</h3>
            </div>
            
            <div class="outcome-display-container" style="padding: 16px; min-height: 180px; justify-content: center; background: transparent; border: none;">
                <div style="font-size: 2rem; margin-bottom: 8px;">🏆</div>
                <div class="outcome-label" style="font-size: 0.8rem;">Winner</div>
                <div class="outcome-value" style="font-size: 1.5rem; background: ${winnerColor}; -webkit-background-clip: text; -webkit-text-fill-color: transparent;">${m.winningOutcome}</div>
                ${statHtml}
            </div>
            
            <div class="card-footer">
               <div class="vol-stats" style="flex:1; text-align:center; color: var(--text-secondary);">
                    <span>Ended ${m.endDate.toLocaleDateString()}</span>
               </div>
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
    const allHistory = generateBalancedHistory(market.options, historyLength, market);

    // Generate labels and data based on timeframe
    const labels = [];
    const now = new Date();

    for (let i = 0; i < historyLength; i++) {
        const d = new Date(now);
        if (currentChartTimeframe === '5m') {
            d.setSeconds(d.getSeconds() - (historyLength - i) * 7.5); // 5 mins total
        } else if (currentChartTimeframe === '4h') {
            d.setMinutes(d.getMinutes() - (historyLength - i) * 6); // 4 hours total
        } else if (currentChartTimeframe === '1d') {
            d.setMinutes(d.getMinutes() - (historyLength - i) * 36); // 24 hours total
        } else if (currentChartTimeframe === '3d') {
            d.setMinutes(d.getMinutes() - (historyLength - i) * 108); // 3 days total
        } else if (currentChartTimeframe === '1w') {
            d.setHours(d.getHours() - (historyLength - i) * 4.2); // 1 week total
        } else if (currentChartTimeframe === '1m') {
            d.setHours(d.getHours() - (historyLength - i) * 18); // 1 month total
        } else {
            d.setDate(d.getDate() - (historyLength - i)); // Default "ALL" (40 days)
        }
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
                        color: getComputedStyle(document.documentElement).getPropertyValue('--chart-ticks').trim(),
                        maxRotation: 0,
                        autoSkip: true,
                        maxTicksLimit: 6,
                        callback: function (value, index) {
                            const date = labels[index];
                            if (['5m', '4h', '1d'].includes(currentChartTimeframe)) {
                                return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                            }
                            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                            return months[date.getMonth()] + ' ' + date.getDate();
                        }
                    }
                },
                y: {
                    position: 'right',
                    grid: { color: getComputedStyle(document.documentElement).getPropertyValue('--chart-grid').trim() },
                    border: { display: false },
                    ticks: {
                        color: getComputedStyle(document.documentElement).getPropertyValue('--chart-ticks').trim(),
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

function generateBalancedHistory(options, length, market) {
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

    // 3. Final State: Current actual percentages OR Completed State
    options.forEach((opt, idx) => {
        if (market.isCompleted) {
            // Force winner to 100, others to 0
            const isWinner = opt.name === market.winningOutcome;
            histories[idx][length - 1] = isWinner ? 100 : 0;
            // Smooth transition to final for the last few points
            for (let k = 1; k <= 5; k++) {
                histories[idx][length - 1 - k] = isWinner ? (100 - k * 2) : (0 + k * 2);
            }
        } else {
            histories[idx][length - 1] = opt.percent;
        }
    });

    return histories;
}

const subCategoryMap = {
    'Trending': ['All', 'Sports', 'Academics', 'Science Fair'],
    'New': ['All', 'Politics', 'Sports', 'Culture', 'Academics'],
    'Politics': ['All'],
    'Sports': ['All', 'Football', 'Cricket', 'Basketball', 'Hockey', 'Tennis', 'Badminton', 'Swimming', 'Shooting'],
    'Culture': ['All'],
    'Academics': ['All', 'Exams', 'Science Fair']
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

    // Leaderboard Navigation
    document.getElementById('leaderboardBtn').onclick = (e) => {
        e.preventDefault();
        showLeaderboardPage();
        navDropdown.classList.remove('show');
    };

    // Completed Events Navigation
    const completedEventsBtn = document.getElementById('completedEventsBtn');
    if (completedEventsBtn) {
        completedEventsBtn.onclick = (e) => {
            e.preventDefault();
            showCompletedEventsPage();
            navDropdown.classList.remove('show');
        };
    }

    // Leaderboard Back Button
    document.querySelector('.lb-back-btn').onclick = () => showHomepage();

    // Completed Events Back Button
    const ceBackBtn = document.getElementById('completedEventsBackBtn');
    if (ceBackBtn) ceBackBtn.onclick = () => showHomepage();

    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    darkModeToggle.onclick = (e) => {
        e.stopPropagation();
        document.body.classList.toggle('light-mode');

        // Redraw chart if visible to update theme colors
        if (currentMarket && document.getElementById('marketChart')) {
            renderChart(currentMarket);
        }
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

        document.getElementById('searchInput').value = '';
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

        document.getElementById('searchInput').value = '';
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

    // --- NEW: Modal Logic ---
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    const hiwFlow = document.getElementById('hiwFlow');
    const authFlow = document.getElementById('authFlow');
    const termsFlow = document.getElementById('termsFlow');
    const supportFlow = document.getElementById('supportFlow');

    const openModal = (type, mode = 'login') => {
        modalOverlay.classList.add('show');
        hiwFlow.style.display = type === 'hiw' ? 'block' : 'none';
        authFlow.style.display = type === 'auth' ? 'block' : 'none';
        if (termsFlow) termsFlow.style.display = type === 'terms' ? 'block' : 'none';
        if (supportFlow) supportFlow.style.display = type === 'support' ? 'block' : 'none';

        if (type === 'auth') {
            isSignUpMode = (mode === 'signup');
            updateAuthModalUI();
        }

        if (type === 'hiw') resetHiw();
    };

    function updateAuthModalUI() {
        const authTitle = document.getElementById('authTitle');
        const authSubmitBtn = document.getElementById('authSubmitBtn');
        const authModeToggle = document.getElementById('authModeToggle');
        const authUsername = document.getElementById('authUsername');
        const authError = document.getElementById('authError');

        authTitle.innerText = isSignUpMode ? "Create an Account" : "Log In to Spiral";
        authSubmitBtn.innerText = isSignUpMode ? "Sign Up" : "Log In";
        authModeToggle.innerText = isSignUpMode ? "Already have an account? Log In" : "Don't have an account? Sign Up";
        authUsername.style.display = isSignUpMode ? "block" : "none";
        authError.style.display = "none";
    }

    const closeModal = () => modalOverlay.classList.remove('show');

    const resetHiw = () => {
        document.querySelectorAll('.hiw-step').forEach(s => s.classList.remove('active'));
        document.querySelector('.hiw-step[data-step="1"]').classList.add('active');
    };

    // Event Listeners
    document.getElementById('howItWorksBtn').onclick = (e) => {
        e.preventDefault();
        openModal('hiw');
    };

    document.getElementById('signupBtn').onclick = () => openModal('auth', 'signup');

    // Add Terms of Use click handlers
    const navTermsBtn = document.getElementById('navTermsMenuBtn');
    if (navTermsBtn) {
        navTermsBtn.onclick = (e) => {
            e.preventDefault();
            navDropdown.classList.remove('show'); // close dropdown
            openModal('terms');
        };
    }

    const navSupportBtn = document.getElementById('navSupportMenuBtn');
    if (navSupportBtn) {
        navSupportBtn.onclick = (e) => {
            e.preventDefault();
            navDropdown.classList.remove('show'); // close dropdown
            openModal('support');
        };
    }

    const closeSupportBtn = document.getElementById('closeSupport');
    if (closeSupportBtn) {
        closeSupportBtn.onclick = closeModal;
    }

    document.querySelectorAll('.terms-link').forEach(link => {
        link.onclick = (e) => {
            e.preventDefault();
            openModal('terms');
        };
    });

    const finishTermsBtn = document.getElementById('finishTerms');
    if (finishTermsBtn) {
        finishTermsBtn.onclick = closeModal;
    }


    modalClose.onclick = closeModal;
    modalOverlay.onclick = (e) => {
        if (e.target === modalOverlay) closeModal();
    };

    // HIW Flow Stepping
    document.querySelectorAll('.next-hiw-step').forEach(btn => {
        btn.onclick = () => {
            const currentStep = btn.closest('.hiw-step');
            const nextStepNum = parseInt(currentStep.dataset.step) + 1;
            const nextStep = document.querySelector(`.hiw-step[data-step="${nextStepNum}"]`);

            if (nextStep) {
                currentStep.classList.remove('active');
                nextStep.classList.add('active');
            }
        };
    });

    // Finish HIW -> Auth
    document.getElementById('finishHiw').onclick = () => {
        openModal('auth');
    };

    // Chart Timeframe Selection
    document.querySelector('.timeframe-selector').onclick = (e) => {
        const btn = e.target.closest('.tf-btn');
        if (!btn) return;

        document.querySelectorAll('.tf-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        currentChartTimeframe = btn.dataset.tf;
        if (currentMarket) renderChart(currentMarket);
    };

    // Leaderboard Timeframe Selection
    const lbTimeframeSelector = document.querySelector('.lb-tf-selector');
    if (lbTimeframeSelector) {
        lbTimeframeSelector.onclick = (e) => {
            const btn = e.target.closest('.tf-btn');
            if (!btn) return;

            lbTimeframeSelector.querySelectorAll('.tf-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        };
    }

    // Leaderboard Category Simulation
    const lbCatDropdown = document.querySelector('.cat-dropdown-sim');
    if (lbCatDropdown) {
        lbCatDropdown.onclick = () => {
            const textSpan = lbCatDropdown.querySelector('span');
            if (textSpan.innerText === 'All Categories') {
                textSpan.innerText = 'Sports';
                lbCatDropdown.style.borderColor = 'var(--accent-blue)';
            } else {
                textSpan.innerText = 'All Categories';
                lbCatDropdown.style.borderColor = 'var(--border-color)';
            }
        };
    }

    // --- NEW: Auth Flow Logic ---
    const authSubmitBtn = document.getElementById('authSubmitBtn');
    const googleAuthBtn = document.getElementById('googleAuthBtn');
    const authModeToggle = document.getElementById('authModeToggle');
    const authEmail = document.getElementById('authEmail');
    const authPassword = document.getElementById('authPassword');
    const authUsername = document.getElementById('authUsername');
    const authTitle = document.getElementById('authTitle');
    const authError = document.getElementById('authError');
    let isSignUpMode = false;

    authModeToggle.onclick = () => {
        isSignUpMode = !isSignUpMode;
        updateAuthModalUI();
    };

    authSubmitBtn.onclick = async () => {
        const email = authEmail.value;
        const password = authPassword.value;
        const username = authUsername.value;

        try {
            if (isSignUpMode) {
                if (!username) throw new Error("Please enter a username.");
                await signUp(email, password, username);
            } else {
                await logIn(email, password);
            }
            closeModal();
        } catch (err) {
            authError.innerText = err.message;
            authError.style.display = "block";
        }
    };

    googleAuthBtn.onclick = async () => {
        try {
            await logInWithGoogle();
            closeModal();
        } catch (err) {
            authError.innerText = err.message;
            authError.style.display = "block";
        }
    };

    // Logout
    document.querySelector('.menu-item.logout').onclick = (e) => {
        e.preventDefault();
        logOut().then(() => {
            window.location.reload(); // Refresh to reset state
        });
    };

    // --- Firebase Auth State Observer ---
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("User logged in:", user.uid);
            updateHeaderUserUI(user.displayName, user.email); // Immediate UI feedback to hide buttons
            loadState(user.uid);
        } else {
            console.log("No user logged in.");
            updateHeaderUserUI(null, null);
            loadState(); // Ensure balance is 0 for guests
        }
    });
});
