const items = document.querySelector('.items');
const inputText = document.querySelector('.footer__text');
const inputNum = document.querySelector('.footer__number');
const total = document.querySelector('.total__price');
const addBtn = document.querySelector('.footer__button');

/*추가*/
const selectLocation = document.querySelector('.header__today-location');

let sumTotal = new Number(0);

function onAdd() {
    //1. 사용자가 입력한 텍스트를 받아옴
    const text = inputText.value;
    const price = Number(inputNum.value);
    const location = selectLocation.value;
    if (text === '' || price === '') {
        /*이게 없다면, input에 focus()가 있다가 버튼을 클릭하는 순간, focus()가 버튼으로 옮겨온다.
        그래서 input에는 focus가 사라진다. 그래서 우리가 함수를 그냥 나갈때, input에다가 다시 focus()를 주고 나서
        나가면 input에 focus()가 그대로 남아있기때문에 계속사용자가 데이터를 입력할 수 있게 된다. */
        inputText.focus();
        return;
    }
    //2. 새로운 아이템을 만듬(텍스트 + 삭제버튼)
    const item = createItem(text, price, location);
    //3. items 컨테이너안에 새로 만든 아이템을 추가한다.
    console.log('save item', item);
    items.appendChild(item);
    sumTotal += price;
    updateTotal();
    //4. 새로 추가된 아이템으로 스크롤링
    item.scrollIntoView({
        block: 'center'
    });
    //5. 인풋을 초기화한다.
    inputText.value = '';
    inputText.focus();
}

//전달받은 text를 이용해서 새로운 DOM요소를 만들어보도록 할 것이다. 
function createItem(text, price, location) {
    //item한줄에 있는 요소를 만든다.
    //li안에는 item과 divider두개가 있었다. -> item__row에는 클래스가 지정이 되어있다.
    const itemRow = document.createElement('li');
    //즉 itemRow에는 setAttribute()를 이용해서 class는 바로 item__row라고 지정해준다.
    itemRow.setAttribute('class', 'item__row');

    //그다음에 item__row에 들어갈 item을 만들어보자.
    const item = document.createElement('div');
    item.setAttribute('class', 'item');

    const name = document.createElement('span');
    name.setAttribute('class', 'item__name');
    name.innerText = text;

    const local = document.createElement('span');
    local.setAttribute('class', 'item__location');
    local.innerText = location;

    const number = document.createElement('span');
    number.setAttribute('class', 'item__price');
    number.innerText = `$ ${price}`;

    const deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('class', 'item__delete');
    deleteBtn.innerHTML = '<i class="fas fa-trash-can"></i>';
    deleteBtn.addEventListener('click', () => {
        //쓰레기통 버튼이 클릭됐을떄, 그 줄이 사라져 
        //그리고 total price감소

        items.removeChild(itemRow);
    })

    //divider는 div태그를 이용했다. 
    const itemDivider = document.createElement('div');
    //그리고 itemDivider의 setAttribute를 이용해서, class는 바로 item의 divider다 
    itemDivider.setAttribute('class', 'item__divider');

    item.appendChild(name);
    item.appendChild(local);
    item.appendChild(number);
    item.appendChild(deleteBtn);

    itemRow.appendChild(item);
    itemRow.appendChild(itemDivider);

    return itemRow;
}

/*plus버튼 핸들링하기*/
addBtn.addEventListener('click', () => {
    onAdd();
})
/*enter눌렀을때, 핸들링하기*/
inputText.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        onAdd();
    }
})

function updateTotal() {
    total.innerHTML = `$${Number(sumTotal)}`
}