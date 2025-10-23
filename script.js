// --- 1. 等待 HTML 內容都載入完成 ---
document.addEventListener('DOMContentLoaded', () => {

    // --- 2. 獲取所有需要的 HTML 元素 ---
    const tokenDisplay = document.getElementById('token-display');
    const drawButton = document.getElementById('draw-button');
    const animationWrapper = document.getElementById('animation-wrapper');
    const collectionDiv = document.getElementById('card-collection');
    
    // 老師控制台的元素
    const adminCodeInput = document.getElementById('admin-code');
    const adminSubmitButton = document.getElementById('admin-submit');
    const adminMessage = document.getElementById('admin-message');

    // --- 3. 初始化代幣 ---
    const TOKEN_STORAGE_KEY = 'myStudentTokens'; 
    let currentTokens = 0;

    function updateTokens(amount) {
        currentTokens = amount;
        tokenDisplay.innerText = currentTokens;
        localStorage.setItem(TOKEN_STORAGE_KEY, currentTokens); 
    }

    const savedTokens = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (savedTokens) {
        updateTokens(parseInt(savedTokens));
    } else {
        updateTokens(20); 
    }

    // --- 4. 初始化卡片收藏庫 ---
    const COLLECTION_STORAGE_KEY = 'myStudentCardCollection'; 
    let cardCollection = []; 

    function displayCollection() {
        collectionDiv.innerHTML = ""; 

        if (cardCollection.length === 0) {
            collectionDiv.innerHTML = "<p style='color: #eee; text-align: center; font-style: italic;'>這裡還沒有卡片喔！快來抽卡！</p>";
            return;
        }

        cardCollection.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.className = `card-small reveal-${card.rarity}`;
            cardElement.innerText = card.name;
            // 【新增】為每張小卡片設定一個隨機的旋轉角度 (-5度 到 5度)
            const randomRotate = (Math.random() * 10) - 5; // 產生 -5 到 +5 之間的數字
            cardElement.style.setProperty('--random-rotate', `${randomRotate}deg`); // 設定 CSS 變數
            collectionDiv.appendChild(cardElement); 
        });
    }

    const savedCollection = localStorage.getItem(COLLECTION_STORAGE_KEY);
    if (savedCollection) {
        cardCollection = JSON.parse(savedCollection); 
    }
    
    displayCollection();


    // --- 5. 抽卡邏輯 ---
    const DRAW_COST = 10; 

    // 卡池定義 (你可以在這裡修改或新增卡片)
    const cardPool = [
        { name: "普通獎勵 (N)", rarity: "N" },
        { name: "下次多玩1分鐘 (N)", rarity: "N" },
        { name: "稀有獎勵 (R)", rarity: "R" },
        { name: "指定下次封面 (R)", rarity: "R" },
        { name: "SSR 大獎！", rarity: "SSR" } // SSR 換個名稱
    ];

    function performDraw() {
        const roll = Math.random(); 

        if (roll < 0.05) { // 5% SSR
            return { ...cardPool.find(card => card.rarity === "SSR") };
        } else if (roll < 0.30) { // 25% R
            // 從 R 稀有度的卡片中隨機選一張
            const rCards = cardPool.filter(card => card.rarity === "R");
            return { ...rCards[Math.floor(Math.random() * rCards.length)] };
        } else { // 70% N
            // 從 N 稀有度的卡片中隨機選一張
            const nCards = cardPool.filter(card => card.rarity === "N");
            return { ...nCards[Math.floor(Math.random() * nCards.length)] };
        }
    }

    // --- 6. 抽卡按鈕事件 ---
    drawButton.addEventListener('click', () => {
        if (currentTokens < DRAW_COST) {
            alert("代幣不足！快去跟老師領取！");
            return;
        }
        updateTokens(currentTokens - DRAW_COST);
        drawButton.disabled = true;
        animationWrapper.innerHTML = '<div class="draw-pending"></div>';
        animationWrapper.style.border = "2px dashed #ddd";

        setTimeout(() => {
            const drawnCard = performDraw(); 

            animationWrapper.innerHTML = `
                <div class="card reveal-${drawnCard.rarity}">
                    ${drawnCard.name}
                </div>
            `;
            animationWrapper.style.border = "none"; 
            
            cardCollection.push(drawnCard);
            localStorage.setItem(COLLECTION_STORAGE_KEY, JSON.stringify(cardCollection));
            
            displayCollection();

            drawButton.disabled = false;
        }, 2000); 
    });


    // --- 7. 老師控制台（密技）的邏輯 ---
    adminSubmitButton.addEventListener('click', () => {
        const code = adminCodeInput.value.trim(); 
        adminMessage.style.color = "red"; 

        if (code === "ADD_TOKEN_20") {
            updateTokens(currentTokens + 20);
            adminMessage.innerText = "成功兌換 20 枚代幣！";
            adminMessage.style.color = "green";
        } else if (code === "ADD_TOKEN_50") {
            updateTokens(currentTokens + 50);
            adminMessage.innerText = "成功兌換 50 枚代幣！";
            adminMessage.style.color = "green";
        } else if (code === "RESET_MY_TOKENS") { 
             updateTokens(0);
             adminMessage.innerText = "代幣已重置。";
        } else if (code === "CLEAR_MY_COLLECTION") { 
            cardCollection = []; 
            localStorage.removeItem(COLLECTION_STORAGE_KEY); 
            displayCollection(); 
            adminMessage.innerText = "卡片收藏已清空！";
            adminMessage.style.color = "green"; // 清空成功也顯示綠色
        } else {
            adminMessage.innerText = "密碼錯誤！";
        }

        adminCodeInput.value = ""; 
    });
});