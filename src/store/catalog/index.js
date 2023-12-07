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
      current: 0,
      currentArticle: {},
      itemsOnPage: 10,
    }
  }

  async load(id, itemsOnPage) {
    itemsOnPage = this.getState().itemsOnPage
    const currentPage = id || 1;
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
