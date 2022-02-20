const items = document.querySelector('.items');
const input = document.querySelector('.footer__input');
const addBtn = document.querySelector('.footer__button');

function onAdd() {
    //1. 사용자가 입력한 텍스트를 받아옴
    const text = input.value;

    if (text === '') {
        /*이게 없다면, input에 focus()가 있다가 버튼을 클릭하는 순간, focus()가 버튼으로 옮겨온다.
        그래서 input에는 focus가 사라진다. 그래서 우리가 함수를 그냥 나갈때, input에다가 다시 focus()를 주고 나서
        나가면 input에 focus()가 그대로 남아있기때문에 계속사용자가 데이터를 입력할 수 있게 된다. */
        input.focus();
        return;
    }
    //2. 새로운 아이템을 만듬(텍스트 + 삭제버튼)
    const item = createItem(text);
    //3. items 컨테이너안에 새로 만든 아이템을 추가한다.
    console.log('save item', item);
    items.appendChild(item);
    //4. 새로 추가된 아이템으로 스크롤링
    item.scrollIntoView({
        block: 'center'
    });
    //5. 인풋을 초기화한다.
    input.value = '';
    input.focus();
}

//전달받은 text를 이용해서 새로운 DOM요소를 만들어보도록 할 것이다. 
function createItem(text) {
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

    const deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('class', 'item__delete');
    deleteBtn.innerHTML = '<i class="fas fa-trash-can"></i>';
    deleteBtn.addEventListener('click', () => {
        items.removeChild(itemRow);
    })

    //divider는 div태그를 이용했다. 
    const itemDivider = document.createElement('div');
    //그리고 itemDivider의 setAttribute를 이용해서, class는 바로 item의 divider다 
    itemDivider.setAttribute('class', 'item__divider');

    item.appendChild(name);
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
input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        onAdd();
    }

})