import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      list: [],
      current: 1,
      itemsOnPage: 10,
    }
  }

  async startUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    let catalogPage = Number(urlParams.get('page')) || 1;
    await this.load(catalogPage, true);
  }

  async load(id, rewriteURL = false) {
    const itemsOnPage = this.getState().itemsOnPage
    const currentPage = id || 1;
    let urlSearch = new URLSearchParams({page: currentPage}).toString();
    const url = window.location.pathname + '?' + urlSearch + window.location.hash;
    if (rewriteURL) {
      window.history.replaceState({}, '', url);
    } else {
      window.history.pushState({}, '', url);
    }
    const response = await fetch(
      `/api/v1/articles?limit=${itemsOnPage}&skip=${
        currentPage * itemsOnPage - itemsOnPage
      }&fields=items(_id, title, price),count`
    );
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items,
      count: json.result.count,
      current: currentPage,
    }, 'Загружены товары из АПИ');
  }
}

export default Catalog;
