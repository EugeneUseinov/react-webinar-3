import {memo, useCallback, useEffect} from 'react';
import ItemBasket from "../../components/item-basket";
import List from "../../components/list";
import ModalLayout from "../../components/modal-layout";
import BasketTotal from "../../components/basket-total";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { TRANSLATE_LIST } from "../../constants/translate-list";

function Basket() {

  const store = useStore();
  useEffect(() => {
    store.actions.catalog.load();
  }, []);
  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.language.language,
  }));

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
    onLoadArticle: useCallback(
      async (id) => await store.actions.item.loadById(id),
      [store]
    ),
    openModalItemCard: useCallback(
      () => store.actions.modals.open("itemBasket"),
      [store]
    ),
  }

  const renders = {
    itemBasket: useCallback((item) => {
      return <ItemBasket item={item}
                         onRemove={callbacks.removeFromBasket}
                         onLoad={callbacks.onLoadArticle}
                         onOpen={callbacks.openModalItemCard}
                         countField={TRANSLATE_LIST?.[select.lang]?.pc}
                         delete={TRANSLATE_LIST?.[select.lang]?.delete}
                         path={`item-page/${item._id}`}
      />
    }, [callbacks.removeFromBasket]),
  };

  return (
    <ModalLayout
      title={TRANSLATE_LIST?.[select.lang]?.basket}
      onClose={callbacks.closeModal}
      close={TRANSLATE_LIST?.[select.lang]?.close}
    >
      <List list={select.list} renderItem={renders.itemBasket} />
      <BasketTotal sum={select.sum} total={TRANSLATE_LIST?.[select.lang]?.total}/>
    </ModalLayout>
  );
}

export default memo(Basket);
