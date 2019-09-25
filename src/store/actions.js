import {
  ADD_COLUMN,
  ADD_CARD,
  REMOVE_CARD,
  REMOVE_COLUMN,
  SWAP_COLUMN,
  MOVE_CARD,
  DRAG_CARD_PLACEHOLDER
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

export const changeColumnOrder = (dragIndex, hoverIndex) => {
  return {
    type: SWAP_COLUMN,
    payload: {
      dragIndex,
      hoverIndex
    }
  };
};

export const moveCard = (
  lastColumnId,
  lastCardPos,
  nextColumnId,
  nextCardPos
) => {
  return {
    type: MOVE_CARD,
    payload: {
      lastColumnId,
      lastCardPos,
      nextColumnId,
      nextCardPos
    }
  };
};

export const setPlaceholder = (
  currentDragged,
  placeholderIndex,
  draggedDir,
  currentDraggedColumn,
  originColumn
) => {
  return {
    type: DRAG_CARD_PLACEHOLDER,
    payload: {
      currentDragged,
      placeholderIndex,
      draggedDir,
      currentDraggedColumn,
      originColumn
    }
  };
};
