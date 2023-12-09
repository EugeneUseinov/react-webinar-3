import { memo, useCallback, useEffect, useState } from "react";
import ItemInfo from "../../components/item-info";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import MenuBox from "../../containers/menu-box";
import Loader from "../../components/loader";
import { useParams } from "react-router-dom";
import { TRANSLATE_LIST } from "../../constants/translate-list";

function ItemPage() {
  const store = useStore();
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  useEffect(() => {
    setIsLoading(true);
    async function loading() {
      await callbacks.onLoadArticle(params.id);
      setIsLoading(false);
    }
    loading();
  }, [params.id]);
  const select = useSelector((state) => ({
    title: state.item.currentArticle.title,
    item: state.item.currentArticle,
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.language.language,
  }));
  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
    // Открытие модалки корзины
    openModalBasket: useCallback(
      () => store.actions.modals.open("basket"),
      [store]
    ),
    // Загрузка информации о товаре
    onLoadArticle: useCallback(
      async (id) => await store.actions.item.loadById(id),
      [store]
    ),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
    onLangChange: useCallback(
      () => store.actions.language.onLangChange(event.target.value),
      [store]
    ),
    homeLink: useCallback(async () => {
      await store.actions.catalog.startUrl()
    }, [])
  };

  return (
    <PageLayout>
      <Head
        title={select.title}
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
        <ItemInfo
          id={params.id}
          item={select.item}
          onAdd={callbacks.addToBasket}
          countryField={TRANSLATE_LIST?.[select.lang]?.country}
          categoryField={TRANSLATE_LIST?.[select.lang]?.category}
          editionField={TRANSLATE_LIST?.[select.lang]?.manufactured}
          priceField={TRANSLATE_LIST?.[select.lang]?.price}
          add={TRANSLATE_LIST?.[select.lang]?.add}
        />
      )}
    </PageLayout>
  );
}

export default memo(ItemPage);
