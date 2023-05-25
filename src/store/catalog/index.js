import { codeGenerator } from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      page: 1,
    };
  }

  async load(page = this.getState().page) {
    const skip = page ? (page - 1) * 10 : 0;
    const response = await fetch(
      `api/v1/articles?limit=10&skip=${skip}&fields=items(_id, title, price),count`
    );
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        page,
        totalPage: Math.ceil(json.result.count / 10),
      },
      "Загружены товары из АПИ"
    );
  }
}

export default Catalog;
