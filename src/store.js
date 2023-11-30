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
   * Добавление новой записи либо увеличение счётчика в текущей
   */
addItem(item) {
  if (!this.state.basket?.length) {
    this.setState({
      ...this.state,
      basket: [{ ...item, count: 1 }],
      totalPrice: item.price,
    });
  } else {
    const basket = [...this.state.basket];
    const index = basket.findIndex((el) => el.code == item.code);
    if (index + 1) {
      basket[index] = { ...basket[index], count: basket[index].count + 1 };
    } else {
      basket.push({ ...item, count: 1 });
    }
    //Сортировка позиций в корзине по возрастанию индекса
    basket.sort((a, b) => a["code"] > b["code"] ? 1 : -1);
    const totalPrice = basket.reduce((acc, item) => {
      return acc + item.price * item.count;
    }, 0);
    this.setState({
      ...this.state,
      basket: basket,
      totalPrice: totalPrice
    });
  }
}

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code, price, count) {
    this.setState({
      ...this.state,
      basket: this.state.basket.filter((item) => item.code !== code),
      totalPrice: this.state.totalPrice - Number(price*count), 
    });
  }

  openModal() {
    this.setState({
      ...this.state,
      modalActive: true,
    });
  }
  closeModal() {
    this.setState({
      ...this.state,
      modalActive: false,
    });
  }
}

export default Store;
