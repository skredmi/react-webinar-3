import StoreModule from "../module";

/**
 * Состояние каталога - параметры фильтра исписок товара
 */
class CategoryState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      categories: [],
    };
  }

  async getCategories() {
    const response = await fetch(
      "/api/v1/categories?fields=_id,title,parent(_id)&limit=*"
    );
    const json = await response.json();
    this.setState({
      ...this.getState(),
      categories: json.result.items,
    });
  }
}

export default CategoryState;
