import {React, memo, useCallback, useEffect, useState} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from "../../components/pagination";
import {TRANSLATE_LIST} from "../../constants/translate-list";
import MenuBox from "../../containers/menu-box";
import Loader from "../../components/loader";

function Main() {

  const store = useStore();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    async function loading() {
      await store.actions.catalog.startUrl();
      setIsLoading(false);
      window.addEventListener('popstate', loading);
      return () => {
        window.removeEventListener('popstate', loading)
      }
    }
    loading();
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    count: state.catalog.count,
    current: state.catalog.current,
    lang: state.language.language,
    itemsOnPage: state.catalog.itemsOnPage,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    onLoad: useCallback(
      async (id) => await store.actions.catalog.load(id),
      [store]
    ),
    onLangChange: useCallback(
      (event) => store.actions.language.onLangChange(event.target.value),
      [store]
    ),
    homeLink: useCallback(async () => {
      await store.actions.catalog.startUrl()
    }, [])
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} add={TRANSLATE_LIST?.[select.lang]?.add}
                   path={`item-page/${item._id}`}/>
    }, [callbacks.addToBasket, select.lang]),
  };

  return (
    <PageLayout>
      <Head
        title={TRANSLATE_LIST?.[select.lang]?.shop}
        lang={select.lang}
        onLangChange={callbacks.onLangChange}
      />
      <MenuBox
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
        home={TRANSLATE_LIST?.[select.lang]?.home}
        inBasket={TRANSLATE_LIST?.[select.lang]?.inBasket}
        oneProduct={TRANSLATE_LIST?.[select.lang]?.oneProduct}
        fewProduct={TRANSLATE_LIST?.[select.lang]?.fewProduct}
        manyProduct={TRANSLATE_LIST?.[select.lang]?.manyProduct}
        emptyBasket={TRANSLATE_LIST?.[select.lang]?.emptyBasket}
        goTo={TRANSLATE_LIST?.[select.lang]?.goTo}
        homeLink={callbacks.homeLink}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <List list={select.list} renderItem={renders.item} />
      )}
      <Pagination
        currentPage={select.current}
        itemsOnPage={select.itemsOnPage}
        totalCount={select.count}
        onLoad={callbacks.onLoad}
      />
    </PageLayout>
  );
}

export default memo(Main);
