import React, { useState } from 'react';

function ItemList(props) {
  const [items, setItems] = React.useState(props.items || []);
  const [state, setState] = React.useState({});
  const [loaded, setLoaded] = React.useState(false);


  React.useEffect(() => {
    props.formWrapEl.current = document.querySelector(`.form-box-wrap`);
    props.formWrapEl.current.scroll({
      top: props.formWrapElHeight,
      behavior: 'smooth'
    });

    props.setFormWrapElHeight(props.formWrapElHeight+62);
  }, [items])

  function onInputchange(event, i, j) {
    if (!loaded) setLoaded(true);
    items[i][j] = event.target.value;
    items[i][3] = String(Number(items[i][1]) * Number(items[i][2]))
    setLoaded(false);
    setItems(items);
    setState({
      [event.target.id]: event.target.value
    });
  }

  let itemsRows = [];
  itemsRows = items.map((el, i) => {
    const inputUtils = [['text', 'item-name'],['number', 'qty'],['number', 'price'],['number', 'total']];
    const labelContent = ['Item Name', 'Qty.', 'Price', 'Total'];
    const inputs = inputUtils.map((util, j) => {
      util.push(el[j]);
      return <div>
        <label className="bonus-text">{labelContent[j]}</label>
        <input name="nam" type={util[0]} id={util[1]} value={loaded ? state.id : j == 3 ? Math.round(Number(util[2]) * 100) / 100 : util[2]} onChange={(e) => onInputchange(e, i, j)} placeholder={j == 2 ? 0 : j == 1 ? '0' : ''} readOnly={j == 3 ? true : false} key={j}/>
      </div>
    })
    return (<div className="item-list__row item-list__row-value" data-id={i} key={i}>
    {inputs}
    <svg onClick={function(e){ deleteItem(e.target)} } width="13" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M11.583 3.556v10.666c0 .982-.795 1.778-1.777 1.778H2.694a1.777 1.777 0 01-1.777-1.778V3.556h10.666zM8.473 0l.888.889h3.111v1.778H.028V.889h3.11L4.029 0h4.444z" fill="#888EB0" fillRule="nonzero"/></svg>
    </div>);

  });



  const addItem = function() {
    setItems([...items, ['','','','']]);
  };

  const deleteItem = function(object) {
    const itemRow = object.parentElement.parentElement.classList.contains('item-list__row') ? object.parentElement.parentElement : object.parentElement;
    const newItems = items.filter((el, j) => j !== Number(itemRow.dataset.id));
    setLoaded(false);
    setItems(newItems);
  }

  return (
    <React.Fragment>
      {itemsRows}
      <button className="add-item" onClick={() => addItem()}>
      <h4>+ Add New Item</h4>
      </button>
    </React.Fragment>
  )
}



export default ItemList;