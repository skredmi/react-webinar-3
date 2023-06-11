// Начальное состояние
const initialState = {
  data: {},
  waiting: false,
}

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/load-start":
      return { ...state, data: {}, waiting: true};

    case "comments/load-success":
      return { ...state, data: action.payload.data, waiting: false};

    case "comments/load-error":
      return { ...state, data: {}, waiting: false};
    
    case "comments/add-start":
      return { ...state, data: {}, waiting: true};
  
    case "comments/add-success":
      return { ...state, data: [...state.data.items, action.payload.result], waiting: false};
      
    case "comments/add-error":
      return { ...state, data: {}, waiting: false};

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
