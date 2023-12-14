import {memo, useCallback} from 'react';
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import useSelector from '../../hooks/use-selector';
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import LocaleSelect from "../../containers/locale-select";
import AuthBar from '../../components/auth-bar';

/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {

  const store = useStore();

  useInit(() => {
    store.actions.catalog.initParams();
    store.actions.auth.initUserFromStorage();
    store.actions.category.getCategory();
  }, [], true);

  const select = useSelector(state => ({
    waiting: state.article.waiting,
    user: state.auth.userName,
  }));

  const callbacks = {
    // Выход
    signOut: useCallback(() => store.actions.auth.signOut(), [store]),
  }

  const {t} = useTranslate();

  return (
    <PageLayout>
      <AuthBar user={select.user} signOut={callbacks.signOut} profileLink={`/profile`} loginLink={`/login`} t={t}/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <CatalogFilter/>
      <CatalogList/>
    </PageLayout>
  );
}

export default memo(Main);
