import StoreModule from "../module";

/**
 * Информация о пользователе
 */
class ProfileState extends StoreModule {
  initState() {
    return {
      data: null,
      waiting: false, // признак ожидания загрузки
    };
  }

  //Получение пользователя по токену
  async getUserById() {
    this.setState({
      ...this.getState(),
      waiting: true,
    });
    try {
      const token = localStorage.getItem("userToken");
      const response = await fetch("/api/v1/users/self", {
        headers: {
          "Content-Type": "application/json",
          "X-Token": token,
        },
      });
      const json = await response.json();
      if (!response.ok) {
        throw json.error.data.issues;
      } else {
        const token = localStorage.getItem("userToken");
        if (!token) {
          localStorage.setItem("userToken", json.result.token);
        }
        this.setState(
          {
            data: json.result,
            waiting: false,
          },
          "Загружен профиль по токену из АПИ"
        );
      }
    } catch (e) {
      this.setState({
        data: null,
        waiting: false,
      });
    }
  }
}

export default ProfileState;
