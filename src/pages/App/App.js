import { getUser } from '../../utilities/users-service';
import { logOut } from '../../utilities/users-service';
import { useState, useEffect, createContext } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import AuthPage from '../AuthPage/AuthPage';
import PageNotFound from '../PageNotFound/PageNotFound';
import Dashboard from '../Dashboard/Dashboard';
import ShowPage from '../ShowPage/ShowPage';

export const MainContext = createContext(null);

function App() {
  const [user, setUser] = useState(getUser());
  const [error, setError] = useState('');
  const [showFailureIndicators, setShowFailureIndicators] = useState(false);

  const getUserData = async () => {
    try {
      const response = await fetch(`/api/users/${user._id}`);
      const data = await response.json();
      setUser(data);

      setInvoiceData({
        ...invoiceData,
        billFrom: user?.firstName + ' ' + user?.lastName
      });

      setUserAddress({
        userStreet: user?.userAddress.userStreet,
        userCity: user?.userAddress.userCity,
        userState: user?.userAddress.userState,
        userZipCode: user?.userAddress.userZipCode
      });
    } catch (error) {
      console.error(error);
    }
  };

  const createInvoice = async (evt) => {
    evt.preventDefault();

    try {
      const response = await fetch(`/api/invoices/${user._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...invoiceData,
          userAddress,
          clientAddress,
          items: itemsArr
        })
      });

      const data = await response.json();

      if (response.status === 200) {
        clearInvoice();
        // if (data.status !== 'Draft') {
        //   sendInvoiceEmail(data);
        // }
      } else {
        setShowFailureIndicators(true);
      }

      getUserData();
    } catch (error) {
      setError('Invoice not created. :(');
    }
  };

  const createInvoiceId = () => {
    let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      pickLetter = () => {
        let letter = letters[Math.floor(Math.random() * letters.length)];
        return letter;
      },
      pickNum = Math.floor(8999 * Math.random()) + 1e3;

    return pickLetter() + pickLetter() + pickNum;
  };

  const [invoiceId, setInvoiceId] = useState(createInvoiceId());

  const clearInvoice = () => {
    setTimeout(() => {
      setInvoiceData({
        billFrom: user?.firstName + ' ' + user?.lastName,
        invoiceId: invoiceId,
        status: 'Pending',
        clientEmail: '',
        clientFirstName: '',
        clientLastName: '',
        invoiceDate: '',
        dueDate: '',
        description: '',
        notes: ''
      });

      setClientAddress({
        clientStreet: '',
        clientCity: '',
        clientState: selectedState,
        clientZipCode: ''
      });

      setItemsArr(emptyItemInput);
      setSelectedState('Choose a state');
      setInvoiceTotal(0);
      setItemCounter(1);
      setShowFailureIndicators(false);
    }, 500);
  };

  // change form fields

  const [selectedState, setSelectedState] = useState('Choose a state');

  const [invoiceData, setInvoiceData] = useState({
    billFrom: user?.firstName + ' ' + user?.lastName,
    invoiceId: invoiceId,
    status: 'Pending',
    clientEmail: '',
    clientFirstName: '',
    clientLastName: '',
    invoiceDate: '',
    dueDate: '',
    description: '',
    notes: ''
  });

  const [userAddress, setUserAddress] = useState({});

  const [clientAddress, setClientAddress] = useState({
    clientStreet: '',
    clientCity: '',
    clientState: selectedState,
    clientZipCode: ''
  });

  const handleChangeInvoiceData = (evt) => {
    evt.preventDefault();

    setInvoiceData({
      ...invoiceData,
      [evt.target.name]: evt.target.value
    });
  };

  const handleChangeClientAddress = (evt) => {
    setClientAddress({
      ...clientAddress,
      [evt.target.name]: evt.target.value
    });

    if (evt.target.name === 'clientState') {
      setSelectedState(evt.target.value);
    }
  };

  // add invoice items functionality

  const [itemCounter, setItemCounter] = useState(1);
  const [invoiceTotal, setInvoiceTotal] = useState(0);

  const emptyItemInput = [
    {
      id: itemCounter,
      itemName: '',
      quantity: '',
      price: '',
      total: 0
    }
  ];

  const [itemsArr, setItemsArr] = useState(emptyItemInput);

  const addInput = () => {
    setItemCounter(itemCounter + 1);

    setItemsArr((items) => {
      return [
        ...items,
        {
          id: itemCounter + 1,
          itemName: '',
          quantity: '',
          price: '',
          total: 0
        }
      ];
    });
  };

  const handleChangeItem = (e) => {
    e.preventDefault();

    const index = e.target.id;
    setItemsArr((items) => {
      const newItemsArr = items.slice();
      newItemsArr[index].itemName = e.target.value;

      return newItemsArr;
    });
  };

  const handleChangeQuantity = (e) => {
    e.preventDefault();

    const index = e.target.id;

    setItemsArr((items) => {
      const newItemsArr = items.slice();
      newItemsArr[index].quantity = e.target.value;

      newItemsArr[index].total =
        newItemsArr[index].quantity * newItemsArr[index].price;

      setInvoiceTotal(() => {
        let invoiceTotal = 0;

        itemsArr.map((num, i) => {
          invoiceTotal += num.total;
        });

        return invoiceTotal;
      });

      return newItemsArr;
    });
  };

  const handleChangePrice = (e) => {
    e.preventDefault();

    const index = e.target.id;

    setItemsArr((items) => {
      const newItemsArr = items.slice();
      newItemsArr[index].price = e.target.value;

      newItemsArr[index].total =
        newItemsArr[index].quantity * newItemsArr[index].price;

      setInvoiceTotal(() => {
        let invoiceTotal = 0;

        itemsArr.map((num, i) => {
          invoiceTotal += num.total;
        });

        return invoiceTotal;
      });

      return newItemsArr;
    });
  };

  const removeItem = (id) => {
    setItemsArr(itemsArr.filter((item) => item.id !== id));
    const currentTotal = itemsArr.filter((total) => total.id === id);
    setInvoiceTotal(invoiceTotal - currentTotal[0].total);
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div>
      {selectedState}
      <button
        onClick={() => {
          getUserData();
        }}
      >
        get user data
      </button>
      <button
        onClick={() => {
          logOut();
          setUser(null);
        }}
      >
        logout
      </button>

      <MainContext.Provider
        value={{
          user: user,
          showFailureIndicators: showFailureIndicators,
          getUserData: getUserData,
          createInvoice: createInvoice,
          invoiceId: invoiceId,
          selectedState: selectedState,
          invoiceData: invoiceData,
          clientAddress: clientAddress,
          handleChangeInvoiceData: handleChangeInvoiceData,
          handleChangeClientAddress: handleChangeClientAddress,
          itemsArr: itemsArr,
          invoiceTotal: invoiceTotal,
          addInput: addInput,
          handleChangeItem: handleChangeItem,
          handleChangeQuantity: handleChangeQuantity,
          handleChangePrice: handleChangePrice,
          removeItem: removeItem
        }}
      >
        <Routes>
          {user ? (
            <>
              <Route path="/*" element={<PageNotFound />} />
              <Route path="/" element={<Dashboard />} />

              <Route
                path="/invoice/:id"
                element={
                  <>
                    <ShowPage />
                  </>
                }
              />
            </>
          ) : (
            <Route path="/" element={<AuthPage setUser={setUser} />} />
          )}
        </Routes>
      </MainContext.Provider>
    </div>
  );
}

export default App;
