import { useState, useContext } from 'react';
import { MainContext } from '../../pages/App/App';
import { shortenNum } from '../../utilities/functions';
import states from '../../utilities/states';

export default function NewInvoice() {
  const {
    showFailureIndicators,
    createInvoice,
    invoiceId,
    selectedState,
    invoiceData,
    clientAddress,
    handleChangeInvoiceData,
    handleChangeClientAddress,
    itemsArr,
    invoiceTotal,
    addInput,
    handleChangeItem,
    handleChangeQuantity,
    handleChangePrice,
    removeItem
  } = useContext(MainContext);

  return (
    <>
      <form onSubmit={createInvoice} id="invoice-modal">
        <div id="header">Create New Invoice</div>

        <div id="invoice-body">
          <div id="invoice-id">
            Invoice{' '}
            <span>
              <b>#</b>
              {invoiceId}
            </span>
          </div>

          <div className="section">
            <div>
              <label
                className={
                  showFailureIndicators && invoiceData.clientEmail === ''
                    ? 'invalid'
                    : ''
                }
              >
                {showFailureIndicators && invoiceData.clientEmail === ''
                  ? 'Recipient Email *'
                  : 'Recipient Email'}
              </label>
              <input
                className={
                  showFailureIndicators && invoiceData.clientEmail === ''
                    ? 'invalid'
                    : ''
                }
                type="email"
                name="clientEmail"
                value={invoiceData.clientEmail}
                onChange={handleChangeInvoiceData}
              />
            </div>
          </div>

          <div className="section">
            <div>
              <label
                className={
                  showFailureIndicators && invoiceData.clientFirstName === ''
                    ? 'invalid'
                    : ''
                }
              >
                {showFailureIndicators && invoiceData.clientFirstName === ''
                  ? 'First Name *'
                  : 'First Name'}
              </label>
              <input
                className={
                  showFailureIndicators && invoiceData.clientFirstName === ''
                    ? 'invalid'
                    : ''
                }
                type="test"
                name="clientFirstName"
                value={invoiceData.clientFirstName}
                onChange={handleChangeInvoiceData}
              />
            </div>

            <div>
              <label
                className={
                  showFailureIndicators && invoiceData.clientLastName === ''
                    ? 'invalid'
                    : ''
                }
              >
                {showFailureIndicators && invoiceData.clientLastName === ''
                  ? 'Last Name *'
                  : 'Last Name'}
              </label>
              <input
                className={
                  showFailureIndicators && invoiceData.clientLastName === ''
                    ? 'invalid'
                    : ''
                }
                type="text"
                name="clientLastName"
                value={invoiceData.clientLastName}
                onChange={handleChangeInvoiceData}
              />
            </div>
          </div>

          <div className="section">
            <div>
              <label
                className={
                  showFailureIndicators && clientAddress.clientStreet === ''
                    ? 'invalid'
                    : ''
                }
              >
                {showFailureIndicators && clientAddress.clientStreet === ''
                  ? 'Street Address *'
                  : 'Street Address'}
              </label>
              <input
                className={
                  showFailureIndicators && clientAddress.clientStreet === ''
                    ? 'invalid'
                    : ''
                }
                type="text"
                name="clientStreet"
                value={clientAddress.clientStreet}
                onChange={handleChangeClientAddress}
              />
            </div>
          </div>

          <div className="section">
            <div>
              <label
                className={
                  showFailureIndicators && clientAddress.clientCity === ''
                    ? 'invalid'
                    : ''
                }
              >
                {showFailureIndicators && clientAddress.clientCity === ''
                  ? 'City *'
                  : 'City'}
              </label>
              <input
                className={
                  showFailureIndicators && clientAddress.clientCity === ''
                    ? 'invalid'
                    : ''
                }
                type="text"
                name="clientCity"
                value={clientAddress.clientCity}
                onChange={handleChangeClientAddress}
              />
            </div>

            <div>
              <label
                className={
                  showFailureIndicators &&
                  clientAddress.clientState === 'Choose a state'
                    ? 'invalid'
                    : ''
                }
              >
                {showFailureIndicators &&
                clientAddress.clientState === 'Choose a state'
                  ? 'State *'
                  : 'State'}
              </label>
              <select
                className={
                  showFailureIndicators &&
                  clientAddress.clientState === 'Choose a state'
                    ? 'invalid'
                    : ''
                }
                name="clientState"
                value={selectedState}
                onChange={handleChangeClientAddress}
              >
                <option value="" hidden>
                  Choose a state
                </option>
                {states?.map((state, i) => {
                  return <option defaultValue={state}>{state}</option>;
                })}
              </select>
            </div>

            <div>
              <label
                className={
                  showFailureIndicators && clientAddress.clientZipCode === ''
                    ? 'invalid'
                    : ''
                }
              >
                {showFailureIndicators && clientAddress.clientZipCode === ''
                  ? 'Zip Code *'
                  : 'Zip Code'}
              </label>
              <input
                className={
                  showFailureIndicators && clientAddress.clientZipCode === ''
                    ? 'invalid'
                    : ''
                }
                type="number"
                name="clientZipCode"
                value={clientAddress.clientZipCode}
                onChange={handleChangeClientAddress}
              />
            </div>
          </div>

          <div className="section">
            <div>
              <label
                className={
                  showFailureIndicators && invoiceData.invoiceDate === ''
                    ? 'invalid'
                    : ''
                }
              >
                {showFailureIndicators && invoiceData.invoiceDate === ''
                  ? 'Issued On *'
                  : 'Issued On'}
              </label>
              <input
                className={
                  showFailureIndicators && invoiceData.invoiceDate === ''
                    ? 'invalid'
                    : ''
                }
                type="date"
                name="invoiceDate"
                value={invoiceData.invoiceDate}
                onChange={handleChangeInvoiceData}
              />
            </div>

            <div>
              <label
                className={
                  showFailureIndicators && invoiceData.dueDate === ''
                    ? 'invalid'
                    : ''
                }
              >
                {showFailureIndicators && invoiceData.dueDate === ''
                  ? 'Due On *'
                  : 'Due On'}
              </label>
              <input
                className={
                  showFailureIndicators && invoiceData.dueDate === ''
                    ? 'invalid'
                    : ''
                }
                type="date"
                name="dueDate"
                value={invoiceData.dueDate}
                onChange={handleChangeInvoiceData}
              />
            </div>
          </div>

          <div className="section">
            <div>
              <label
                className={
                  showFailureIndicators && invoiceData.description === ''
                    ? 'invalid'
                    : ''
                }
              >
                {showFailureIndicators && invoiceData.description === ''
                  ? 'Project Description *'
                  : 'Project Description'}
              </label>
              <input
                className={
                  showFailureIndicators && invoiceData.description === ''
                    ? 'invalid'
                    : ''
                }
                type="text"
                name="description"
                value={invoiceData.description}
                onChange={handleChangeInvoiceData}
              />
            </div>
          </div>

          <div id="items">
            <div id="items-header">Invoice Items ({itemsArr.length})</div>

            <div className="section items">
              <div className="item-name">
                <label
                  className={itemsArr
                    .map((item, i) => {
                      return showFailureIndicators && item.itemName === ''
                        ? 'invalid '
                        : '';
                    })
                    .join('')}
                >
                  {itemsArr.map((item, i) => {
                    return showFailureIndicators && item.itemName === '' ? (
                      <span>Item *</span>
                    ) : (
                      <span>Item</span>
                    );
                  })}
                </label>
              </div>

              <div className="item-qty">
                <label
                  className={itemsArr
                    .map((item, i) => {
                      return showFailureIndicators && item.quantity === ''
                        ? 'invalid '
                        : '';
                    })
                    .join('')}
                >
                  {itemsArr.map((item, i) => {
                    return showFailureIndicators && item.quantity === '' ? (
                      <span>Qty *</span>
                    ) : (
                      <span>Qty</span>
                    );
                  })}
                </label>
              </div>

              <div className="item-price">
                <label
                  className={itemsArr
                    .map((item, i) => {
                      return showFailureIndicators && item.price === ''
                        ? 'invalid '
                        : '';
                    })
                    .join('')}
                >
                  {itemsArr.map((item, i) => {
                    return showFailureIndicators && item.price === '' ? (
                      <span>Price *</span>
                    ) : (
                      <span>Price</span>
                    );
                  })}
                </label>
              </div>

              <div className="item-total">
                <label>Total</label>
              </div>

              <div className="item-trash"></div>
            </div>

            {itemsArr?.map((item, i) => {
              return (
                <div className="section">
                  <div className="item-name">
                    <input
                      className={
                        showFailureIndicators && item.itemName === ''
                          ? 'invalid'
                          : ''
                      }
                      name="itemName"
                      onChange={handleChangeItem}
                      value={item.itemName}
                      id={i}
                      type="text"
                      placeholder={`Item ${i + 1}`}
                    />
                  </div>

                  <div className="item-qty">
                    <input
                      className={
                        showFailureIndicators && item.quantity === ''
                          ? 'invalid'
                          : ''
                      }
                      name="quantity"
                      onChange={handleChangeQuantity}
                      value={item.quantity}
                      id={i}
                      type="number"
                    />
                  </div>

                  <div className="item-price">
                    <input
                      className={
                        showFailureIndicators && item.price === ''
                          ? 'invalid'
                          : ''
                      }
                      name="price"
                      onChange={handleChangePrice}
                      value={item.price}
                      id={i}
                      type="number"
                    />
                  </div>

                  <div className="item-total">
                    <input
                      name="total"
                      value={
                        item.total !== '' ? `$${shortenNum(item.total)}` : ''
                      }
                      disabled
                    />
                  </div>

                  <div
                    className="item-trash"
                    onClick={() => {
                      removeItem(item.id);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path d="M163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3C140.6 6.8 151.7 0 163.8 0zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zM143 239c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" />
                    </svg>
                  </div>
                </div>
              );
            })}

            <div className="section add-item">
              <div className="item-name" onClick={addInput}>
                + Add Item
              </div>
              <div className="item-qty"></div>
              <div className="item-price">Total Amount</div>
              <div className="item-total">
                ${invoiceTotal === 0 ? '0' : shortenNum(invoiceTotal)}
              </div>
              <div className="item-trash"></div>
            </div>
          </div>

          <div className="section">
            <div>
              <label>Addtional Notes</label>
              <textarea
                type="text"
                name="notes"
                value={invoiceData.notes}
                onChange={handleChangeInvoiceData}
              />
            </div>
          </div>
        </div>

        <div id="footer">
          <div className="left">
            <button className="cancel">Cancel</button>
          </div>

          <div className="right">
            <button className="draft">Save as Draft</button>
            <button className="send">Send</button>
          </div>
        </div>
      </form>
    </>
  );
}
