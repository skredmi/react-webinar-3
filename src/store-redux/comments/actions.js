export default {
  /**
   * Загрузка товара
   * @param id
   * @return {Function}
   */
  load: (id) => {
    return async (dispatch, getState, services) => {
      // Сброс текущего товара и установка признака ожидания загрузки
      dispatch({ type: "comments/load-start" });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?search[parent]=${id}&limit=*&fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type)),count`,
        });
        // Товар загружен успешно
        dispatch({
          type: "comments/load-success",
          payload: { data: res.data.result },
        });
      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: "comments/load-error" });
      }
    };
  },
  add: (text, type, parentId) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: "comments/add-start" });
      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type)),count`,
          method: "POST",
          body: JSON.stringify({
            parent: { _id: parentId, _type: type },
            text,
          }),
        });
        dispatch({
          type: "comments/add-success",
          payload: { data: res.data.result },
        });
      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: "comments/add-error" });
      }
    };
  },
};
