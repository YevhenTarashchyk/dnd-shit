import {
  ADD_COLUMN,
  ADD_CARD,
  SHIFT_CARD,
  REMOVE_CARD,
  REMOVE_COLUMN,
  SWAP_CARD
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

export const swapCard = (
  srcColumnId,
  srcCardId,
  targetColumnId,
  targetCardId
) => ({
  type: SWAP_CARD,
  payload: {
    src: {
      columnId: srcColumnId,
      cardId: srcCardId
    },
    target: {
      columnId: targetColumnId,
      cardId: targetCardId
    }
  }
});
export const shiftCard = (src, target) => ({
  type: SHIFT_CARD,
  payload: {
    targetColumnId: target.id,
    srcColumnId: src.columnId,
    srcCardId: src.cardId
  }
});
