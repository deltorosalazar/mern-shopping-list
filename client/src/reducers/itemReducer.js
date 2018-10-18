import uuid from 'uuid'
import { ADD_ITEM, GET_ITEMS, DELETE_ITEM } from "./../actions/types";

const initialState = {
  items: [
    {
      id: uuid(),
      name: 'Eggs'
    },
    {
      id: uuid(),
      name: 'Milk'
    },
    {
      id: uuid(),
      name: 'Steak'
    },
    {
      id: uuid(),
      name: 'Water'
    },
  ]
}

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_ITEMS:
      return {
        ...state
      }

    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      }
    return

    case ADD_ITEM:
      return {
        ...state,
        items: [action.payload, ...state.items]
      }
    return

    default:
      return state
  }
}

