import StoreModule from "../module";

/**
 * Информация о пользователе
 */
class AuthState extends StoreModule {
  initState() {
    return {
      waiting: false, // признак ожидания загрузки
      errors: [],
      userName: '',
    };
  }

  initUserFromStorage() {
    const userName = localStorage.getItem('userName')
    this.setState({
      ...this.getState(),
      userName: userName || '',
    });
  }

  async signIn(authInfo, callbackBySuccess) {
    this.setState({
      ...this.getState(),
      waiting: true,
    });
    try {
      const data = {
        login: authInfo.login,
        password: authInfo.password,
      };
      const response = await fetch("/api/v1/users/sign", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      console.log('login json.result', json.result);
      if (!response.ok) {
        // Поймали ошибку
        throw json.error.data.issues;
      } else {
        // Получили токен
        localStorage.setItem("userToken", json.result.token);
        localStorage.setItem("userName", json.result.user.profile.name);
        callbackBySuccess();
        this.setState(
          {
            waiting: false,
          },
          "Загружен профиль из АПИ"
        );
      }
    } catch (e) {
      this.setState({
        waiting: false,
        errors: e,
      });
    }
  }

  //Выход пользователя по токену
  async signOut() {
    const token = localStorage.getItem("userToken");
    this.setState({
      ...this.getState(),
      waiting: true,
    });
    try {
      await fetch(`/api/v1/users/sign`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-Token": token,
        },
      });
      localStorage.removeItem("userToken");
      localStorage.removeItem("userName");
      this.setState({
        ...this.getState(),
      });
    } catch (error) {
    } finally {
      this.setState({
        ...this.getState(),
        waiting: false,
        userName: '',
      });
    }
  }

//Сброс ошибки
 resetError() {
  if (this.getState().errors) {
    this.setState({
      ...this.getState(),
      errors: [],
    });
  }
}

}

export default AuthState;
