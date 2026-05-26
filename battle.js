document.addEventListener('DOMContentLoaded', () => {

    const firebaseConfig = {
        apiKey: "AIzaSyBW8hEHEHgkIpBGl1v_xRkMJVoeufj0ryk",
        authDomain: "cpbl-battle.firebaseapp.com",
        databaseURL: "https://cpbl-battle-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "cpbl-battle",
        storageBucket: "cpbl-battle.firebasestorage.app",
        messagingSenderId: "478467621028",
        appId: "1:478467621028:web:0a4842de3026e5f517e631"
    };
    if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
    const db = firebase.database();
    
    // 【修改這裡】請務必確認你的 Apps Script 有部署為「新版本」
    const API_URL = "https://script.google.com/macros/s/AKfycbzpNZ04iycuMbVzaV0yRxa43qy-RSXWGEaPGfhM7funb0vuj2P-pi1sGQ5Vxv5mXbmy/exechttps://script.google.com/macros/s/AKfycbzpNZ04iycuMbVzaV0yRxa43qy-RSXWGEaPGfhM7funb0vuj2P-pi1sGQ5Vxv5mXbmy/exec";

    // 卡牌資料庫
const cardMasterList = [
    // 【中信兄弟】
    { id: 'B01', name: '王威晨', team: 'Brothers', rarity: 'SSR', role: 'Batter', power: 98, image: 'images/CTBC_Brothers/1.jpg' },
    { id: 'B02', name: '江坤宇', team: 'Brothers', rarity: 'SR', role: 'Batter', power: 88, image: 'images/CTBC_Brothers/2.jpg' },
    { id: 'B03', name: '陳琥', team: 'Brothers', rarity: 'SR', role: 'Pitcher', power: 86, image: 'images/CTBC_Brothers/3.jpg' },
    { id: 'B04', name: '德保拉', team: 'Brothers', rarity: 'SR', role: 'Pitcher', power: 90, image: 'images/CTBC_Brothers/4.jpg' },
    { id: 'B05', name: '詹子賢', team: 'Brothers', rarity: 'R', role: 'Batter', power: 78, image: 'images/CTBC_Brothers/5.jpg' },
    { id: 'B06', name: '許基宏', team: 'Brothers', rarity: 'R', role: 'Batter', power: 76, image: 'images/CTBC_Brothers/6.jpg' },
    { id: 'B07', name: '岳東華', team: 'Brothers', rarity: 'R', role: 'Batter', power: 72, image: 'images/CTBC_Brothers/7.jpg' },
    { id: 'B08', name: '呂彥青', team: 'Brothers', rarity: 'R', role: 'Pitcher', power: 77, image: 'images/CTBC_Brothers/8.jpg' },
    { id: 'B09', name: '鄭浩均', team: 'Brothers', rarity: 'R', role: 'Pitcher', power: 75, image: 'images/CTBC_Brothers/9.jpg' },
    { id: 'B10', name: '岳政華', team: 'Brothers', rarity: 'N', role: 'Batter', power: 68, image: 'images/CTBC_Brothers/10.jpg' },
    { id: 'B11', name: '曾頌恩', team: 'Brothers', rarity: 'N', role: 'Batter', power: 62, image: 'images/CTBC_Brothers/11.jpg' },
    { id: 'B12', name: '高宇杰', team: 'Brothers', rarity: 'N', role: 'Batter', power: 60, image: 'images/CTBC_Brothers/12.jpg' },
    { id: 'B13', name: '王凱程', team: 'Brothers', rarity: 'N', role: 'Pitcher', power: 65, image: 'images/CTBC_Brothers/13.jpg' },
    { id: 'B14', name: '吳俊偉', team: 'Brothers', rarity: 'N', role: 'Pitcher', power: 63, image: 'images/CTBC_Brothers/14.jpg' },
    { id: 'B15', name: '林瑞鈞', team: 'Brothers', rarity: 'N', role: 'Pitcher', power: 66, image: 'images/CTBC_Brothers/15.jpg' },
    { id: 'B16', name: '李聖裕', team: 'Brothers', rarity: 'N', role: 'Batter', power: 64, image: 'images/CTBC_Brothers/16.jpg' },

    // 【統一7-ELEVEn獅】
    { id: 'L01', name: '陳傑憲', team: 'Lions', rarity: 'SSR', role: 'Batter', power: 99, image: 'images/Uni-President_7-Eleven_Lions/1.jpg' },
    { id: 'L02', name: '蘇智傑', team: 'Lions', rarity: 'SR', role: 'Batter', power: 87, image: 'images/Uni-President_7-Eleven_Lions/2.jpg' },
    { id: 'L03', name: '布雷克', team: 'Lions', rarity: 'SR', role: 'Batter', power: 86, image: 'images/Uni-President_7-Eleven_Lions/3.jpg' },
    { id: 'L04', name: '高塩將樹', team: 'Lions', rarity: 'SR', role: 'Pitcher', power: 89, image: 'images/Uni-President_7-Eleven_Lions/4.jpg' },
    { id: 'L05', name: '陳鏞基', team: 'Lions', rarity: 'R', role: 'Batter', power: 78, image: 'images/Uni-President_7-Eleven_Lions/5.jpg' },
    { id: 'L06', name: '邱智呈', team: 'Lions', rarity: 'R', role: 'Batter', power: 75, image: 'images/Uni-President_7-Eleven_Lions/6.jpg' },
    { id: 'L07', name: '林靖凱', team: 'Lions', rarity: 'R', role: 'Batter', power: 73, image: 'images/Uni-President_7-Eleven_Lions/7.jpg' },
    { id: 'L08', name: '潘傑楷', team: 'Lions', rarity: 'R', role: 'Pitcher', power: 77, image: 'images/Uni-President_7-Eleven_Lions/8.jpg' },
    { id: 'L09', name: '陳韻文', team: 'Lions', rarity: 'R', role: 'Pitcher', power: 74, image: 'images/Uni-President_7-Eleven_Lions/9.jpg' },
    { id: 'L10', name: '獅帝芬', team: 'Lions', rarity: 'N', role: 'Pitcher', power: 68, image: 'images/Uni-President_7-Eleven_Lions/10.jpg' },
    { id: 'L11', name: '黃竣彥', team: 'Lions', rarity: 'N', role: 'Pitcher', power: 60, image: 'images/Uni-President_7-Eleven_Lions/11.jpg' },
    { id: 'L12', name: '林易霆', team: 'Lions', rarity: 'N', role: 'Pitcher', power: 58, image: 'images/Uni-President_7-Eleven_Lions/12.jpg' },
    { id: 'L13', name: '田子杰', team: 'Lions', rarity: 'N', role: 'Batter', power: 65, image: 'images/Uni-President_7-Eleven_Lions/13.jpg' },
    { id: 'L14', name: '王鏡銘', team: 'Lions', rarity: 'N', role: 'Pitcher', power: 66, image:  'images/Uni-President_7-Eleven_Lions/14.jpg' },
    { id: 'L15', name: '劉予承', team:'Lions' , rarity: 'N', role: 'Pitcher', power: 62, image: 'images/Uni-President_7-Eleven_Lions/15.jpg' },
    { id: 'L16', name: '李其峰', team:'Lions' , rarity:' N', role: 'Pitcher', power: 63, image: 'images/Uni-President_7-Eleven_Lions/16.jpg' },

    // 【樂天桃猿】
    { id: 'M01', name: '林立', team: 'Monkeys', rarity: 'SSR', role: 'Batter', power: 97, image: 'images/Rakuten_Monkeys/1.jpg' },
    { id: 'M02', name: '廖健富', team: 'Monkeys', rarity: 'SR', role: 'Batter', power: 89, image: 'images/Rakuten_Monkeys/2.jpg' },
    { id: 'M03', name: '毛英傑', team: 'Monkeys', rarity: 'SR', role: 'Batter', power: 85, image: 'images/Rakuten_Monkeys/3.jpg' },
    { id: 'M04', name: '陳晨威', team: 'Monkeys', rarity: 'SR', role: 'Batter', power: 82, image: 'images/Rakuten_Monkeys/4.jpg' },
    { id: 'M05', name: '林泓育', team: 'Monkeys', rarity: 'R', role: 'Batter', power: 76, image: 'images/Rakuten_Monkeys/5.jpg' },
    { id: 'M06', name: '梁家榮', team: 'Monkeys', rarity: 'R', role: 'Batter', power: 74, image: 'images/Rakuten_Monkeys/6.jpg' },
    { id: 'M07', name: '朱承洋', team: 'Monkeys', rarity: 'R', role: 'Pitcher', power: 78, image: 'images/Rakuten_Monkeys/7.jpg' },
    { id: 'M08', name: '陳冠宇', team: 'Monkeys', rarity: 'R', role: 'Pitcher', power: 73, image: 'images/Rakuten_Monkeys/8.jpg' },
    { id: 'M09', name: '威能帝', team: 'Monkeys', rarity: 'R', role: 'Pitcher', power: 75, image: 'images/Rakuten_Monkeys/9.jpg' },
    { id: 'M10', name: '林承飛', team: 'Monkeys', rarity: 'N', role: 'Batter', power: 67, image: 'images/Rakuten_Monkeys/10.jpg' },
    { id: 'M11', name: '嚴宏鈞', team: 'Monkeys', rarity: 'N', role: 'Batter', power: 60, image: 'images/Rakuten_Monkeys/11.jpg' },
    { id: 'M12', name: '成晉', team: 'Monkeys', rarity: 'N', role: 'Batter', power: 64, image: 'images/Rakuten_Monkeys/12.jpg' },
    { id: 'M13', name: '邱鑫', team: 'Monkeys', rarity: 'N', role: 'Batter', power: 59, image: 'images/Rakuten_Monkeys/13.jpg' },
    { id: 'M14', name: '陳柏豪', team: 'Monkeys', rarity: 'N', role: 'Pitcher', power: 68, image: 'images/Rakuten_Monkeys/14.jpg' },
    { id: 'M15', name: '曾家輝', team: 'Monkeys', rarity: 'N', role: 'Pitcher', power: 65, image: 'images/Rakuten_Monkeys/15.jpg' },
    { id: 'M16', name: '董順傑', team: 'Monkeys', rarity: 'N', role: 'Pitcher', power: 63, image: 'images/Rakuten_Monkeys/16.jpg' },

    // 【富邦悍將】
    { id: 'G01', name: '范國宸', team: 'Guardians', rarity: 'SSR', role: 'Batter', power: 95, image: 'images/Fubon_Guardians/1.jpg' },
    { id: 'G02', name: '戴培峰', team: 'Guardians', rarity: 'SR', role: 'Batter', power: 83, image: 'images/Fubon_Guardians/2.jpg' },
    { id: 'G03', name: '申皓瑋', team: 'Guardians', rarity: 'SR', role: 'Batter', power: 84, image: 'images/Fubon_Guardians/3.jpg' },
    { id: 'G04', name: '曾峻岳', team: 'Guardians', rarity: 'SR', role: 'Pitcher', power: 88, image: 'images/Fubon_Guardians/4.jpg' },
    { id: 'G05', name: '王正棠', team: 'Guardians', rarity: 'R', role: 'Batter', power: 75, image: 'images/Fubon_Guardians/5.jpg' },
    { id: 'G06', name: '李宗賢', team: 'Guardians', rarity: 'R', role: 'Batter', power: 71, image: 'images/Fubon_Guardians/6.jpg' },
    { id: 'G07', name: '高國麟', team: 'Guardians', rarity: 'R', role: 'Batter', power: 73, image: 'images/Fubon_Guardians/7.jpg' },
    { id: 'G08', name: '陳仕朋', team: 'Guardians', rarity: 'R', role: 'Pitcher', power: 76, image: 'images/Fubon_Guardians/8.jpg' },
    { id: 'G09', name: '高捷', team: 'Guardians', rarity: 'R', role: 'Batter', power: 77, image: 'images/Fubon_Guardians/9.jpg' },
    { id: 'G10', name: '池恩齊', team: 'Guardians', rarity: 'N', role: 'Batter', power: 62, image: 'images/Fubon_Guardians/10.jpg' },
    { id: 'G11', name: '林哲瑄', team: 'Guardians', rarity: 'N', role: 'Batter', power: 64, image: 'images/Fubon_Guardians/11.jpg' },
    { id: 'G12', name: '王苡丞', team: 'Guardians', rarity: 'N', role: 'Batter', power: 58, image: 'images/Fubon_Guardians/12.jpg' },
    { id: 'G13', name: '周佳樂', team: 'Guardians', rarity: 'N', role: 'Pitcher', power: 56, image: 'images/Fubon_Guardians/13.jpg' }, // 企劃書標示為投手
    { id: 'G14', name: '黃保羅', team: 'Guardians', rarity: 'N', role: 'Pitcher', power: 68, image: 'images/Fubon_Guardians/14.jpg' },
    { id: 'G15', name: '邦力多', team: 'Guardians', rarity: 'N', role: 'Batter', power: 67, image: 'images/Fubon_Guardians/15.jpg' },
    { id: 'G16', name: '石梓霖', team: 'Guardians', rarity: 'N', role: 'Pitcher', power: 63, image: 'images/Fubon_Guardians/16.jpg' },

    // 【味全龍】
    { id: 'D01', name: '劉基鴻', team: 'Dragons', rarity: 'SSR', role: 'Batter', power: 96, image: 'images/Wei_Chuan_Dragons/1.jpg' },
    { id: 'D02', name: '吉力吉撈．鞏冠', team: 'Dragons', rarity: 'SR', role: 'Batter', power: 88, image: 'images/Wei_Chuan_Dragons/2.jpg' },
    { id: 'D03', name: '郭天信', team: 'Dragons', rarity: 'SR', role: 'Batter', power: 85, image: 'images/Wei_Chuan_Dragons/3.jpg' },
    { id: 'D04', name: '王伯洋', team: 'Dragons', rarity: 'SR', role: 'Pitcher', power: 90, image: 'images/Wei_Chuan_Dragons/4.jpg' },
    { id: 'D05', name: '李凱威', team: 'Dragons', rarity: 'R', role: 'Batter', power: 76, image: 'images/Wei_Chuan_Dragons/5.jpg' },
    { id: 'D06', name: '拿莫．伊漾', team: 'Dragons', rarity: 'R', role: 'Batter', power: 70, image: 'images/Wei_Chuan_Dragons/6.jpg' },
    { id: 'D07', name: '吳俊杰', team: 'Dragons', rarity: 'R', role: 'Pitcher', power: 74, image: 'images/Wei_Chuan_Dragons/7.jpg' },
    { id: 'D08', name: '黃柏豪', team: 'Dragons', rarity: 'R', role: 'Batter', power: 75, image: 'images/Wei_Chuan_Dragons/8.jpg' },
    { id: 'D09', name: '鋼龍', team: 'Dragons', rarity: 'R', role: 'Pitcher', power: 78, image: 'images/Wei_Chuan_Dragons/9.jpg' },
    { id: 'D10', name: '張政禹', team: 'Dragons', rarity: 'N', role: 'Batter', power: 61, image: 'images/Wei_Chuan_Dragons/10.jpg' },
    { id: 'D11', name: '蔣少宏', team: 'Dragons', rarity: 'N', role: 'Batter', power: 63, image: 'images/Wei_Chuan_Dragons/11.jpg' },
    { id: 'D12', name: '趙璟榮', team: 'Dragons', rarity: 'N', role: 'Pitcher', power: 57, image: 'images/Wei_Chuan_Dragons/12.jpg' },
    { id: 'D13', name: '林孝程', team: 'Dragons', rarity: 'N', role: 'Batter', power: 62, image: 'images/Wei_Chuan_Dragons/13.jpg' },
    { id: 'D14', name: '陳冠偉', team: 'Dragons', rarity: 'N', role: 'Pitcher', power: 68, image: 'images/Wei_Chuan_Dragons/14.jpg' },
    { id: 'D15', name: '楊鈺翔', team: 'Dragons', rarity: 'N', role: 'Pitcher', power: 64, image: 'images/Wei_Chuan_Dragons/15.jpg' },
    { id: 'D16', name: '伍鐸', team: 'Dragons', rarity: 'N', role: 'Pitcher', power: 67, image: 'images/Wei_Chuan_Dragons/16.jpg' },

    // 【台鋼雄鷹】
    { id: 'H01', name: '王柏融', team: 'Hawks', rarity: 'SSR', role: 'Batter', power: 100, image: 'images/TSG_Hawks/1.jpg' },
    { id: 'H02', name: '曾子祐', team: 'Hawks', rarity: 'SR', role: 'Batter', power: 82, image: 'images/TSG_Hawks/2.jpg' },
    { id: 'H03', name: '韋宏亮', team: 'Hawks', rarity: 'SR', role: 'Pitcher', power: 80, image: 'images/TSG_Hawks/3.jpg' },
    { id: 'H04', name: '陳正毅', team: 'Hawks', rarity: 'SR', role: 'Pitcher', power: 81, image: 'images/TSG_Hawks/4.jpg' },
    { id: 'H05', name: '葉保弟', team: 'Hawks', rarity: 'R', role: 'Batter', power: 72, image: 'images/TSG_Hawks/5.jpg' },
    { id: 'H06', name: '杜家明', team: 'Hawks', rarity: 'R', role: 'Batter', power: 70, image: 'images/TSG_Hawks/6.jpg' },
    { id: 'H07', name: '魔鷹', team: 'Hawks', rarity: 'R', role: 'Batter', power: 77, image: 'images/TSG_Hawks/7.jpg' },
    { id: 'H08', name: '伍祐城', team: 'Hawks', rarity: 'R', role: 'Pitcher', power: 71, image: 'images/TSG_Hawks/8.jpg' },
    { id: 'H09', name: '施子謙', team: 'Hawks', rarity: 'R', role: 'Pitcher', power: 73, image: 'images/TSG_Hawks/9.jpg' },
    { id: 'H10', name: '郭永維', team: 'Hawks', rarity: 'N', role: 'Batter', power: 63, image: 'images/TSG_Hawks/10.jpg' },
    { id: 'H11', name: '張肇元', team: 'Hawks', rarity: 'N', role: 'Batter', power: 59, image: 'images/TSG_Hawks/11.jpg' },
    { id: 'H12', name: '紀慶然', team: 'Hawks', rarity: 'N', role: 'Batter', power: 57, image: 'images/TSG_Hawks/12.jpg' },
    { id: 'H13', name: '許育銘', team: 'Hawks', rarity: 'N', role: 'Pitcher', power:  56, image: 'images/TSG_Hawks/13.jpg' },
    { id: 'H14', name: '顏清浤',  team:  'Hawks',  rarity:  'N',  role:  'Batter',  power: 55,  image: 'images/TSG_Hawks/14.jpg' },
    { id: 'H15', name: '陳宇宏', team: 'Hawks', rarity: 'N', role: 'Pitcher', power: 61, image: 'images/TSG_Hawks/15.jpg' },
    { id: 'H16', name: '廖奕安', team: 'Hawks', rarity: 'N', role: 'Batter', power: 64, image: 'images/TSG_Hawks/16.jpg' } // 企劃書標示為打者
];

    let myName = "";
    let myOwnedCards = []; 
    let questionBank = [];
    
    let myPlayerId = ""; 
    let currentRoomId = "";
    let myDraftDeck = []; 
    let myMathBuff = 0;
    let currentMode = "basic";

    const loginScreen = document.getElementById('login-screen');
    const mainApp = document.getElementById('main-battle-app');
    const lobbyView = document.getElementById('lobby-view');
    const deckBuildingView = document.getElementById('deck-building-view');
    const battlefieldView = document.getElementById('battlefield-view');
    const btnLeaveRoom = document.getElementById('btn-leave-room');

    // ==========================================
    // 登入大廳 (讀取雲端卡冊與題庫)
    // ==========================================
    document.getElementById('btn-login').addEventListener('click', async () => {
        const name = document.getElementById('login-username').value.trim();
        const pwd = document.getElementById('login-password').value.trim();
        
        if(!name || !pwd) { alert("請輸入名稱與密碼！"); return; }

        const loginBtn = document.getElementById('btn-login');
        loginBtn.innerText = "☁️ 雲端同步中...";
        loginBtn.disabled = true;

        try {
            const resLogin = await fetch(API_URL, {
                method: 'POST', body: JSON.stringify({ action: 'login', username: name, password: pwd })
            });
            const dataLogin = await resLogin.json();
            
            if (dataLogin.status === 'success') {
                const collection = JSON.parse(dataLogin.collection || "{}");
                myOwnedCards = cardMasterList.filter(card => collection[card.id] && collection[card.id] > 0);
                
                if (myOwnedCards.length < 5) {
                    alert("你的卡牌不足 5 張！請先去抽卡機抽卡！");
                    loginBtn.innerText = "同步卡冊並進入大廳";
                    loginBtn.disabled = false;
                    return;
                }
            } else {
                alert(dataLogin.message || "登入失敗");
                loginBtn.innerText = "同步卡冊並進入大廳";
                loginBtn.disabled = false;
                return;
            }

            try {
                const resQ = await fetch(API_URL, {
                    method: 'POST', body: JSON.stringify({ action: 'get_questions' })
                });
                const dataQ = await resQ.json();
                if (dataQ.status === 'success' && dataQ.data.length > 0) questionBank = dataQ.data;
                else questionBank = [{ q: "1+1=?", options: ["1","2","3","4"], a: "2" }];
            } catch (e) {
                questionBank = [{ q: "1+1=?", options: ["1","2","3","4"], a: "2" }];
            }

            myName = name;
            document.getElementById('current-user-display').innerText = myName;
            document.getElementById('my-name-display').innerText = myName;
            loginScreen.style.display = 'none';
            mainApp.style.display = 'block';
            lobbyView.style.display = 'flex';
            
            renderLobbyCardGrid();
            startLobbyRoomListener();

        } catch (error) {
            alert("連線發生錯誤，請檢查網路！");
            loginBtn.innerText = "同步卡冊並進入大廳";
            loginBtn.disabled = false;
        }
    });

    document.getElementById('lobby-filter-team').addEventListener('change', renderLobbyCardGrid);
    document.getElementById('lobby-filter-role').addEventListener('change', renderLobbyCardGrid);

    function renderLobbyCardGrid() {
        const teamFilter = document.getElementById('lobby-filter-team').value;
        const roleFilter = document.getElementById('lobby-filter-role').value;
        const grid = document.getElementById('lobby-card-grid');
        grid.innerHTML = "";

        myOwnedCards.forEach(card => {
            if(teamFilter !== 'all' && card.team !== teamFilter) return;
            if(roleFilter !== 'all' && card.role !== roleFilter) return;

            const cardEl = document.createElement('div');
            cardEl.className = `card-small-wrapper reveal-${card.rarity}`;
            cardEl.innerHTML = `<div class="card-small-inner"><img src="${card.image}"></div><div style="color:white; text-align:center; font-size:0.85em; margin-top:3px; background:rgba(0,0,0,0.6); border-radius:4px;">${card.role === 'Batter' ? '🏏打' : '⚾投'}:${card.power}</div>`;
            grid.appendChild(cardEl);
        });
    }

    function startLobbyRoomListener() {
        db.ref('rooms').on('value', (snapshot) => {
            const listDiv = document.getElementById('room-list');
            listDiv.innerHTML = "";
            const rooms = snapshot.val();
            
            if(!rooms) {
                listDiv.innerHTML = `<p style="color: #888; font-style: italic; text-align:center;">目前沒有人在開房...</p>`;
                return;
            }

            let hasRooms = false;
            for(let id in rooms) {
                const room = rooms[id];
                if(room.state === "waiting" && room.p1) {
                    hasRooms = true;
                    const item = document.createElement('div');
                    item.className = "room-item";
                    item.innerHTML = `<span>🏠 房間碼：<b>${id}</b> (${room.gameMode === 'basic'?'基礎':'🎲骰子'})</span><span style="color:#2ecc71;">房主: ${room.p1.name} ➡️</span>`;
                    item.onclick = () => { joinRoomById(id); };
                    listDiv.appendChild(item);
                } else if (!room.p1) {
                    db.ref('rooms/' + id).remove();
                }
            }
            if(!hasRooms) listDiv.innerHTML = `<p style="color: #888; font-style: italic; text-align:center;">目前沒有人在開房...</p>`;
        });
    }

    // ==========================================
    // 創建與加入房間
    // ==========================================
    document.getElementById('btn-create-room').addEventListener('click', () => {
        currentRoomId = Math.floor(1000 + Math.random() * 9000).toString();
        myPlayerId = "p1";
        currentMode = document.getElementById('game-mode').value;
        
        const roomRef = db.ref('rooms/' + currentRoomId);
        roomRef.set({
            roomId: currentRoomId, gameMode: currentMode, state: "waiting", round: 1, 
            p1: { name: myName, ready: false, score: 0, hp: 100, deck: "", selectedCard: "", mathBuff: 0, mathDone: false }
        });
        
        roomRef.onDisconnect().remove();

        enterDeckBuilding();
        listenToRoom();
    });

    document.getElementById('btn-join-room').addEventListener('click', () => {
        const id = document.getElementById('join-room-id').value.trim();
        if(id) joinRoomById(id);
    });

    function joinRoomById(id) {
        db.ref('rooms/' + id).once('value', (snapshot) => {
            const room = snapshot.val();
            if(snapshot.exists() && room.p1 && (!room.p2 || room.state === "waiting")) {
                currentRoomId = id;
                myPlayerId = "p2";
                currentMode = room.gameMode;
                
                const p2Ref = db.ref('rooms/' + currentRoomId + '/p2');
                p2Ref.set({ name: myName, ready: false, score: 0, hp: 100, deck: "", selectedCard: "", mathBuff: 0, mathDone: false });
                db.ref('rooms/' + currentRoomId + '/state').set("drafting");
                
                p2Ref.onDisconnect().remove();
                db.ref('rooms/' + currentRoomId + '/state').onDisconnect().set("waiting");

                enterDeckBuilding();
                listenToRoom();
            } else {
                alert("房間不存在或已滿員！");
            }
        });
    }

    btnLeaveRoom.addEventListener('click', () => {
        if (!currentRoomId) return;
        if (confirm("確定要退出並返回大廳嗎？")) {
            db.ref('rooms/' + currentRoomId).onDisconnect().cancel();
            
            if (myPlayerId === "p1") db.ref('rooms/' + currentRoomId).remove();
            else if (myPlayerId === "p2") {
                db.ref('rooms/' + currentRoomId + '/p2').remove();
                db.ref('rooms/' + currentRoomId + '/state').set("waiting");
            }
            returnToLobby();
        }
    });

    function returnToLobby() {
        if (currentRoomId) db.ref('rooms/' + currentRoomId).off(); 
        currentRoomId = ""; myPlayerId = ""; myDraftDeck = [];
        
        btnLeaveRoom.style.display = 'none';
        deckBuildingView.style.display = 'none';
        battlefieldView.style.display = 'none';
        lobbyView.style.display = 'flex';
        document.getElementById('btn-start-game').style.display = 'none';
        document.getElementById('btn-ready').disabled = true;
        document.getElementById('btn-ready').innerText = "確認先發陣容";
    }

    // ==========================================
    // 選牌階段
    // ==========================================
    function enterDeckBuilding() {
        lobbyView.style.display = 'none';
        deckBuildingView.style.display = 'block';
        btnLeaveRoom.style.display = 'block'; 
        
        document.getElementById('draft-room-id').innerText = currentRoomId;
        document.getElementById('draft-room-mode').innerText = currentMode === "basic" ? "基礎對決" : "🎲骰子100血制";
        
        document.getElementById('deck-filter-team').addEventListener('change', renderDeckSelectionGrid);
        document.getElementById('deck-filter-role').addEventListener('change', renderDeckSelectionGrid);
        renderDeckSelectionGrid();
    }

    function renderDeckSelectionGrid() {
        const teamFilter = document.getElementById('deck-filter-team').value;
        const roleFilter = document.getElementById('deck-filter-role').value;
        const grid = document.getElementById('deck-selection-grid');
        grid.innerHTML = "";

        myOwnedCards.forEach(card => {
            if(teamFilter !== 'all' && card.team !== teamFilter) return;
            if(roleFilter !== 'all' && card.role !== roleFilter) return;

            const cardEl = document.createElement('div');
            const isSelected = myDraftDeck.some(c => c.id === card.id);
            cardEl.className = `card-small-wrapper reveal-${card.rarity} deck-card-wrapper`;
            cardEl.style.cursor = "pointer";
            if (isSelected) {
                cardEl.style.transform = "translateY(-8px)";
                cardEl.style.border = "3px solid #2ecc71";
            }
            
            cardEl.innerHTML = `<div class="card-small-inner"><img src="${card.image}"></div><div style="color:white; text-align:center; font-size:0.9em; margin-top:5px; background:rgba(0,0,0,0.7); border-radius:5px;">${card.role === 'Batter' ? '打' : '投'} : ${card.power}</div>`;
            cardEl.onclick = () => {
                const index = myDraftDeck.findIndex(c => c.id === card.id);
                if (index > -1) myDraftDeck.splice(index, 1);
                else {
                    if(myDraftDeck.length < 5) myDraftDeck.push(card);
                    else alert("每隊最多挑選 5 名球員！");
                }
                renderDeckSelectionGrid(); 
                updateDeckStatus();
            };
            grid.appendChild(cardEl);
        });
    }

    function updateDeckStatus() {
        const pCount = myDraftDeck.filter(c => c.role === 'Pitcher').length;
        const bCount = myDraftDeck.filter(c => c.role === 'Batter').length;
        
        document.getElementById('deck-count').innerText = myDraftDeck.length;
        document.getElementById('req-pitcher').innerText = `投手 (${pCount}/2)`;
        document.getElementById('req-pitcher').style.color = pCount >= 2 ? "#2ecc71" : "#FF4136";
        document.getElementById('req-batter').innerText = `打者 (${bCount}/2)`;
        document.getElementById('req-batter').style.color = bCount >= 2 ? "#2ecc71" : "#FF4136";

        document.getElementById('btn-ready').disabled = !(myDraftDeck.length === 5 && pCount >= 2 && bCount >= 2);
    }

    document.getElementById('btn-ready').addEventListener('click', () => {
        document.getElementById('btn-ready').disabled = true;
        document.getElementById('btn-ready').innerText = "陣容已鎖定！";
        db.ref(`rooms/${currentRoomId}/${myPlayerId}`).update({ deck: myDraftDeck, ready: true });
    });

    // ==========================================
    // 遊戲核心同步監聽器
    // ==========================================
    function listenToRoom() {
        db.ref('rooms/' + currentRoomId).on('value', (snapshot) => {
            const roomData = snapshot.val();
            
            if(!roomData) {
                if (myPlayerId === "p2") alert("房間已解散！");
                returnToLobby(); return;
            }
            if(myPlayerId === "p1" && !roomData.p2 && roomData.state !== "waiting") {
                alert("對手已離開房間！回到等待狀態。");
                db.ref('rooms/' + currentRoomId + '/state').set("waiting");
                document.getElementById('btn-start-game').style.display = 'none';
                return;
            }

            const opponentId = myPlayerId === "p1" ? "p2" : "p1";
            const me = roomData[myPlayerId];
            const opponent = roomData[opponentId];

            if(roomData.state === "drafting") {
                document.getElementById('p1-status-text').innerText = `房主 (${roomData.p1.name})：${roomData.p1.ready ? '✅ 確認' : '⏳ 選牌中'}`;
                if(opponent) document.getElementById('p2-status-text').innerText = `對手 (${opponent.name})：${opponent.ready ? '✅ 確認' : '⏳ 選牌中'}`;
                
                if(myPlayerId === "p1" && roomData.p1.ready && opponent && opponent.ready) {
                    document.getElementById('btn-start-game').style.display = 'block';
                }
            }

            if(opponent) {
                document.getElementById('opponent-name').innerText = opponent.name;
                document.getElementById('opponent-score').innerText = opponent.score;
                document.getElementById('opponent-hp').innerText = opponent.hp;
            }
            document.getElementById('player-score').innerText = me.score;
            document.getElementById('player-hp').innerText = me.hp;

            if(roomData.state === "picking") {
                deckBuildingView.style.display = 'none';
                battlefieldView.style.display = 'block';
                document.getElementById('display-room-id').innerText = currentRoomId;
                
                document.querySelectorAll('.hp-display').forEach(el => {
                    el.style.display = (roomData.gameMode === "dice") ? 'inline' : 'none';
                });

                let isP1Attacking = (roomData.round % 2 !== 0);
                let amIAttacking = (myPlayerId === "p1") ? isP1Attacking : !isP1Attacking;
                let attackerId = isP1Attacking ? "p1" : "p2";
                let attackerHasPlayed = !!roomData[attackerId].selectedCard;

                let myRoleText = amIAttacking ? "進攻方 (先手)" : "防守方 (後手)";
                
                // 【修復】重新把標題建回來，防止當機！
                const clashArea = document.querySelector('.clash-area');
                clashArea.innerHTML = `<h2 id="battle-status" class="glow-text-gold" style="font-size: 1.6em; margin: 0; text-align: center;">第 ${roomData.round} 局 | 你是 <b style="color:#FFD700;">${myRoleText}</b><br><br><span style="font-size:0.7em; color:white;">等待雙方出牌...</span></h2>`;
                
                renderMyBattleHand(roomData, me, amIAttacking, attackerHasPlayed, roomData[attackerId].selectedCard);
                renderOpponentHand(opponent);

                if(me.selectedCard && opponent && opponent.selectedCard) {
                    if(myPlayerId === "p1") db.ref('rooms/' + currentRoomId + '/state').set("math");
                }
            }

            if(roomData.state === "math") {
                const bStatus = document.getElementById('battle-status');
                if (bStatus) bStatus.innerText = "📝 戰術計算中...";
                if(document.getElementById('math-modal').style.display === 'none' && !me.mathDone) {
                    triggerMathChallenge();
                }
                if(me.mathDone && opponent && opponent.mathDone) {
                    if(myPlayerId === "p1") {
                        let updates = { state: "reveal" };
                        if (roomData.gameMode === "dice") {
                            updates.p1Dice = Math.floor(Math.random() * 6) + 1;
                            updates.p2Dice = Math.floor(Math.random() * 6) + 1;
                        }
                        db.ref('rooms/' + currentRoomId).update(updates);
                    }
                }
            }

            if(roomData.state === "reveal") {
                if (window.lastRevealedRound !== roomData.round) {
                    window.lastRevealedRound = roomData.round;
                    playRevealAnimationSequence(roomData, me, opponent);
                }
            }
        });
    }

    document.getElementById('btn-start-game').addEventListener('click', () => {
        db.ref('rooms/' + currentRoomId + '/state').set("picking");
        document.getElementById('btn-start-game').style.display = 'none';
    });

    function renderMyBattleHand(roomData, me, amIAttacking, attackerHasPlayed, attackerCard) {
        const handDiv = document.getElementById('player-hand');
        handDiv.innerHTML = "";
        
        if(me.selectedCard) {
            handDiv.innerHTML = `<h3 class="glow-text-gold">已出牌，等待對手...</h3>`;
            return;
        }

        me.deck.forEach((card) => {
            let canPlay = false;
            if (roomData.gameMode === "dice") {
                if (amIAttacking && card.role === "Batter") canPlay = true;
                if (!amIAttacking && card.role === "Pitcher") canPlay = true;
            } else {
                if (amIAttacking) canPlay = true;
                if (!amIAttacking) {
                    if (!attackerHasPlayed) canPlay = false;
                    else {
                        let reqRole = attackerCard.role === "Batter" ? "Pitcher" : "Batter";
                        if (card.role === reqRole) canPlay = true;
                    }
                }
            }

            const cardEl = document.createElement('div');
            // 【修復】加上 battle-card 類別，限制大小
            cardEl.className = `card-small-wrapper reveal-${card.rarity} battle-card`;
            cardEl.style.cursor = canPlay ? "pointer" : "not-allowed";
            if (!canPlay) {
                cardEl.style.opacity = "0.4";
                cardEl.style.filter = "grayscale(100%)";
            }

            cardEl.innerHTML = `<div class="card-small-inner"><img src="${card.image}"></div><div style="color:white; text-align:center; font-size:0.9em; margin-top:5px; background:rgba(0,0,0,0.7); border-radius:5px;">${card.role === 'Batter' ? '打' : '投'}:${card.power}</div>`;
            cardEl.onclick = () => {
                if (!canPlay) {
                    if (!amIAttacking && !attackerHasPlayed) alert("請等待進攻方先出牌！");
                    else alert("此模式/回合不能出這張卡！");
                    return;
                }
                db.ref(`rooms/${currentRoomId}/${myPlayerId}/selectedCard`).set(card);
            };
            handDiv.appendChild(cardEl);
        });
    }

    function renderOpponentHand(opponent) {
        const handDiv = document.getElementById('opponent-hand');
        if(!opponent) return;
        if(opponent.selectedCard) handDiv.innerHTML = `<div class="card-back" style="width:105px; height:155px; border:2px solid #2ecc71; color:white; display:flex; justify-content:center; align-items:center; border-radius:8px;">出牌就緒</div>`;
        else handDiv.innerHTML = `<div class="card-back" style="width:105px; height:155px; opacity:0.4; color:white; display:flex; justify-content:center; align-items:center; border-radius:8px;">思考中...</div>`;
    }

    function triggerMathChallenge() {
        const qData = questionBank[Math.floor(Math.random() * questionBank.length)];
        document.getElementById('math-question').innerText = qData.q;
        const optionsArea = document.getElementById('math-options-area');
        const feedback = document.getElementById('math-feedback');
        
        optionsArea.innerHTML = "";
        feedback.innerText = "";

        const handleAnswer = (val) => {
            const btns = optionsArea.querySelectorAll('button');
            btns.forEach(b => b.disabled = true);

            if(String(val).trim() === String(qData.a).trim()) {
                feedback.style.color = "#2ecc71";
                feedback.innerText = "🎯 戰術成功！加成 +20！";
                myMathBuff = 20;
            } else {
                feedback.style.color = "#FF4136";
                feedback.innerText = `❌ 錯誤！正確答案是 ${qData.a}`;
                myMathBuff = 0;
            }
            setTimeout(() => {
                document.getElementById('math-modal').style.display = 'none';
                db.ref(`rooms/${currentRoomId}/${myPlayerId}`).update({ mathBuff: myMathBuff, mathDone: true });
            }, 2000);
        };

        qData.options.forEach(opt => {
            if (opt !== "") {
                const btn = document.createElement('button');
                btn.className = "battle-btn create-btn"; 
                btn.style.margin = "5px 0";
                btn.innerText = opt;
                btn.onclick = () => handleAnswer(opt);
                optionsArea.appendChild(btn);
            }
        });
        document.getElementById('math-modal').style.display = 'flex';
    }

    function playRevealAnimationSequence(roomData, me, opponent) {
        const clashArea = document.querySelector('.clash-area');
        let isP1Attacking = (roomData.round % 2 !== 0);
        let amIAttacking = (myPlayerId === "p1") ? isP1Attacking : !isP1Attacking;

        // 【修復】加上 battle-display-card 限制開牌大小
        clashArea.innerHTML = `
            <div style="display:flex; justify-content:center; align-items:center; gap:20px; color:white; width: 100%;">
                <div class="crash-left" style="text-align:center; flex: 1;">
                    <h4 class="glow-text-gold">我方 (${amIAttacking?'攻':'守'})</h4>
                    <div class="card-small-wrapper reveal-${me.selectedCard.rarity} battle-display-card"><img src="${me.selectedCard.image}"></div>
                </div>
                <div><h1 style="color:red; font-size:3em; font-style:italic;" class="flash-text">VS</h1></div>
                <div class="crash-right" style="text-align:center; flex: 1;">
                    <h4 class="glow-text-gold">對手 (${!amIAttacking?'攻':'守'})</h4>
                    <div class="card-small-wrapper reveal-${opponent.selectedCard.rarity} battle-display-card"><img src="${opponent.selectedCard.image}"></div>
                </div>
            </div>
            <div id="dice-anim-container" style="display:none; margin-top:20px; text-align:center;">
                <span class="dice-rolling" id="anim-my-dice">🎲 ?</span>
                <span style="margin: 0 30px; font-weight:bold; color:white;">VS</span>
                <span class="dice-rolling" id="anim-op-dice">🎲 ?</span>
            </div>
        `;

        if (roomData.gameMode === "dice") {
            setTimeout(() => {
                document.getElementById('dice-anim-container').style.display = 'block';
                let rollInterval = setInterval(() => {
                    document.getElementById('anim-my-dice').innerText = `🎲 ${Math.floor(Math.random() * 6) + 1}`;
                    document.getElementById('anim-op-dice').innerText = `🎲 ${Math.floor(Math.random() * 6) + 1}`;
                }, 100);

                setTimeout(() => {
                    clearInterval(rollInterval);
                    renderFinalResult(roomData, me, opponent, amIAttacking);
                }, 2000);
            }, 500); 
        } else {
            setTimeout(() => {
                renderFinalResult(roomData, me, opponent, amIAttacking);
            }, 800);
        }
    }

    function renderFinalResult(roomData, me, opponent, amIAttacking) {
        let p1Base = me.selectedCard.power;
        let p2Base = opponent.selectedCard.power;
        let p1Final, p2Final;
        let myDiceText = "", opDiceText = "";

        if (roomData.gameMode === "dice") {
            let myDice = (myPlayerId === "p1") ? roomData.p1Dice : roomData.p2Dice;
            let opDice = (myPlayerId === "p1") ? roomData.p2Dice : roomData.p1Dice;
            myDiceText = `<h3 style="color:#2ecc71; margin:5px 0;">🎲 骰: ${myDice}</h3>`;
            opDiceText = `<h3 style="color:#2ecc71; margin:5px 0;">🎲 骰: ${opDice}</h3>`;
            p1Final = Math.round((p1Base / myDice) * 10) / 10 + me.mathBuff;
            p2Final = Math.round((p2Base / opDice) * 10) / 10 + opponent.mathBuff;
        } else {
            p1Final = p1Base + me.mathBuff;
            p2Final = p2Base + opponent.mathBuff;
        }

        const clashArea = document.querySelector('.clash-area');
        clashArea.innerHTML = `
            <div style="display:flex; justify-content:center; align-items:center; gap:30px; color:white; width: 100%;">
                <div style="text-align:center; flex: 1;">
                    <h4 class="glow-text-gold">我方 (${amIAttacking?'攻':'守'})</h4>
                    <div class="card-small-wrapper reveal-${me.selectedCard.rarity} battle-display-card"><img src="${me.selectedCard.image}"></div>
                    ${myDiceText} <p style="margin:5px 0;">+ 術 ${me.mathBuff}</p>
                    <h2 class="glow-text-red">戰力: ${p1Final}</h2>
                </div>
                <div><h1 style="color:red; font-size:2em; font-style:italic; margin:0;">VS</h1></div>
                <div style="text-align:center; flex: 1;">
                    <h4 class="glow-text-gold">對手 (${!amIAttacking?'攻':'守'})</h4>
                    <div class="card-small-wrapper reveal-${opponent.selectedCard.rarity} battle-display-card"><img src="${opponent.selectedCard.image}"></div>
                    ${opDiceText} <p style="margin:5px 0;">+ 術 ${opponent.mathBuff}</p>
                    <h2 class="glow-text-red">戰力: ${p2Final}</h2>
                </div>
            </div>
            <div class="fade-in-slow" style="text-align: center; width: 100%;">
                <h2 id="round-result" style="color:white; margin-top:15px; font-size:1.8em;"></h2>
                <div id="next-btn-container"></div>
            </div>
        `;

        const resultEl = document.getElementById('round-result');
        const nextContainer = document.getElementById('next-btn-container');
        let newMeHp = me.hp;
        let newOpHp = opponent.hp;

        if (roomData.gameMode === "dice") {
            let atkPower = amIAttacking ? p1Final : p2Final;
            let defPower = amIAttacking ? p2Final : p1Final;
            let diff = Math.max(0, atkPower - defPower);

            if (diff > 0) {
                if (amIAttacking) {
                    resultEl.innerHTML = `💥 突破防線！對手扣 <b style="color:red;">${diff.toFixed(1)}</b> 血！`;
                    newOpHp = Math.max(0, opponent.hp - diff);
                } else {
                    resultEl.innerHTML = `🚨 防線被破！你被扣 <b style="color:red;">${diff.toFixed(1)}</b> 血！`;
                    newMeHp = Math.max(0, me.hp - diff);
                }
            } else {
                resultEl.innerText = "🛡️ 防守成功！無人扣血！";
            }
        } else {
            if(p1Final > p2Final) {
                resultEl.innerText = "🏆 我方拿下本局！";
                if(myPlayerId === "p1") db.ref(`rooms/${currentRoomId}/p1/score`).set(me.score + 1);
            } else if (p1Final < p2Final) {
                resultEl.innerText = "💀 對手拿下本局！";
                if(myPlayerId === "p1") db.ref(`rooms/${currentRoomId}/p2/score`).set(opponent.score + 1);
            } else resultEl.innerText = "🤝 平手！";
        }

        if (myPlayerId === "p1" && roomData.gameMode === "dice") {
            db.ref(`rooms/${currentRoomId}/p1/hp`).set(myPlayerId === "p1" ? newMeHp : newOpHp);
            db.ref(`rooms/${currentRoomId}/p2/hp`).set(myPlayerId === "p2" ? newMeHp : newOpHp);
        }

        if (roomData.gameMode === "dice" && (newMeHp <= 0 || newOpHp <= 0)) {
            resultEl.innerHTML += "<br><br><span class='flash-text' style='color:#FFD700; font-size:1.5em;'>🎉 遊戲結束！分出勝負！</span>";
            return; // 遊戲結束，不顯示下一局按鈕
        }

        if (myPlayerId === "p1") {
            nextContainer.innerHTML = `<button id="btn-next-round" class="battle-btn create-btn" style="width:200px; margin:15px auto;">房主開啟下一局</button>`;
            document.getElementById('btn-next-round').onclick = () => {
                db.ref(`rooms/${currentRoomId}/p1`).update({ selectedCard: "", mathBuff: 0, mathDone: false });
                db.ref(`rooms/${currentRoomId}/p2`).update({ selectedCard: "", mathBuff: 0, mathDone: false });
                db.ref(`rooms/${currentRoomId}`).update({ state: "picking", round: roomData.round + 1 });
            };
        } else {
            nextContainer.innerHTML = `<p style="color: #aaa; text-align:center; margin-top: 15px;">⏳ 等待房主開啟下一局...</p>`;
        }
    }
});
