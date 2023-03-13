let total = 0;
let buffer = "0";
let previous;

const screen = document.querySelector('.screen');

function click(value)
{
    if(isNaN(value)){
        handleSymbol(value);
    }
    else{
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol)
{
    switch(symbol)
    {
        case 'AC':
            buffer = '0';
            total = 0;
            break;
        case '=':
            if(previous === null)
            {
                return;
            }
            flushOperation(parseInt(buffer));
            previous = null;
            buffer = total;
            total = 0;
            break;
        case '%':
        case '±':
        case '÷':
        case '×':
        case '-':
        case '+':
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol)
{
    if(buffer === '0') return;

    const nBuffer = parseInt(buffer);

    if(total === 0)
    {
        total = nBuffer;
    }
    else
    {
        flushOperation(nBuffer);
    }
    previous = symbol;
    buffer = '0';
}

function flushOperation(nBuffer)
{
    if(previous === '+')
    {
        total += nBuffer
    }
    else if(previous === '-')
    {
        total -= nBuffer;
    }
    else if(previous === '×')
    {
        total *= nBuffer;
    }
    else if(previous === '÷')
    {
        total /= nBuffer;
    }
    else if(previous === '%')
    {
        total = total/100;
    }
    else if(previous === '±')
    {
        total = total * (-1);
    }
}

function handleNumber(sNumber)
{
    if(buffer ==='0')
    {
        buffer = sNumber;
    }
    else
    {
        buffer += sNumber;
    }
}
function init()
{
    document.querySelector('.buttons').addEventListener('click', function(event){
        click(event.target.innerText);
        
    })
}
init();