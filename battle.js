document.addEventListener('DOMContentLoaded', () => {

    // 1. Firebase 初始化
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

    // 2. 完整的卡片資料庫 (包含 role 和 power)
const cardMasterList = [
    // 【中信兄弟】
    { id: 'B01', name: '王威晨', team: 'Brothers', rarity: 'SSR', role: 'Batter', power: 98, image: 'bookshelf_bg.jpg' },
    { id: 'B02', name: '江坤宇', team: 'Brothers', rarity: 'SR', role: 'Batter', power: 88, image: 'bookshelf_bg.jpg' },
    { id: 'B03', name: '陳琥', team: 'Brothers', rarity: 'SR', role: 'Batter', power: 86, image: 'bookshelf_bg.jpg' },
    { id: 'B04', name: '德保拉', team: 'Brothers', rarity: 'SR', role: 'Pitcher', power: 90, image: 'bookshelf_bg.jpg' },
    { id: 'B05', name: '詹子賢', team: 'Brothers', rarity: 'R', role: 'Batter', power: 78, image: 'bookshelf_bg.jpg' },
    { id: 'B06', name: '許基宏', team: 'Brothers', rarity: 'R', role: 'Batter', power: 76, image: 'bookshelf_bg.jpg' },
    { id: 'B07', name: '岳東華', team: 'Brothers', rarity: 'R', role: 'Batter', power: 72, image: 'bookshelf_bg.jpg' },
    { id: 'B08', name: '呂彥青', team: 'Brothers', rarity: 'R', role: 'Pitcher', power: 77, image: 'bookshelf_bg.jpg' },
    { id: 'B09', name: '鄭浩均', team: 'Brothers', rarity: 'R', role: 'Pitcher', power: 75, image: 'bookshelf_bg.jpg' },
    { id: 'B10', name: '岳政華', team: 'Brothers', rarity: 'N', role: 'Batter', power: 68, image: 'bookshelf_bg.jpg' },
    { id: 'B11', name: '曾頌恩', team: 'Brothers', rarity: 'N', role: 'Batter', power: 62, image: 'bookshelf_bg.jpg' },
    { id: 'B12', name: '高宇杰', team: 'Brothers', rarity: 'N', role: 'Batter', power: 60, image: 'bookshelf_bg.jpg' },
    { id: 'B13', name: '王凱程', team: 'Brothers', rarity: 'N', role: 'Pitcher', power: 65, image: 'bookshelf_bg.jpg' },
    { id: 'B14', name: '吳俊偉', team: 'Brothers', rarity: 'N', role: 'Pitcher', power: 63, image: 'bookshelf_bg.jpg' },
    { id: 'B15', name: '林瑞鈞', team: 'Brothers', rarity: 'N', role: 'Pitcher', power: 66, image: 'bookshelf_bg.jpg' },
    { id: 'B16', name: '李聖裕', team: 'Brothers', rarity: 'N', role: 'Batter', power: 64, image: 'bookshelf_bg.jpg' },

    // 【統一7-ELEVEn獅】
    { id: 'L01', name: '陳傑憲', team: 'Lions', rarity: 'SSR', role: 'Batter', power: 99, image: 'bookshelf_bg.jpg' },
    { id: 'L02', name: '蘇智傑', team: 'Lions', rarity: 'SR', role: 'Batter', power: 87, image: 'bookshelf_bg.jpg' },
    { id: 'L03', name: '布雷克', team: 'Lions', rarity: 'SR', role: 'Batter', power: 86, image: 'bookshelf_bg.jpg' },
    { id: 'L04', name: '高塩將樹', team: 'Lions', rarity: 'SR', role: 'Pitcher', power: 89, image: 'bookshelf_bg.jpg' },
    { id: 'L05', name: '陳鏞基', team: 'Lions', rarity: 'R', role: 'Batter', power: 78, image: 'bookshelf_bg.jpg' },
    { id: 'L06', name: '邱智呈', team: 'Lions', rarity: 'R', role: 'Batter', power: 75, image: 'bookshelf_bg.jpg' },
    { id: 'L07', name: '林靖凱', team: 'Lions', rarity: 'R', role: 'Batter', power: 73, image: 'bookshelf_bg.jpg' },
    { id: 'L08', name: '潘傑楷', team: 'Lions', rarity: 'R', role: 'Pitcher', power: 77, image: 'bookshelf_bg.jpg' },
    { id: 'L09', name: '陳韻文', team: 'Lions', rarity: 'R', role: 'Pitcher', power: 74, image: 'bookshelf_bg.jpg' },
    { id: 'L10', name: '獅帝芬', team: 'Lions', rarity: 'N', role: 'Pitcher', power: 68, image: 'bookshelf_bg.jpg' },
    { id: 'L11', name: '黃竣彥', team: 'Lions', rarity: 'N', role: 'Pitcher', power: 60, image: 'bookshelf_bg.jpg' },
    { id: 'L12', name: '林易霆', team: 'Lions', rarity: 'N', role: 'Pitcher', power: 58, image: 'bookshelf_bg.jpg' },
    { id: 'L13', name: '田子杰', team: 'Lions', rarity: 'N', role: 'Batter', power: 65, image: 'bookshelf_bg.jpg' },
    { id: 'L14', name: '王鏡銘', team: 'Lions', rarity: 'N', role: 'Pitcher', power: 66, image: 'bookshelf_bg.jpg' },
    { id: 'L15', name: '劉予承', team: 'Lions', rarity: 'N', role: 'Pitcher', power: 62, image: 'bookshelf_bg.jpg' },
    { id: 'L16', name: '李其峰', team: 'Lions', rarity: 'N', role: 'Pitcher', power: 63, image: 'bookshelf_bg.jpg' },

    // 【樂天桃猿】
    { id: 'M01', name: '林立', team: 'Monkeys', rarity: 'SSR', role: 'Batter', power: 97, image: 'bookshelf_bg.jpg' },
    { id: 'M02', name: '廖健富', team: 'Monkeys', rarity: 'SR', role: 'Batter', power: 89, image: 'bookshelf_bg.jpg' },
    { id: 'M03', name: '毛英傑', team: 'Monkeys', rarity: 'SR', role: 'Batter', power: 85, image: 'bookshelf_bg.jpg' },
    { id: 'M04', name: '陳晨威', team: 'Monkeys', rarity: 'SR', role: 'Batter', power: 82, image: 'bookshelf_bg.jpg' },
    { id: 'M05', name: '林泓育', team: 'Monkeys', rarity: 'R', role: 'Batter', power: 76, image: 'bookshelf_bg.jpg' },
    { id: 'M06', name: '梁家榮', team: 'Monkeys', rarity: 'R', role: 'Batter', power: 74, image: 'bookshelf_bg.jpg' },
    { id: 'M07', name: '朱承洋', team: 'Monkeys', rarity: 'R', role: 'Pitcher', power: 78, image: 'bookshelf_bg.jpg' },
    { id: 'M08', name: '陳冠宇', team: 'Monkeys', rarity: 'R', role: 'Pitcher', power: 73, image: 'bookshelf_bg.jpg' },
    { id: 'M09', name: '威能帝', team: 'Monkeys', rarity: 'R', role: 'Pitcher', power: 75, image: 'bookshelf_bg.jpg' },
    { id: 'M10', name: '林承飛', team: 'Monkeys', rarity: 'N', role: 'Batter', power: 67, image: 'bookshelf_bg.jpg' },
    { id: 'M11', name: '嚴宏鈞', team: 'Monkeys', rarity: 'N', role: 'Batter', power: 60, image: 'bookshelf_bg.jpg' },
    { id: 'M12', name: '成晉', team: 'Monkeys', rarity: 'N', role: 'Batter', power: 64, image: 'bookshelf_bg.jpg' },
    { id: 'M13', name: '邱鑫', team: 'Monkeys', rarity: 'N', role: 'Batter', power: 59, image: 'bookshelf_bg.jpg' },
    { id: 'M14', name: '陳柏豪', team: 'Monkeys', rarity: 'N', role: 'Pitcher', power: 68, image: 'bookshelf_bg.jpg' },
    { id: 'M15', name: '曾家輝', team: 'Monkeys', rarity: 'N', role: 'Pitcher', power: 65, image: 'bookshelf_bg.jpg' },
    { id: 'M16', name: '董順傑', team: 'Monkeys', rarity: 'N', role: 'Pitcher', power: 63, image: 'bookshelf_bg.jpg' },

    // 【富邦悍將】
    { id: 'G01', name: '范國宸', team: 'Guardians', rarity: 'SSR', role: 'Batter', power: 95, image: 'bookshelf_bg.jpg' },
    { id: 'G02', name: '戴培峰', team: 'Guardians', rarity: 'SR', role: 'Batter', power: 83, image: 'bookshelf_bg.jpg' },
    { id: 'G03', name: '申皓瑋', team: 'Guardians', rarity: 'SR', role: 'Batter', power: 84, image: 'bookshelf_bg.jpg' },
    { id: 'G04', name: '曾峻岳', team: 'Guardians', rarity: 'SR', role: 'Pitcher', power: 88, image: 'bookshelf_bg.jpg' },
    { id: 'G05', name: '王正棠', team: 'Guardians', rarity: 'R', role: 'Batter', power: 75, image: 'bookshelf_bg.jpg' },
    { id: 'G06', name: '李宗賢', team: 'Guardians', rarity: 'R', role: 'Batter', power: 71, image: 'bookshelf_bg.jpg' },
    { id: 'G07', name: '高國麟', team: 'Guardians', rarity: 'R', role: 'Batter', power: 73, image: 'bookshelf_bg.jpg' },
    { id: 'G08', name: '陳仕朋', team: 'Guardians', rarity: 'R', role: 'Pitcher', power: 76, image: 'bookshelf_bg.jpg' },
    { id: 'G09', name: '高捷', team: 'Guardians', rarity: 'R', role: 'Batter', power: 77, image: 'bookshelf_bg.jpg' },
    { id: 'G10', name: '池恩齊', team: 'Guardians', rarity: 'N', role: 'Batter', power: 62, image: 'bookshelf_bg.jpg' },
    { id: 'G11', name: '林哲瑄', team: 'Guardians', rarity: 'N', role: 'Batter', power: 64, image: 'bookshelf_bg.jpg' },
    { id: 'G12', name: '王苡丞', team: 'Guardians', rarity: 'N', role: 'Batter', power: 58, image: 'bookshelf_bg.jpg' },
    { id: 'G13', name: '周佳樂', team: 'Guardians', rarity: 'N', role: 'Pitcher', power: 56, image: 'bookshelf_bg.jpg' }, // 企劃書標示為投手
    { id: 'G14', name: '黃保羅', team: 'Guardians', rarity: 'N', role: 'Pitcher', power: 68, image: 'bookshelf_bg.jpg' },
    { id: 'G15', name: '邦力多', team: 'Guardians', rarity: 'N', role: 'Batter', power: 67, image: 'bookshelf_bg.jpg' },
    { id: 'G16', name: '石梓霖', team: 'Guardians', rarity: 'N', role: 'Pitcher', power: 63, image: 'bookshelf_bg.jpg' },

    // 【味全龍】
    { id: 'D01', name: '劉基鴻', team: 'Dragons', rarity: 'SSR', role: 'Batter', power: 96, image: 'bookshelf_bg.jpg' },
    { id: 'D02', name: '吉力吉撈．鞏冠', team: 'Dragons', rarity: 'SR', role: 'Batter', power: 88, image: 'bookshelf_bg.jpg' },
    { id: 'D03', name: '郭天信', team: 'Dragons', rarity: 'SR', role: 'Batter', power: 85, image: 'bookshelf_bg.jpg' },
    { id: 'D04', name: '王伯洋', team: 'Dragons', rarity: 'SR', role: 'Pitcher', power: 90, image: 'bookshelf_bg.jpg' },
    { id: 'D05', name: '李凱威', team: 'Dragons', rarity: 'R', role: 'Batter', power: 76, image: 'bookshelf_bg.jpg' },
    { id: 'D06', name: '拿莫．伊漾', team: 'Dragons', rarity: 'R', role: 'Batter', power: 70, image: 'bookshelf_bg.jpg' },
    { id: 'D07', name: '吳俊杰', team: 'Dragons', rarity: 'R', role: 'Pitcher', power: 74, image: 'bookshelf_bg.jpg' },
    { id: 'D08', name: '黃柏豪', team: 'Dragons', rarity: 'R', role: 'Batter', power: 75, image: 'bookshelf_bg.jpg' },
    { id: 'D09', name: '鋼龍', team: 'Dragons', rarity: 'R', role: 'Pitcher', power: 78, image: 'bookshelf_bg.jpg' },
    { id: 'D10', name: '張政禹', team: 'Dragons', rarity: 'N', role: 'Batter', power: 61, image: 'bookshelf_bg.jpg' },
    { id: 'D11', name: '蔣少宏', team: 'Dragons', rarity: 'N', role: 'Batter', power: 63, image: 'bookshelf_bg.jpg' },
    { id: 'D12', name: '趙璟榮', team: 'Dragons', rarity: 'N', role: 'Pitcher', power: 57, image: 'bookshelf_bg.jpg' },
    { id: 'D13', name: '林孝程', team: 'Dragons', rarity: 'N', role: 'Batter', power: 62, image: 'bookshelf_bg.jpg' },
    { id: 'D14', name: '陳冠偉', team: 'Dragons', rarity: 'N', role: 'Pitcher', power: 68, image: 'bookshelf_bg.jpg' },
    { id: 'D15', name: '楊鈺翔', team: 'Dragons', rarity: 'N', role: 'Pitcher', power: 64, image: 'bookshelf_bg.jpg' },
    { id: 'D16', name: '伍鐸', team: 'Dragons', rarity: 'N', role: 'Pitcher', power: 67, image: 'bookshelf_bg.jpg' },

    // 【台鋼雄鷹】
    { id: 'H01', name: '王柏融', team: 'Hawks', rarity: 'SSR', role: 'Batter', power: 100, image: 'bookshelf_bg.jpg' },
    { id: 'H02', name: '曾子祐', team: 'Hawks', rarity: 'SR', role: 'Batter', power: 82, image: 'bookshelf_bg.jpg' },
    { id: 'H03', name: '韋宏亮', team: 'Hawks', rarity: 'SR', role: 'Pitcher', power: 80, image: 'bookshelf_bg.jpg' },
    { id: 'H04', name: '陳正毅', team: 'Hawks', rarity: 'SR', role: 'Pitcher', power: 81, image: 'bookshelf_bg.jpg' },
    { id: 'H05', name: '葉保弟', team: 'Hawks', rarity: 'R', role: 'Batter', power: 72, image: 'bookshelf_bg.jpg' },
    { id: 'H06', name: '杜家明', team: 'Hawks', rarity: 'R', role: 'Batter', power: 70, image: 'bookshelf_bg.jpg' },
    { id: 'H07', name: '魔鷹', team: 'Hawks', rarity: 'R', role: 'Batter', power: 77, image: 'bookshelf_bg.jpg' },
    { id: 'H08', name: '伍祐城', team: 'Hawks', rarity: 'R', role: 'Pitcher', power: 71, image: 'bookshelf_bg.jpg' },
    { id: 'H09', name: '施子謙', team: 'Hawks', rarity: 'R', role: 'Pitcher', power: 73, image: 'bookshelf_bg.jpg' },
    { id: 'H10', name: '郭永維', team: 'Hawks', rarity: 'N', role: 'Batter', power: 63, image: 'bookshelf_bg.jpg' },
    { id: 'H11', name: '張肇元', team: 'Hawks', rarity: 'N', role: 'Batter', power: 59, image: 'bookshelf_bg.jpg' },
    { id: 'H12', name: '紀慶然', team: 'Hawks', rarity: 'N', role: 'Batter', power: 57, image: 'bookshelf_bg.jpg' },
    { id: 'H13', name: '許育銘', team: 'Hawks', rarity: 'N', role: 'Pitcher', power: 56, image: 'bookshelf_bg.jpg' },
    { id: 'H14', name: '顏清浤', team: 'Hawks', rarity: 'N', role: 'Batter', power: 55, image: 'bookshelf_bg.jpg' },
    { id: 'H15', name: '陳宇宏', team: 'Hawks', rarity: 'N', role: 'Pitcher', power: 61, image: 'bookshelf_bg.jpg' },
    { id: 'H16', name: '廖奕安', team: 'Hawks', rarity: 'N', role: 'Batter', power: 64, image: 'bookshelf_bg.jpg' } // 企劃書標示為打者
];

    // 全域變數
    let myName = "";
    let myPlayerId = ""; 
    let currentRoomId = "";
    
    let myDraftDeck = []; // 玩家選出的 5 張牌
    let myMathBuff = 0;

    // 畫面元素
    const loginScreen = document.getElementById('login-screen');
    const mainApp = document.getElementById('main-battle-app');
    const lobbyView = document.getElementById('lobby-view');
    const deckBuildingView = document.getElementById('deck-building-view');
    const battlefieldView = document.getElementById('battlefield-view');

    // ==========================================
    // 登入
    // ==========================================
    document.getElementById('btn-login').addEventListener('click', () => {
        const name = document.getElementById('login-username').value.trim();
        if(name) {
            myName = name;
            document.getElementById('current-user-display').innerText = myName;
            document.getElementById('my-name-display').innerText = myName;
            loginScreen.style.display = 'none';
            mainApp.style.display = 'block';
        }
    });

    // ==========================================
    // 大廳：建立與加入房間
    // ==========================================
    document.getElementById('btn-create-room').addEventListener('click', () => {
        currentRoomId = Math.floor(1000 + Math.random() * 9000).toString();
        myPlayerId = "p1";
        
        db.ref('rooms/' + currentRoomId).set({
            p1: { name: myName, ready: false, score: 0, deck: [], selectedCard: null, mathBuff: 0, mathDone: false },
            p2: null,
            state: "drafting" // drafting -> picking -> math -> reveal
        });

        enterDeckBuilding();
        listenToRoom();
    });

    document.getElementById('btn-join-room').addEventListener('click', () => {
        const joinId = document.getElementById('join-room-id').value.trim();
        if(!joinId) return;

        db.ref('rooms/' + joinId).once('value', (snapshot) => {
            if(snapshot.exists() && snapshot.val().p2 === null) {
                currentRoomId = joinId;
                myPlayerId = "p2";
                
                db.ref('rooms/' + currentRoomId + '/p2').set({
                    name: myName, ready: false, score: 0, deck: [], selectedCard: null, mathBuff: 0, mathDone: false
                });

                enterDeckBuilding();
                listenToRoom();
            } else {
                document.getElementById('lobby-message').innerText = "找不到房間或房間已滿！";
            }
        });
    });

    // ==========================================
    // 選牌階段 (Drafting)
    // ==========================================
    function enterDeckBuilding() {
        lobbyView.style.display = 'none';
        deckBuildingView.style.display = 'block';
        document.getElementById('display-room-id').innerText = currentRoomId;
        renderDeckSelectionGrid();
    }

    function renderDeckSelectionGrid() {
        const grid = document.getElementById('deck-selection-grid');
        grid.innerHTML = "";
        myDraftDeck = [];
        updateDeckStatus();

        // 顯示所有卡片供選擇 (這裡假設全部擁有，若要連動試算表卡冊可在此過濾)
        cardMasterList.forEach(card => {
            const cardEl = document.createElement('div');
            cardEl.className = `card-small-wrapper reveal-${card.rarity} deck-card-wrapper`;
            cardEl.innerHTML = `
                <div class="card-small-inner">
                    <img src="${card.image}" alt="${card.name}">
                </div>
                <div style="color:white; text-align:center; font-size:0.9em; margin-top:5px; background:rgba(0,0,0,0.7); border-radius:5px;">
                    ${card.role === 'Batter' ? '打' : '投'} : ${card.power}
                </div>
            `;

            cardEl.onclick = () => {
                const index = myDraftDeck.findIndex(c => c.id === card.id);
                if (index > -1) {
                    // 取消選取
                    myDraftDeck.splice(index, 1);
                    cardEl.classList.remove('selected');
                } else {
                    // 新增選取
                    if(myDraftDeck.length < 5) {
                        myDraftDeck.push(card);
                        cardEl.classList.add('selected');
                    } else {
                        alert("只能選 5 張牌喔！");
                    }
                }
                updateDeckStatus();
            };
            grid.appendChild(cardEl);
        });
    }

    function updateDeckStatus() {
        const pCount = myDraftDeck.filter(c => c.role === 'Pitcher').length;
        const bCount = myDraftDeck.filter(c => c.role === 'Batter').length;
        
        document.getElementById('deck-count').innerText = myDraftDeck.length;
        
        const pBadge = document.getElementById('req-pitcher');
        pBadge.innerText = `投手 (${pCount}/2)`;
        pCount >= 2 ? pBadge.classList.add('met') : pBadge.classList.remove('met');

        const bBadge = document.getElementById('req-batter');
        bBadge.innerText = `打者 (${bCount}/2)`;
        bCount >= 2 ? bBadge.classList.add('met') : bBadge.classList.remove('met');

        const readyBtn = document.getElementById('btn-ready');
        if (myDraftDeck.length === 5 && pCount >= 2 && bCount >= 2) {
            readyBtn.disabled = false;
            readyBtn.innerText = "出戰陣容確認！";
        } else {
            readyBtn.disabled = true;
            readyBtn.innerText = "等待規則符合...";
        }
    }

    // 按下準備按鈕
    document.getElementById('btn-ready').addEventListener('click', () => {
        document.getElementById('btn-ready').style.display = 'none';
        document.getElementById('waiting-msg').style.display = 'block';
        
        // 將選好的牌和準備狀態寫入 Firebase
        db.ref(`rooms/${currentRoomId}/${myPlayerId}`).update({
            deck: myDraftDeck,
            ready: true
        });
    });


    // ==========================================
    // 遊戲核心狀態監聽 (即時同步)
    // ==========================================
    function listenToRoom() {
        db.ref('rooms/' + currentRoomId).on('value', (snapshot) => {
            const roomData = snapshot.val();
            if(!roomData) return;

            const opponentId = myPlayerId === "p1" ? "p2" : "p1";
            const me = roomData[myPlayerId];
            const opponent = roomData[opponentId];

            if(opponent) {
                document.getElementById('opponent-name').innerText = opponent.name;
                document.getElementById('opponent-score').innerText = opponent.score;
            }
            document.getElementById('player-score').innerText = me.score;

            // --- 狀態機切換 ---
            
            // 1. 雙方都選好牌了 -> 切換到戰鬥畫面 (picking)
            if (roomData.state === "drafting" && me.ready && opponent && opponent.ready) {
                if (myPlayerId === "p1") db.ref('rooms/' + currentRoomId + '/state').set("picking");
                
                deckBuildingView.style.display = 'none';
                battlefieldView.style.display = 'block';
                renderBattleHand(me.deck); // 畫出手牌
            }

            // 2. 出牌階段
            if (roomData.state === "picking") {
                document.getElementById('battle-status').innerText = "⚔️ 請選擇一張卡牌出戰！";
                renderOpponentHand(opponent);
                
                // 若雙方都出牌，進入數學階段
                if (me.selectedCard && opponent && opponent.selectedCard) {
                    if (myPlayerId === "p1") db.ref('rooms/' + currentRoomId + '/state').set("math");
                }
            }

            // 3. 數學戰術階段
            if (roomData.state === "math") {
                document.getElementById('battle-status').innerText = "📝 戰鬥暫停！戰術計算中...";
                if (document.getElementById('math-modal').style.display === 'none' && !me.mathDone) {
                    triggerMathChallenge();
                }

                // 若雙方都算完，進入開牌
                if (me.mathDone && opponent && opponent.mathDone) {
                    if (myPlayerId === "p1") db.ref('rooms/' + currentRoomId + '/state').set("reveal");
                }
            }

            // 4. 開牌結算階段
            if (roomData.state === "reveal") {
                document.getElementById('battle-status').innerText = "🔥 戰鬥結算！";
                showRevealAnimation(me, opponent);
            }
        });
    }

    // ==========================================
    // 戰鬥區畫面渲染
    // ==========================================
    function renderBattleHand(deck) {
        const handDiv = document.getElementById('player-hand');
        handDiv.innerHTML = "";
        
        // 只顯示還沒被用掉的牌 (如果未來要實作消耗機制)
        deck.forEach((card, index) => {
            const cardEl = document.createElement('div');
            cardEl.className = `card-small-wrapper reveal-${card.rarity} battle-card`;
            cardEl.innerHTML = `
                <div class="card-small-inner">
                    <img src="${card.image}">
                </div>
                <div style="color:white; text-align:center; font-size:0.9em; margin-top:5px; background:rgba(0,0,0,0.7); border-radius:5px;">
                    ${card.role === 'Batter' ? '打' : '投'}:${card.power}
                </div>
            `;
            
            cardEl.onclick = () => {
                db.ref(`rooms/${currentRoomId}/${myPlayerId}/selectedCard`).set(card);
                handDiv.innerHTML = "<h3 class='glow-text-gold'>已出牌，等待對手...</h3>";
            };
            handDiv.appendChild(cardEl);
        });
    }

    function renderOpponentHand(opponent) {
        const handDiv = document.getElementById('opponent-hand');
        if(!opponent) return;
        
        if(opponent.selectedCard) {
            handDiv.innerHTML = `<div class="card-back" style="width:100px; height:150px; border:2px solid #2ecc71;">準備就緒</div>`;
        } else {
            handDiv.innerHTML = `<div class="card-back" style="width:100px; height:150px; opacity:0.5;">思考中...</div>`;
        }
    }

    // ==========================================
    // 數學戰術系統
    // ==========================================
    const mathModal = document.getElementById('math-modal');
    let currentCorrectAnswer = 0;

    function triggerMathChallenge() {
        const a = Math.floor(Math.random() * 5) + 1; 
        const x = Math.floor(Math.random() * 10) + 1; 
        const b = Math.floor(Math.random() * 20) + 1; 
        const c = (a * x) + b;

        document.getElementById('math-question').innerText = `${a}x + ${b} = ${c}`;
        currentCorrectAnswer = x;
        
        document.getElementById('math-answer').value = "";
        document.getElementById('math-feedback').innerText = "";
        mathModal.style.display = 'flex';
    }

    document.getElementById('btn-submit-math').addEventListener('click', () => {
        const userAnswer = parseInt(document.getElementById('math-answer').value);
        const feedback = document.getElementById('math-feedback');
        
        if (userAnswer === currentCorrectAnswer) {
            feedback.style.color = "#2ecc71";
            feedback.innerText = "正確！戰力 +20！";
            myMathBuff = 20;
        } else {
            feedback.style.color = "#FF4136";
            feedback.innerText = `錯誤！答案是 ${currentCorrectAnswer}。`;
            myMathBuff = 0;
        }

        setTimeout(() => {
            mathModal.style.display = 'none';
            db.ref(`rooms/${currentRoomId}/${myPlayerId}`).update({
                mathBuff: myMathBuff,
                mathDone: true
            });
        }, 1500);
    });

    // ==========================================
    // 結算畫面
    // ==========================================
    function showRevealAnimation(me, opponent) {
        const myFinalPower = me.selectedCard.power + me.mathBuff;
        const opFinalPower = opponent.selectedCard.power + opponent.mathBuff;

        const clashArea = document.querySelector('.clash-area');
        clashArea.innerHTML = `
            <div style="display:flex; justify-content:center; align-items:center; gap:40px; color:white;">
                <div style="text-align:center;">
                    <h4 class="glow-text-gold">我方</h4>
                    <div class="card-small-wrapper reveal-${me.selectedCard.rarity}"><img src="${me.selectedCard.image}" style="width:100%;height:100%;"></div>
                    <p style="margin:5px 0;">基礎 ${me.selectedCard.power} + 戰術 ${me.mathBuff}</p>
                    <h2 class="glow-text-red">總計: ${myFinalPower}</h2>
                </div>
                <div><h1 style="color:red; text-shadow:0 0 10px red; font-size:3em; font-style:italic;">VS</h1></div>
                <div style="text-align:center;">
                    <h4 class="glow-text-gold">對手</h4>
                    <div class="card-small-wrapper reveal-${opponent.selectedCard.rarity}"><img src="${opponent.selectedCard.image}" style="width:100%;height:100%;"></div>
                    <p style="margin:5px 0;">基礎 ${opponent.selectedCard.power} + 戰術 ${opponent.mathBuff}</p>
                    <h2 class="glow-text-red">總計: ${opFinalPower}</h2>
                </div>
            </div>
            <h1 id="round-result" style="color:white; margin-top:20px; font-size:2.5em; text-shadow:0 0 10px white;"></h1>
            <button id="btn-next-round" class="battle-btn create-btn" style="width:250px; display:none;">下一回合</button>
        `;

        const resultEl = document.getElementById('round-result');
        const nextBtn = document.getElementById('btn-next-round');

        if(myFinalPower > opFinalPower) {
            resultEl.innerText = "🏆 你贏了本回合！";
            if(myPlayerId === "p1") db.ref(`rooms/${currentRoomId}/p1/score`).set(me.score + 1);
        } else if (myFinalPower < opFinalPower) {
            resultEl.innerText = "💀 對手拿下本回合！";
            if(myPlayerId === "p1") db.ref(`rooms/${currentRoomId}/p2/score`).set(opponent.score + 1);
        } else {
            resultEl.innerText = "🤝 勢均力敵！平手！";
        }

        setTimeout(() => { nextBtn.style.display = 'inline-block'; }, 2000);

        nextBtn.onclick = () => {
            db.ref(`rooms/${currentRoomId}/${myPlayerId}`).update({
                selectedCard: null, mathBuff: 0, mathDone: false
            });
            if(myPlayerId === "p1") db.ref(`rooms/${currentRoomId}/state`).set("picking");
            
            // 如果要實作消耗卡牌，可以在這裡把出過的牌從 me.deck 移出並重新 renderBattleHand
            // 這裡 MVP 先保留卡牌可重複出
            renderBattleHand(me.deck); 
            clashArea.innerHTML = `<h2 id="battle-status" class="glow-text-gold clash-text">準備下一回合...</h2>`;
        };
    }
});