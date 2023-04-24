import { useState } from 'react';
import states from '../../utilities/states';
import Button from '../../components/Button/Button';
import { shortenNum } from '../../utilities/functions';

export default function Dashboard({
  totalInvoiceAmount,
  currentInvoiceAmount,
  itemsArr,
  addInput,
  handleChangeItem,
  handleChangeQuantity,
  handleChangePrice,
  removeItem
}) {
  return (
    <>
      <div id="invoice-modal">
        <div id="header">Create New Invoice</div>

        <div id="invoice-body">
          <div id="invoice-id">
            Invoice{' '}
            <span>
              <b>#</b>HF7738
            </span>
          </div>

          <div id="recipient">
            <div className="section">
              <div>
                <label>Recipient Email</label>
                <input />
              </div>
            </div>

            <div className="section">
              <div>
                <label>First Name</label>
                <input />
              </div>

              <div>
                <label>Last Name</label>
                <input />
              </div>
            </div>

            <div className="section">
              <div>
                <label>Street Address</label>
                <input />
              </div>
            </div>

            <div className="section">
              <div>
                <label>City</label>
                <input />
              </div>

              <div>
                <label>State</label>
                <select>
                  <option disabled selected hidden>
                    Choose a state
                  </option>

                  {states?.map((state, i) => {
                    return <option>{state}</option>;
                  })}
                </select>
              </div>

              <div>
                <label>Zip Code</label>
                <input type="number" min="00000" max="99999" />
              </div>
            </div>
          </div>

          <div className="section">
            <div>
              <label>Issued On</label>
              <input />
            </div>

            <div>
              <label>Due On</label>
              <input />
            </div>
          </div>

          <div className="section">
            <div>
              <label>Project Description</label>
              <input />
            </div>
          </div>

          <div id="items">
            <div id="items-header">Invoice Items</div>

            <div className="section">
              <div className="item-name">
                <label>Item</label>
              </div>

              <div className="item-qty">
                <label>Qty</label>
              </div>

              <div className="item-price">
                <label>Price</label>
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
                      name="quantity"
                      onChange={handleChangeQuantity}
                      value={item.quantity}
                      id={i}
                      type="number"
                    />
                  </div>

                  <div className="item-price">
                    <input
                      name="price"
                      onChange={handleChangePrice}
                      value={item.price}
                      id={i}
                      type="number"
                    />
                  </div>

                  <div className="item-total">
                    <input
                      value={`$${shortenNum(item.quantity * item.price)}`}
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
                Add Item
              </div>
              <div className="item-qty"></div>
              <div className="item-price">Total Amount</div>
              <div className="item-total">
                ${shortenNum(currentInvoiceAmount)}
              </div>
              <div className="item-trash"></div>
            </div>
          </div>

          <div className="section">
            <div>
              <label>Addtional Notes</label>
              <textarea />
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
      </div>
    </>
  );
}
