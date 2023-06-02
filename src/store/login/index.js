import StoreModule from "../module";

class LoginState extends StoreModule {
  initState() {
    return {
      login: "",
      password: "",
      error: null,
      waiting: false,
      isLogin: false,
      date: null,
    };
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
          data: user,
        });
        window.location.replace("/");
      } else {
        this.setState({
          data: null,
          isLogin: false,
          waiting: false,
          error: json.error?.data?.issues
            ?.map((error) => error.message)
            .join(", "),
        });
        console.log(json);
      }
    } catch (error) {
      this.setState({
        ...this.getState(),
        error: error.message,
        waiting: false,
        isLogin: false,
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
        error: error.message,
      });
    }
  }

  async getUser() {
    this.setState({
      ...this.getState(),
      waiting: true,
    });
    const token = localStorage.getItem("token");
    if (token) {
      try {
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
          data: json.result,
          waiting: false,
          isLogin: true,
        });
      } catch (e) {
        this.setState({
          data: null,
          waiting: false,
        });
      }
    }
  }
}

export default LoginState;
