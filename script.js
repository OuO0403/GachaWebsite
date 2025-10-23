// --- 1. 等待 HTML 內容都載入完成 ---
document.addEventListener('DOMContentLoaded', () => {

    // --- 2. 獲取所有需要的 HTML 元素 ---
    const tokenDisplay = document.getElementById('token-display');
    const drawButton = document.getElementById('draw-button');
    const animationWrapper = document.getElementById('animation-wrapper');
    const collectionDiv = document.getElementById('card-collection'); // 【新增】收藏區的 Div
    
    // 老師控制台的元素
    const adminCodeInput = document.getElementById('admin-code');
    const adminSubmitButton = document.getElementById('admin-submit');
    const adminMessage = document.getElementById('admin-message');

    // --- 3. 初始化代幣 ---
    const TOKEN_STORAGE_KEY = 'myStudentTokens'; // 代幣儲存鑰匙
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

    // --- 4. 【升級】初始化卡片收藏庫 ---
    const COLLECTION_STORAGE_KEY = 'myStudentCardCollection'; // 卡片儲存鑰匙
    let cardCollection = []; // 用一個陣列 (Array) 來裝所有卡片

    // 【新增】函式：將收藏庫陣列(cardCollection) 顯示到畫面上
    function displayCollection() {
        collectionDiv.innerHTML = ""; // 先清空收藏區

        if (cardCollection.length === 0) {
            collectionDiv.innerHTML = "<p style='color: #777; text-align: center;'>這裡還沒有卡片喔！</p>";
            return;
        }

        // 遍歷 (forEach) 收藏庫中的每一張卡
        cardCollection.forEach(card => {
            const cardElement = document.createElement('div');
            // 【注意】使用新的 CSS class 'card-small' 來顯示小卡片
            cardElement.className = `card-small reveal-${card.rarity}`;
            cardElement.innerText = card.name;
            collectionDiv.appendChild(cardElement); // 加入到收藏區
        });
    }

    // 【新增】頁面載入時，嘗試從瀏覽器讀取「已儲存的卡片」
    const savedCollection = localStorage.getItem(COLLECTION_STORAGE_KEY);
    if (savedCollection) {
        cardCollection = JSON.parse(savedCollection); // JSON.parse 用來把「字串」還原成「陣列」
    }
    
    // 馬上把讀取到的卡片顯示出來
    displayCollection();


    // --- 5. 抽卡邏輯 (這部分不變) ---
    const DRAW_COST = 10; 

    const cardPool = [
        { name: "普通獎勵 (N)", rarity: "N" },
        { name: "下次多玩1分鐘 (N)", rarity: "N" },
        { name: "稀有獎勵 (R)", rarity: "R" },
        { name: "指定下次封面 (R)", rarity: "R" },
        { name: "終極大獎 (SSR)", rarity: "SSR" }
    ];

    function performDraw() {
        const roll = Math.random(); 

        if (roll < 0.05) { // 5% SSR
            // 【修改】直接回傳一個新的物件，避免修改到 cardPool
            return { ...cardPool.find(card => card.rarity === "SSR") };
        } else if (roll < 0.30) { // 25% R
            return { ...cardPool.find(card => card.rarity === "R") };
        } else { // 70% N
            return { ...cardPool.find(card => card.rarity === "N") };
        }
    }

    // --- 6. 抽卡按鈕事件 (有修改) ---
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
            const drawnCard = performDraw(); // 抽卡！

            // 顯示「揭曉動畫」(大卡片)
            animationWrapper.innerHTML = `
                <div class="card reveal-${drawnCard.rarity}">
                    ${drawnCard.name}
                </div>
            `;
            animationWrapper.style.border = "none"; 
            
            // --- 【升級】儲存卡片 ---
            // 1. 將抽到的卡片(drawnCard) 加入到收藏陣列(cardCollection)
            cardCollection.push(drawnCard);
            
            // 2. 將「整個陣列」轉成「字串」(JSON.stringify) 並存入 localStorage
            localStorage.setItem(COLLECTION_STORAGE_KEY, JSON.stringify(cardCollection));
            
            // 3. 立刻更新畫面上的「收藏庫」
            displayCollection();
            // --- 升級完畢 ---

            drawButton.disabled = false;
        }, 2000); 
    });


    // --- 7. 老師控制台（密技）的邏輯 (這部分不變) ---
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
        } else if (code === "CLEAR_MY_COLLECTION") { // 【新增密技】清除收藏 (方便你測試)
            cardCollection = []; // 清空陣列
            localStorage.removeItem(COLLECTION_STORAGE_KEY); // 移除儲存
            displayCollection(); // 更新畫面
            adminMessage.innerText = "卡片收藏已清空！";
        } else {
            adminMessage.innerText = "密碼錯誤！";
        }

        adminCodeInput.value = ""; 
    });
});