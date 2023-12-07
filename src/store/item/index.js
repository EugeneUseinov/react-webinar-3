import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class Item extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      currentArticle: {},
    }
  }

  async loadById(id) {
    const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
    const json = await response.json();
    this.setState({
       ...this.getState(),
       currentArticle: json.result
    }, 'Загружено описание товара из API');
  }
}

export default Item;
