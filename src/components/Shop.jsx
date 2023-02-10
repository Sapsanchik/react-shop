import React, { useEffect, useContext } from 'react';
import { API_KEY, API_URL } from '../config';
import { Preloader } from './Preloader';
import { GoodsList } from './GoodsList';
import { Cart } from './Cart';
import { BasketList } from './BasketList';
import { Alert } from './Alert';
import {ShopContext} from '../context'

export const Shop = () => {
  const {loading, order, basketShow, alertName, setGoods} = useContext(ShopContext)

  useEffect(function getGoods() {
    fetch(API_URL, {
      headers: {
        Authorization: API_KEY,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setGoods(data.featured)
      });
      // eslint-disable-next-line
  }, []);

  return (
    <main className="container content">
      <Cart quantity={order.length} />
      {loading ? (
        <Preloader />
      ) : (
        <GoodsList />
      )}
      {basketShow && (
        <BasketList />
      )}
      {
        alertName && <Alert />
      }
    </main>
  );
};
