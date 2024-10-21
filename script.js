let isReady = false;

const poemRowHeight = 24;

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
            prepareCanyonContent();
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
function prepareCanyonContent() {
    let content = document.getElementById('content');
    content.insertAdjacentHTML('beforeend',  `
    <p>Enter your number:</p>
    <input type="number" placeholder="321" id="inputForTuring">
    <buttom onclick="doLaunchTuringMachine()">Go!</buttom>
    `);
}
function doLaunchTuringMachine() {
    const input = getInputForTuringMachine();
    if (!isValid(input)) { return; }
    clearContent();
    const output = computeBinaryNumber(input);
    displayMachineFragments(input, output);
}

function displayMachineFragments(input, binaryNumber) {
    let content = document.getElementById('content');

    content.style.width = '80%';
    content.style.left = '10vw';

    content.insertAdjacentHTML('beforeend', `
    <div id="canyonPanel"></div>
    <div id="lent"></div>
    <div id="canyonTable"></div>
    `);

    displayLentForTuring(binaryNumber);
    displayCanyonPanel(input, binaryNumber);

    const table = document.getElementById('canyonTable');

    table.insertAdjacentHTML('beforeend', `
<table id="canyonTable">
    <thead>
    <tr>
        <th>Case</th>
        <th>q1</th>
        <th>q2</th>
        <th>q3</th>
        <th>q4</th>
        <th>q5</th>
        <th>q6</th>
        <th>q7</th>
        <th>q8</th>
        <th>q9</th>
        <th>q10</th>
        <th>q11</th>
        <th>q12</th>
        <th>q13</th>
        <th>q14</th>
        <th>q15</th>
        <th>q16</th>
        <th>q17</th>
        <th>q18</th>
        <th>q19</th>
        <th>q20</th>
        <th>q21</th>
        <th>q22</th>
        <th>q23</th>
        <th>q24</th>
        <th>q25</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>1</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>0</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>-</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    </tbody>
</table>
    `);
}
function displayCanyonPanel(input, binaryNumber) {
    const panel = document.getElementById('canyonPanel');

    panel.insertAdjacentHTML('beforeend', `
    <p>Input:</p>
    <p>${input}</p><br>
    <p>Expected:</p>
    <p>${binaryNumber}</p>
    `);
}
function displayLentForTuring(binaryNumber) {
    const lent = document.getElementById('lent');

    const lentTable = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('body');

    lentTable.setAttribute('id', 'lentTable');
    thead.setAttribute('id', 'lentHead');
    tbody.setAttribute('id', 'lentBody');

    lent.appendChild(lentTable);
    lentTable.appendChild(thead);
    lentTable.appendChild(tbody);

    let headRow = document.createElement('tr');
    let bodyRow = document.createElement('tr');

    thead.appendChild(headRow);
    tbody.appendChild(bodyRow);

    let cell;
    let countCell;
    for (let i = 0; i < 30; ++i) {
        cell = document.createElement('th');
        cell.setAttribute('class', 'lentTh');
        countCell = i + 1;
        cell.textContent = countCell.toString();
        headRow.appendChild(cell);

        cell = document.createElement('td');
        cell.setAttribute('class', 'lentTd');
        cell.setAttribute('id', `cell_${countCell}`);
        if (i < binaryNumber.length) {
            cell.textContent = binaryNumber.charAt(i);
        }
        bodyRow.appendChild(cell);
    }
    lent.style.marginTop = '100px';
    lent.style.marginBottom = '70px';
}

function computeBinaryNumber(input) {
    return toDecimal(input).toString(2);
}

function toDecimal(input) {
    input.toString();
    let decimal = 0;
    for (let i = 0; i < input.length; ++i) {
        decimal += Math.pow(4, input.length - i - 1) * parseInt(input[i]);
    }
    //alert('decimal = ' + decimal + ' -- length = ' + input.length);
    return decimal;
}

function isValid(input) {

    const set = new Set();
    set.add('0');
    set.add('1');
    set.add('2');
    set.add('3');

    for (let i = 0; i < input.length; ++i) {
        if (!set.has(input.charAt(i))) {
            alert('invalid input: ' + input[i]);
            return false;
        }
    }
    if (toDecimal(input) > 25) {
        alert('too big');
        return false;
    }
    input = input.toString();
    if (input[0] === '0') {
        alert(`incompatible first char '${input[0]}'`);
        return false
    }
    return true;
}
function getInputForTuringMachine() {
    let input = document.getElementById('inputForTuring');
    return input.value;
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
    cacheSet.clear();
}

async function displayRandomizedMap() {
    prepareRandomizedMap();
    clearContent();
    pasteOrderButton();
    poemRows = document.getElementById("content").getElementsByTagName("p");
    let content = document.getElementById("content");
    let i = 1;
    while (i <= 75) {
        const child = document.createElement("p");
        child.classList.add("poemRow");
        let value = mapForInteger.get(randomizedMap.get(i));
        if (value !== undefined) {
            child.setAttribute('id', `${i}`);
            child.style.top = `${75 + poemRowHeight * (i - 1)}px`;
            child.style.height = `${poemRowHeight}px`;
            child.textContent = `${i + ' ' + value}`;
            content.appendChild(child);
        }
        i++;
    }
}

function displayLegalMap() {
    clearContent();
    prepareLegalMap();
    let content = document.getElementById("content");
    let i = 1;
    while (i <= 75) {
        const child = document.createElement("p");
        child.classList.add("poemRow");
        let value = mapForInteger.get(i);
        if (value !== undefined) {
            child.style.top = `${75 + poemRowHeight * (i - 1)}px`;
            child.style.height = `${poemRowHeight}px`;
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
    button.setAttribute("onclick", "sortPoem()");
    content.appendChild(button);
    button.addEventListener("onclick", sortPoem);
}

function clearContent() {
    window.removeEventListener('resize', prepareFormStyles);
    let content = document.getElementById("content");
    let children = content.children;
    while (children.length > 0) {
        children[0].remove();
    }
}

let poemRows;
let previousKeeper, currentKeeper;
let a, b;
function swap(currentElem, previousElem) {

    previousKeeper = randomizedMap.get(previousElem);
    currentKeeper = randomizedMap.get(currentElem);

    randomizedMap.delete(previousElem);
    randomizedMap.delete(currentElem);

    randomizedMap.set(previousElem, currentKeeper);
    randomizedMap.set(currentElem, previousKeeper);

    a = document.getElementById(`${currentElem}`);
    a.removeAttribute('id');
    a.setAttribute('id', `${previousElem}`);
    a.style.top = `${75 + (previousElem - 1) * poemRowHeight}px`;
    b = document.getElementById(`${previousElem}`);
    b.removeAttribute('id');
    b.setAttribute('id', `${currentElem}`);
    b.style.top = `${75 + (currentElem - 1) * poemRowHeight}px`;

    //poemRows.item(currentElem - 1).style.top = `${75 + (previousElem - 1) * poemRowHeight}px`;
    //poemRows.item(previousElem - 1).style.top = `${75 + (currentElem - 1) * poemRowHeight}px`;

    // todo: animate paragraphs
}

async function sortPoem() {

    let shouldWeMakeAnotherIteration = true;
    let currentElem;
    let previousElem;

    while (shouldWeMakeAnotherIteration) {
        shouldWeMakeAnotherIteration = false;
        currentElem = 2;
        previousElem = 1;

        while (currentElem <= 75) {
            await sleep(3);
            if (randomizedMap.get(currentElem) < randomizedMap.get(previousElem)) {
                shouldWeMakeAnotherIteration = true;
                swap(currentElem, previousElem);
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