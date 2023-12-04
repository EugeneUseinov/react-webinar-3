/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи либо увеличение счётчика в текущей.
   * Сортировка корзины по возрастанию кода товара.
   */
  addItem(code) {
    let isFound = false;
    let totalPrice = 0;
    const updatedBasket = this.getState().basket.map((item) => {
      let currentItem = item;
      if (item.code === code) {
        isFound = true;
        currentItem = { ...item, count: item.count + 1 };
      }
      totalPrice += currentItem.price * currentItem.count;
      return currentItem;
    });
    if (!isFound) {
      const item = this.getState().list.find((item) => item.code === code);
      updatedBasket.push({ ...item, count: 1 });
      totalPrice += item.price;
    }
    //Сортировка позиций в корзине по возрастанию индекса
    updatedBasket.sort((a, b) => (a["code"] > b["code"] ? 1 : -1));
    this.setState({
      ...this.state,
      basket: updatedBasket,
      totalPrice: totalPrice,
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   * @param price
   * @param count
   */
  deleteItem(code, price, count) {
    this.setState({
      ...this.state,
      basket: this.state.basket.filter((item) => item.code !== code),
      totalPrice: this.state.totalPrice - Number(price*count), 
    });
  }

  /**
   * Открытие модального окна по флагу
   */
  openModal() {
    this.setState({
      ...this.state,
      modalActive: true,
    });
  }

  /**
   * Закрытие модального окна по флагу
   */
  closeModal() {
    this.setState({
      ...this.state,
      modalActive: false,
    });
  }
}

export default Store;
