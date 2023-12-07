import StoreModule from "../module";

class Language extends StoreModule {

  initState() {
    return {
      language: 'ru'
    }
  }

  onLangChange(value) {
    this.setState({
      ...this.getState(),
      language: value
    }, 'Смена языка');
  }
}

export default Language;
