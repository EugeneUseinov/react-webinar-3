import StoreModule from '../module';

/**
 * Возможные категории товара
 */
class CategoryState extends StoreModule {
  initState() {
    return {
      data: [],
      waiting: false, // признак ожидания загрузки
    };
  }

  /**
   * Загрузка категорий
   * @return {Promise<void>}
   */
  async getCategory() {
    this.setState({
      data: [],
      waiting: true,
    });
    try {
      const response = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`);
      const json = await response.json();
      this.setState({
        data: json.result.items,
        waiting: false,
        }, 'Категории товаров загружены из АПИ',
      );
    } catch (e) {
        console.log('error');
      this.setState({
        data: [],
        waiting: false,
      });
    }
  }
}

export default CategoryState;