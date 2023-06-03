import { isValidToken } from "../../utils";
import StoreModule from "../module";

class LoginState extends StoreModule {
  initState() {
    return {
      login: "",
      password: "",
      error: null,
      waiting: false,
      isLogin: false,
      userName: null,
    };
  }
  resetError() {
    this.setState({
      ...this.getState(),
      error: null,
    });
  }

  async login(login, password) {
    this.setState({
      ...this.getState(),
      waiting: true,
    });
    try {
      const response = await fetch("/api/v1/users/sign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login,
          password,
        }),
      });
      const json = await response.json();

      if (json.result) {
        const { token, user } = json.result;
        localStorage.setItem("token", token);
        this.setState({
          ...this.getState(),
          isLogin: true,
          waiting: false,
          userName: user?.profile?.name,
        });
      } else {
        this.setState({
          userName: null,
          waiting: false,
          error: json.error?.data?.issues
            ?.map((error) => error.message)
            .join(", "),
        });
      }
    } catch (error) {
      this.setState({
        ...this.getState(),
        error: error.message,
        waiting: false,
      });
    } finally {
      this.setState({
        ...this.getState(),
        waiting: false,
      });
    }
  }

  async logout() {
    try {
      await fetch("/api/v1/users/sign", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-Token": localStorage.getItem("token"),
        },
      });
      localStorage.removeItem("token");
      window.location.replace("/");
    } catch (error) {
      this.setState({
        ...this.getState(),
        isLogin: false,
        error: error.message,
      });
    }
  }

  async isAuth() {
    this.setState({
      ...this.getState(),
      waiting: true,
    });
    const token = localStorage.getItem("token");
    if (!isValidToken(token)) {
      localStorage.removeItem("token");
      this.setState({
        ...this.getState(),
        waiting: false,
      });
      return;
    }
    if (token) {
      const response = await fetch("/api/v1/users/self", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Token": token,
        },
      });
      const json = await response.json();

      this.setState({
        ...this.getState(),
        userName: json.result?.profile?.name,
        waiting: false,
        isLogin: true,
      });
    }
  }
}

export default LoginState;
