import React, {useCallback} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import BasketFooter from './components/basket-footer';
import ModalLayout from './components/modal-layout';
import Item from './components/item';
import BasketItem from './components/basket-item';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const list = store.getState().list;
  const isModalActive = store.getState().modalActive;
  const totalPrice = store.getState().totalPrice;
  const basket = store.getState().basket;
  const callbacks = {
    onAddItem: useCallback(
      (item) => {
        store.addItem(item);
      }, [store]),
    onDeleteItem: useCallback(
      (code, price, count) => {
        store.deleteItem(code, price, count);
      }, [store]),
    onOpenModal: useCallback(() => {
      store.openModal();
    }, [store]),
    onCloseModal: useCallback(() => {
      store.closeModal();
    }, [store]),
  };
  
  const itemVariants = {
    mainItem: useCallback(
      (item) => {
        return (
          <Item
            item={item}
            onAddItem={callbacks.onAddItem}
            addText={'Добавить'}
          />
        );
      },
      [callbacks.onAddItem]
    ),
    basketItem: useCallback(
      (item) => {
        return (
          <BasketItem
            item={item}
            onDeleteItem={callbacks.onDeleteItem}
            deleteText={'Удалить'}
          />
        );
      },
      [callbacks.onDeleteItem]
    ),
  };

  return (
    <>
      <PageLayout>
        <Head title="Магазин"/>
        <Controls
          onOpen={callbacks.onOpenModal}
          basketCount={basket?.length}
          totalPrice={totalPrice}
          goToText={'Перейти'}
        />
        <List list={list} itemVariant={itemVariants.mainItem}/>
      </PageLayout>
      {isModalActive && (
        <ModalLayout
          title={"Корзина"}
          closeText={"Закрыть"}
          onClose={callbacks.onCloseModal}
        >
          <List list={basket} itemVariant={itemVariants.basketItem} />
          <BasketFooter totalPrice={totalPrice} />
        </ModalLayout>
      )}
    </>
  );
}

export default App;
