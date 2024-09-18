let isReady = false;

const mapForInteger = new Map();
const randomizedMap = new Map();
const cacheSet = new Set();

function changeThemeTo(theme) {
    let container = document.getElementById("container");
    const content = document.getElementById("content");
    switch (theme) {
        case "space":
            clearContent();
            container.style.backgroundImage = 'url("space.jpg")';

            if (content.classList.contains('canyon')) {
                content.classList.remove("canyon");
            }
            if (content.classList.contains('forest')) {
                content.classList.remove("forest");
            }
            if (!content.classList.contains('space')) {
                content.classList.add("space");
            }
            break;
        case "canyon":
            clearContent();
            container.style.backgroundImage = 'url("canyon.jpg")';
            break;
        case "forest":
            clearContent();
            container.style.backgroundImage = 'url("forest.jpg")';
            const content = document.getElementById('content');
            content.insertAdjacentHTML('beforeend', `
            <form>
            <label for="arg">Enter argument</label>
            <input id="arg" type="number" placeholder="69">
            <label for="result">Result</label>
            <input id="result" type="text" placeholder="result" disabled>
            <button id="FibonacciButton" type="button" onclick="countFibonacciNumber()">Count!</button>
            </form>
            `);
            prepareFormStyles();
            window.addEventListener('resize', prepareFormStyles);
            break;
    }
}

function decorateInputFields(form) {
    let inputsCollection = form.getElementsByTagName('input');
    for (let i = 0; i < inputsCollection.length; ++i) {
        inputsCollection.item(i).style.paddingLeft = '5px';
    }
}

function prepareFormStyles() {                                        // For forest
    let content = document.getElementById("content");
    let form = content.getElementsByTagName("form").item(0);
    let resultLabel = form.getElementsByTagName("label").item(1);

    let windowHeight = window.innerHeight;
    let windowWidth = window.innerWidth;

    decorateInputFields(form);

    form.style.fontSize = `${5 + windowWidth * 0.012}px`;
    form.style.fontFamily = 'sans-serif';
    form.style.display = 'block';
    form.style.position = 'fixed';
    form.style.top = `${windowHeight * 0.2}px`;
    form.style.left = `${windowWidth * 0.4}px`;
    form.style.width = `${windowWidth * 0.2}px`;
    form.style.height = `${windowHeight * 0.3}px`;
    form.style.fontFamily = "sans-serif";
    form.style.fontWeight = 'bold';
    form.style.color = 'darkorchid';

    resultLabel.style.marginTop = "5%";
}

function countFibonacciNumber() {
    let argInput = document.getElementById("arg");
    let output = document.getElementById("result");
    let previousNumber = BigInt("1"), currentNumber = BigInt("1"), keeper = BigInt("1");

    let arg = parseInt(argInput.value);

    if (isNaN(arg) || arg < 1) {
        output.value = "Invalid input";
        return;
    }
    if (arg === 1) {
        output.value = "0";
        return;
    }
    if (arg === 2|| arg === 3) {
        output.value = "1";
        return;
    }

    arg -= 3;

    while (arg !== 0) {
        keeper = currentNumber;
        currentNumber += previousNumber;
        previousNumber = keeper;
        --arg;
    }
    output.value = `${currentNumber}`;
}

function sleep(ms) {
    return new Promise(resolve => {
        const intervalId = setInterval(() => {
            clearInterval(intervalId);
            resolve();
        }, ms);
    });
}

function prepareRandomizedMap() {
    prepareLegalMap();
    cacheSet.clear();
    let index = 55;
    while (cacheSet.size < 55) {
        let value = Math.floor(Math.random() * 75) + 1; // generates random int from 1 to 75
        if (!cacheSet.has(value)) {
            cacheSet.add(value);
            randomizedMap.set(cacheSet.size, value);
        }
    }
    let legalMapKeys = mapForInteger.keys();
    for (let key of legalMapKeys) {
        if (!cacheSet.has(key)) {
            randomizedMap.set(++index, key);
        }
    }
}

async function displayRandomizedMap() {
    prepareRandomizedMap();
    clearContent();
    pasteOrderButton();
    let content = document.getElementById("content");
    let i = 1;
    while (i <= 75) {
        const child = document.createElement("p");
        child.classList.add("row");
        let value = mapForInteger.get(randomizedMap.get(i));
        if (value !== undefined) {
            child.textContent = value;
            content.appendChild(child);
        }
        i++;
    }
}

function displayLegalMap() {
    clearContent();
    sleep(100);
    prepareLegalMap();
    let content = document.getElementById("content");
    let i = 1;
    while (i <= 75) {
        const child = document.createElement("p");
        child.classList.add("row");
        let value = mapForInteger.get(i);
        if (value !== undefined) {
            child.textContent = value;
            content.appendChild(child);
        }
        i++;
    }
}

function pasteOrderButton() {
    let content = document.getElementById("content");
    let button = document.createElement("button");
    button.textContent = "Order";
    button.setAttribute("id", "orderButton");
    button.setAttribute("onclick", "orderRandomizedMap()");
    content.appendChild(button);
}

function clearContent() {
    window.removeEventListener('resize', prepareFormStyles);
    let content = document.getElementById("content");
    let children = content.children;
    while (children.length > 0) {
        children[0].remove();
    }
}

function swap(currentElem, previousElem) {
    let mediator = randomizedMap.get(previousElem);
    randomizedMap.set(previousElem, randomizedMap.get(currentElem));
    randomizedMap.set(currentElem, mediator);

    // todo: animate paragraphs
}

function sortPoem() {
    let shouldWeMakeAnotherIteration = true;
    while (shouldWeMakeAnotherIteration) {
        shouldWeMakeAnotherIteration = false;
        let currentElem = 2;
        let previousElem = 1;
        while (currentElem <= 75) {
            if (randomizedMap.get(currentElem) < randomizedMap.get(previousElem)) {
                shouldWeMakeAnotherIteration = true;
                swap(currentElem, previousElem);
                sleep(100);
            }
            ++currentElem;
            ++previousElem;
        }
    }
}

function prepareLegalMap() {
    if (!isReady) {
        mapForInteger.set(1, "У лукоморья дуб зелёный");
        mapForInteger.set(2, "Златая цепь на дубе том:");
        mapForInteger.set(3, "И днём и ночью кот учёный");
        mapForInteger.set(4, "Всё ходит по цепи кругом");
        mapForInteger.set(5, "Идёт направо - песнь заводит,");
        mapForInteger.set(6, "Налево - сказку говорит.");
        mapForInteger.set(7, "Там чудеса: там леший бродит,");
        mapForInteger.set(8, "Русалка на ветвях сидит");
        mapForInteger.set(9, "Там на неведомых дорожках");
        mapForInteger.set(10, "Следы невиданных зверей");

        mapForInteger.set(11, "Избушка там на курьих ножках");
        mapForInteger.set(12, "Стоит без окон, без дверей,");
        mapForInteger.set(13, "Там лес и дол видений полны");
        mapForInteger.set(14, "Там о заре прихлынут волны,");
        mapForInteger.set(15, "На брег песчаный и пустой,");
        mapForInteger.set(16, "И тридцать витязей прекрасных");
        mapForInteger.set(17, "Чредой из вод выходят ясных,");
        mapForInteger.set(18, "Там королевич мимоходом");
        mapForInteger.set(19, "Пленяет грозного царя");
        mapForInteger.set(20, "Там в облаках перед народом");

        mapForInteger.set(21, "Через леса, через моря");
        mapForInteger.set(22, "Колдун несет богатыря");
        mapForInteger.set(23, "В темнице там царевна тужит,");
        mapForInteger.set(24, "А бурый волк ей верно служит");
        mapForInteger.set(25, "Там ступа с Бабою Ягой");
        mapForInteger.set(26, "Идет, бредет сама собой");
        mapForInteger.set(27, "Там царь Кащей над златом чахнет");
        mapForInteger.set(28, "Там русский дух… там Русью пахнет!");
        mapForInteger.set(29, "И там я был, и мед я пил");
        mapForInteger.set(30, "У моря видел дуб зеленый");

        mapForInteger.set(31, "Под ним сидел, и кот ученый");
        mapForInteger.set(32, "Свои мне сказки говорил.");
        mapForInteger.set(33, "Одну я помню: сказку эту");
        mapForInteger.set(34, "Поведаю теперь я свету…");
        mapForInteger.set(35, "Дела давно минувших дней,");
        mapForInteger.set(36, "Преданья старины глубокой.");
        mapForInteger.set(37, "В толпе могучих сыновей,");
        mapForInteger.set(38, "С друзьями, в гриднице высокой");
        mapForInteger.set(39, "Владимир-солнце пировал");
        mapForInteger.set(40, "Меньшую дочь он выдавал");

        mapForInteger.set(41, "За князя храброго Руслана");
        mapForInteger.set(42, "И мед из тяжкого стакана");
        mapForInteger.set(43, "За их здоровье выпивал.");
        mapForInteger.set(44, "Не скоро ели предки наши,");
        mapForInteger.set(45, "Не скоро двигались кругом");
        mapForInteger.set(46, "Ковши, серебряные чаши");
        mapForInteger.set(47, "С кипящим пивом и вином.");
        mapForInteger.set(48, "Они веселье в сердце лили,");
        mapForInteger.set(49, "Шипела пена по краям,");
        mapForInteger.set(50, "Их важно чашники носили");

        mapForInteger.set(51, "И низко кланялись гостям.");
        mapForInteger.set(52, "Слились речи в шум невнятный");
        mapForInteger.set(53, "Жужжит гостей веселый круг");
        mapForInteger.set(54, "Но вдруг раздался глас приятный");
        mapForInteger.set(55, "И звонких гуслей беглый звук");
        mapForInteger.set(56, "Все смолкли, слушают Баяна:");
        mapForInteger.set(57, "И славит сладостный певец");
        mapForInteger.set(58, "Людмилу-прелесть, и Руслана,");
        mapForInteger.set(59, "И Лелем свитый им венец.");
        mapForInteger.set(60, "Но, страстью пылкой утомленный,");

        mapForInteger.set(61, "Не ест, не пьет Руслан влюбленный");
        mapForInteger.set(62, "На друга милого глядит,");
        mapForInteger.set(63, "Вздыхает, сердится, горит");
        mapForInteger.set(64, "И, щипля ус от нетерпенья,");
        mapForInteger.set(65, "Считает каждые мгновенья.");
        mapForInteger.set(66, "В уныньи, с пасмурным челом,");
        mapForInteger.set(67, "За шумным, свадебным столом");
        mapForInteger.set(68, "Сидят три витязя младые");
        mapForInteger.set(69, "Безмолвны, за ковшом пустым,");
        mapForInteger.set(70, "Забыли кубки круговые,");

        mapForInteger.set(71, "И брашна неприятны им");
        mapForInteger.set(72, "Не слышат вещего Баяна");
        mapForInteger.set(73, "Потупили смущенный взгляд:");
        mapForInteger.set(74, "То три соперника Руслана");
        mapForInteger.set(75, "В душе несчастные таят");

        isReady = true;
    }
}