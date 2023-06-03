import StoreModule from "../module";

class ProfileState extends StoreModule {
  initState() {
    return {
      waiting: false,
      user: null,
    };
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
          user: json.result,
          waiting: false,
        });
      } catch (e) {
        this.setState({
          user: null,
          waiting: false,
        });
      }
    }
  }
}

export default ProfileState;
