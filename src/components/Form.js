import React from 'react';
import { useNavigate} from 'react-router-dom';
import ItemList from './ItemsList';
import { InvoiceContext } from 'InvoiceContext';

function Form(props) {
  const value = React.useContext(InvoiceContext);
  let navigate = useNavigate();
  let itemsArr = [];
  if (props.type === 'editInvoice') itemsArr = props.invoice?.items.map(el => Object.values(el));
  const [formWrapElHeight, setFormWrapElHeight] = React.useState(0);

  let formWrapEl = React.useRef(null);
  const [errorEmptyField, setErrorEmptyField] = React.useState(false);
  const [errorNoItems, setErrorNoItems] = React.useState(false);

  React.useEffect(() => {
    setFormWrapElHeight(90000);
  }, [])
  
  React.useEffect(() => {
    if (!errorEmptyField && !errorNoItems) return
    formWrapEl.current.scroll({
      top: formWrapElHeight,
      behavior: 'smooth'
    });
    setFormWrapElHeight(formWrapEl.current.offsetHeight);
  }, [errorEmptyField, errorNoItems])

  const closeForm = function() {
    navigate(-1);
  };

  const clearErrorMessages = function() {
    setErrorEmptyField(false);
    setErrorNoItems(false);
    const inputsIds = ['street-address', 'city', 'post-code', 'country', 'client-name', 'client-email','street-address-to', 'city-to', 'post-code-to', 'country-to', 'invoice-date', 'project-desc'];
    const inputsEls = inputsIds.map((id) => document.querySelector(`#${id}`));
    inputsEls.forEach(el => el.parentElement.classList.remove('empty'));
    const itemListRows = document.querySelectorAll('.item-list__row-value');
    itemListRows.forEach((el) => {
      for (let i = 0; i < 3; i++) el.children[i].children[1].classList.remove('empty-cell')
    })
  }

  const checkIfThereAreEmptyFields = function() {
    const inputsIds = ['street-address', 'city', 'post-code', 'country', 'client-name', 'client-email','street-address-to', 'city-to', 'post-code-to', 'country-to', 'invoice-date', 'project-desc'];
    const inputsEls = inputsIds.map((id) => document.querySelector(`#${id}`));
    let anyEmptyField = false;
    inputsEls.forEach(el => {
      if (el.value.length == 0) {
        anyEmptyField = true;
        el.parentElement.classList.add('empty')
      }
    });
    const itemListEl = document.querySelector('.item-list');
    if (itemListEl.children.length > 3) {
      const itemListRows = document.querySelectorAll('.item-list__row-value');
      itemListRows.forEach((el) => {
        for (let i = 0; i < 3; i++) if (el.children[i].children[1].value.length == 0)
        {
          el.children[i].children[1].classList.add('empty-cell')
          anyEmptyField = true;
        }
      })
    }
    return anyEmptyField;
  };
  const checkIfThereAreNoIitems = function() {
    const itemListEl = document.querySelector('.item-list');
    if (itemListEl.children.length === 3) return true;
    else {
      const itemListRows = document.querySelectorAll('.item-list__row-value');
      itemListRows.forEach((el) => {
        for (let i = 0; i < 3; i++) if (el.children[i].children[1].value.length == 0)  el.children[i].children[1].classList.add('empty-cell')
      })
    }
  };
  
  const saveInvoice = function(action, typeInv) {
    const inputsIds = ['street-address', 'city', 'post-code', 'country', 'client-name', 'client-email','street-address-to', 'city-to', 'post-code-to', 'country-to', 'invoice-date', 'project-desc', 'payment-terms'];
    const inputsEls = inputsIds.map((id) => document.querySelector(`#${id}`));
    const itemListRows = document.querySelectorAll('.item-list__row-value');
    let totalAmount = 0;
    const itemsObjectsArr = Array.from(itemListRows).map(row => {
      totalAmount += Math.round(Number(row.children[3].children[1].value)) * 100 / 100;
      return {
        "name": row.children[0].children[1].value,
        "quantity": row.children[1].children[1].value,
        "price": row.children[2].children[1].value,
        "total": row.children[3].children[1].value
      }
    });

    const letters = 'ABCDEFGHIKLMNOPQRSTVXYZ';
    function rndNumb(max, min) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    let id;
    if (props.type === 'editInvoice') id = props.invoice.id;
    else id = '' + letters[rndNumb(23, 0)] + letters[rndNumb(23, 0)] + rndNumb(9, 0)+rndNumb(9, 0)+rndNumb(9, 0)+rndNumb(9, 0);
    const createdDate = inputsEls[10].value ? inputsEls[10].value.split('-') : ['1', '1', '2020'];
    let year = Number(createdDate[0]);
    let month = Number(createdDate[1]);
    let day = Number(createdDate[2]) + Number(inputsEls[12].value);
    if (day > 30) month += 1
    if (month > 12) year += 1
    month %= 12;
    day %= 30;
    const paymentDue = ''+year+'-'+month+'-'+day;

    const invoice = {
      clientAddress: {street: inputsEls[6].value, city: inputsEls[7].value, postCode: inputsEls[8].value, country: inputsEls[9].value},
      clientEmail: inputsEls[5].value,
      clientName: inputsEls[4].value,
      createdAt: inputsEls[10].value,
      description: inputsEls[11].value,
      id: id,
      items: itemsObjectsArr,
      paymentDue: paymentDue,
      paymentTerms: inputsEls[12].value,
      senderAddress: {street: inputsEls[0].value, city: inputsEls[1].value, postCode: inputsEls[2].value, country: inputsEls[3].value},
      status: action === 'save' ? 'pending' : 'draft',
      total: totalAmount
    }

    if (typeInv === 'addInvoice') {
      value.setInvoices(prevState => {
        return [...prevState, invoice]
      });
    } else {
      const editInvoiceIndex = value.invoices.findIndex(el => el.id === invoice.id)
      value.invoices[editInvoiceIndex] = invoice;
      value.setInvoices(prevState => {
        return [...prevState]
      });
    }
    closeForm();
  };

  const saveForm = function(action, typeInv) {
    let emptyFields = false;
    let noItems = false;
    if (action === 'save') {
      emptyFields = checkIfThereAreEmptyFields();
      noItems = checkIfThereAreNoIitems();
    } else {
      const dateEl = document.querySelector(`#invoice-date`)
      if (dateEl.value.length === 0) {
        emptyFields = true
        dateEl.parentElement.classList.add('empty');
      }
    };

    if (!emptyFields && !noItems) saveInvoice(action, typeInv);
    else {
      setErrorEmptyField(emptyFields);
      setErrorNoItems(noItems);
    }
  }


  return (
    <div>
      <div className="form-modal" style={{color: 'white'}} onClick={() => closeForm()}>
      </div>
      <div className={"form-box-wrap form-" + props.type} >
        <div className="form-box" onClick={() => clearErrorMessages()}>
          <h1>{props.type === 'newInvoice' ? 'New Invoice' : `Edit #${props?.invoice?.id}` }</h1>
          <div className="bill-from">
            <h5>Bill From</h5>
            <div className="input-group street-address">
              <label htmlFor="street-address"><h5>Street Address</h5></label>
              <input type="text" id="street-address" defaultValue={props.type === 'newInvoice' ? '' : `${props?.invoice?.senderAddress.street}`} />
            </div>
            <div className="city-post-country">
              <div className="input-group">
                <label htmlFor="city"><h5>City</h5></label>
                <input type="text" id="city" defaultValue={props.type === 'newInvoice' ? '' : `${props?.invoice?.senderAddress.city}`} />
              </div>
              <div className="input-group">
                <label htmlFor="post-code"><h5>Post Code</h5></label>
                <input type="text" id="post-code" defaultValue={props.type === 'newInvoice' ? '' : `${props?.invoice?.senderAddress.postCode}`} />
              </div>
              <div className="input-group">
                <label htmlFor="country"><h5>Country</h5></label>
                <input type="text" id="country" defaultValue={props.type === 'newInvoice' ? '' : `${props?.invoice?.senderAddress.country}`} />
              </div>
            </div>
          </div>

          <div className="bill-to">
            <h5>Bill To</h5>
            <div className="input-group client-name">
              <label htmlFor="client-name"><h5>Client's Name</h5></label>
              <input type="text" id="client-name" defaultValue={props.type === 'newInvoice' ? '' : `${props?.invoice?.clientName}`} />
            </div>
            <div className="input-group client-email">
              <label htmlFor="client-email"><h5>Client's Email</h5></label>
              <input type="email" id="client-email" defaultValue={props.type === 'newInvoice' ? '' : `${props?.invoice?.clientEmail}`} placeholder="e.g. email@example.com" />
            </div>
            <div className="input-group street-address-to">
              <label htmlFor="street-address-to"><h5>Street Address</h5></label>
              <input type="text" id="street-address-to" defaultValue={props.type === 'newInvoice' ? '' : `${props?.invoice?.clientAddress.street}`} />
            </div>
            <div className="city-post-country">
              <div className="input-group ">
                <label htmlFor="city-to"><h5>City</h5></label>
                <input type="text" id="city-to" defaultValue={props.type === 'newInvoice' ? '' : `${props?.invoice?.clientAddress.city}`} />
              </div>
              <div className="input-group ">
                <label htmlFor="post-code-to"><h5>Post Code</h5></label>
                <input type="text" id="post-code-to" defaultValue={props.type === 'newInvoice' ? '' : `${props?.invoice?.clientAddress.postCode}`} />
              </div>
              <div className="input-group ">
                <label htmlFor="country-to"><h5>Country</h5></label>
                <input type="text" id="country-to" defaultValue={props.type === 'newInvoice' ? '' : `${props?.invoice?.clientAddress.country}`} />
              </div>
            </div>
          </div>


          <div className="invoice-dates-desc">
            <div className="date-payment">
              <div className="input-group">
                <label htmlFor="invoice-date"><h5>Invoice Date</h5></label>
                <input type="date" id="invoice-date" defaultValue={props.type === 'newInvoice' ? '' : `${props.invoice?.createdAt}`} readOnly={props.type === 'newInvoice' ? false : true} />
              </div>
              <div className="input-group">
                <label htmlFor="payment-terms"><h5>Payment Terms</h5></label>
                <select type="date" id="payment-terms">
                  <option value="1">Net 1 Day</option>
                  <option value="7">Net 7 Days</option>
                  <option value="14">Net 14 Days</option>
                  <option value="30">Net 30 Days</option>
                </select>
              </div>
            </div>
            <div className="input-group project-desc">
              <label htmlFor="project-desc"><h5>Project Description</h5></label>
              <input type="text" id="project-desc" defaultValue={props.type === 'newInvoice' ? '' : `${props.invoice?.description}`} placeholder="e.g. Graphic Design Service" />
            </div>
          </div>

          <div className="item-list">
            <h3>Item List</h3>
            <div className="item-list__row">
              <label><h5>Item Name</h5></label>
              <label><h5>Qty.</h5></label>
              <label><h5>Price</h5></label>
              <label><h5>Total</h5></label>
              <label><h5></h5></label>
            </div>
            <ItemList type={props.type} items={itemsArr} formWrapEl={formWrapEl} formWrapElHeight={formWrapElHeight} setFormWrapElHeight={setFormWrapElHeight} />
          </div>
        </div>

        <div className="errors-div">
        <h5>{errorEmptyField ? '- All fields must be added' : ''}</h5>
        <h5>{errorNoItems ? '- An item must be added' : ''}</h5>
        </div>

        <div className="form-bottom-btns">
          <div>
            {props.type === 'editInvoice' ? '' : <button className="discard" onClick={() => closeForm()} >
              <h5>Discard</h5>
            </button>}
            
          </div>
          <div>
            {props.type === 'editInvoice' ? <button className="discard" onClick={() => closeForm()} >
              <h5>Cancel</h5>
            </button> : <button className="save-draft" onClick={() => saveForm('draft', 'addInvoice')} >
              <h5>Save as Draft</h5>
            </button>}
            {props.type === 'editInvoice' ? <button className="save" onClick={() => saveForm('save', 'changeInvoice')} >
              <h5>Save Changes</h5>
            </button> : <button className="save" onClick={() => saveForm('save', 'addInvoice')} >
              <h5>Save &#38; Send</h5>
            </button>}
            
          </div>
        </div>

      </div>
    </div>
  );
}

export default Form;