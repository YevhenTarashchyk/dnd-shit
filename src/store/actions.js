import {
  ADD_COLUMN,
  ADD_CARD,
  CHANGE_CARD_COLUMN,
  REMOVE_CARD,
  REMOVE_COLUMN,
  SWAP_CARD,
  SWAP_COLUMN
} from "./consts.js";

export const addColumn = columnName => ({
  type: ADD_COLUMN,
  payload: columnName
});
export const addCard = (description, columnId) => ({
  type: ADD_CARD,
  payload: { description, columnId }
});
export const removeCard = (cardId, columnId) => ({
  type: REMOVE_CARD,
  payload: {
    cardId,
    columnId
  }
});
export const removeColumn = columnId => ({
  type: REMOVE_COLUMN,
  payload: columnId
});

export const changeCardOrder = (source, target) => {
  return {
    type: SWAP_CARD,
    payload: {
      source,
      target
    }
  };
};

export const changeColumnOrder = (dragIndex, hoverIndex) => {
  return {
    type: SWAP_COLUMN,
    payload: {
      dragIndex,
      hoverIndex
    }
  };
};

export const changeCardColumn = (source, targetColumnId) => {
  return {
    type: CHANGE_CARD_COLUMN,
    payload: {
      sourceColumnIndex: source.columnIndex,
      sourceCardId: source.cardId,
      targetColumnId: targetColumnId
    }
  };
};
