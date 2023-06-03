import StoreModule from "../module";

class ProfileState extends StoreModule {
  initState() {
    return {
      waiting: true,
      user: null,
      auth: false,
    };
  }

  async getUser() {
    this.setState({
      ...this.getState(),
      auth: false,
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
          user: json.result,
          auth: true,
          waiting: false,
        });
      } catch (e) {
        this.setState({
          user: null,
          auth: false,
          waiting: false,
        });
      }
    }
  }
}

export default ProfileState;
