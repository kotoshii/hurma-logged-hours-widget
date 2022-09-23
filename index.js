function getTodaysRecords() {
    const fomattedDate = new Date().toLocaleString('en-US', { month: 'short', day: 'numeric' });
    return [...document.getElementsByClassName('date-upload')].filter(
        (row) => row.firstChild.children[0].children[0].innerText === fomattedDate
    );
}

function getTimeFromRow(row) {
    return row.children[2].firstChild.innerText;
}

function parseTime(timeString) {
    const result = timeString.match(/((\d+)h)?\s?((\d+)m)?/i);

    const hours = parseInt(result[2]) || 0;
    const minutes = parseInt(result[4]) || 0;

    return [hours, minutes];
}

function getTotalMinutes() {
    return getTodaysRecords().reduce((total, row) => {
        const [hours, minutes] = parseTime(getTimeFromRow(row));
        return total + minutes + hours * 60;
    }, 0);
}

let totalTime = 0;

function updateText() {
    const textEl = document.getElementById('hours-widget-text');
    textEl.innerHTML = !totalTime
    ? 'No data. Press refresh button'
    : `Total for today on a current page: <b style="font-weight: 500">${totalTime} hours</b>`;
}

const refreshClickHandler = () => {
    totalTime = getTotalMinutes() / 60;
    updateText();
};

function init() {
    const widgetContainer = document.createElement('div');
    widgetContainer.style.marginTop = '-30px';
    widgetContainer.style.marginBottom = '16px';

    const text = document.createElement('span');
    text.id = 'hours-widget-text';
    text.style.margin = 0;
    text.style.fontSize = '21px';
    text.style.fontWeight = 100;

    const button = document.createElement('button');
    button.innerHTML = 'Refresh';
    button.onclick = refreshClickHandler;
    button.style.color = '#4a90e2';
    button.style.border = '1px solid #4a90e2';
    button.style.marginLeft = '16px';
    button.style.borderRadius = '8px';
    button.style.padding = '0 8px'

    widgetContainer.appendChild(text);
    widgetContainer.appendChild(button);

    const table = document.querySelector('.container-fluid .content');
    table.parentNode.insertBefore(widgetContainer, table);

    refreshClickHandler();
}

init();

