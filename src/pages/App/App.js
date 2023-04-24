import { getUser } from '../../utilities/users-service';
import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import PageNotFound from '../PageNotFound/PageNotFound';
import Dashboard from '../Dashboard/Dashboard';
import ShowPage from '../ShowPage/ShowPage';

function App() {
  const [user, setUser] = useState(getUser());

  const getUserData = async () => {
    if (user) {
      try {
        const response = await fetch(`/api/users/${user._id}`);
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  // add invoice items functionality

  const [itemCounter, setItemCounter] = useState(1);

  const emptyItemInput = [
    {
      id: itemCounter,
      itemName: '',
      quantity: '',
      price: '',
      total: ''
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
          total: ''
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

      return newItemsArr;
    });
  };

  const removeItem = (id) => {
    setItemsArr(itemsArr.filter((item) => item.id !== id));
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div>
      <Routes>
        <Route
          path="/*"
          element={
            <>
              <PageNotFound />
            </>
          }
        />

        <Route
          path="/"
          element={
            <>
              <Dashboard
                itemsArr={itemsArr}
                addInput={addInput}
                handleChangeItem={handleChangeItem}
                handleChangeQuantity={handleChangeQuantity}
                handleChangePrice={handleChangePrice}
                removeItem={removeItem}
              />
            </>
          }
        />

        <Route
          path="/invoice/:id"
          element={
            <>
              <ShowPage />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
