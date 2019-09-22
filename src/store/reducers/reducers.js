import uuid from "uuid/v4";
import cloneDeep from "lodash/cloneDeep";
import {
  ADD_COLUMN,
  REMOVE_COLUMN,
  ADD_CARD,
  SWAP_CARD,
  REMOVE_CARD,
  CHANGE_CARD_COLUMN,
  SWAP_COLUMN
} from "../consts";
import initialState from "../state";

export default (state = initialState, { type, payload } = {}) => {
  let columns = [].concat(state.columns);
  switch (type) {
    case ADD_COLUMN: {
      columns[columns.length - 1] = {
        id: uuid(),
        title: payload,
        cards: []
      };
      columns.push({
        title: "",
        cards: []
      });
      return {
        ...state,
        columns
      };
    }
    case ADD_CARD: {
      const { description, columnId } = payload;

      const updatedColumn = cloneDeep(
        state.columns.find(({ id }) => id === columnId)
      );
      if (!updatedColumn) return state;

      updatedColumn.cards.push({
        id: uuid(),
        createdAt: Date.now(),
        description: description
      });
      columns = state.columns.map(col => {
        if (col.id === columnId) {
          return updatedColumn;
        }
        return col;
      });
      return {
        ...state,
        columns
      };
    }

    case SWAP_CARD: {
      const { source, target } = payload;
      columns = cloneDeep(state.columns);
      const sourceColumn = columns.find(({ id }) => id === source.columnId);
      const sourceCardIndex = source.cardIndex;
      const sourceCard = sourceColumn.cards[sourceCardIndex];
      const targetColumn = columns.find(({ id }) => id === target.columnId);
      const targetCardIndex = sourceColumn.cards.findIndex(
        ({ id }) => id === target.cardId
      );
      const targetCard = sourceColumn.cards[targetCardIndex];

      if (!sourceColumn || !sourceCard || !targetColumn || !targetCard)
        return state;
      targetColumn.cards[targetCardIndex] = sourceCard;
      sourceColumn.cards[sourceCardIndex] = targetCard;
      return {
        ...state,
        columns
      };
    }

    case SWAP_COLUMN: {
      const { dragIndex, hoverIndex } = payload;

      const tmp = columns[dragIndex];
      columns.splice(dragIndex, 1);
      columns.splice(hoverIndex, 0, tmp);
      return {
        ...state,
        columns
      };
    }

    case CHANGE_CARD_COLUMN: {
      const { sourceColumnIndex, sourceCardId, targetColumnId } = payload;
      const targetColumnIndex = state.columns.findIndex(
        ({ id }) => id === targetColumnId
      );

      if (sourceColumnIndex !== targetColumnId) {
        const card = Object.assign(
          {},
          columns[sourceColumnIndex].cards[sourceCardId]
        );
        columns[sourceColumnIndex].cards.splice(sourceCardId, 1);
        columns[targetColumnIndex].cards.push(card);
        return {
          ...state,
          columns
        };
      }
      return state;
    }

    case REMOVE_CARD: {
      const { cardId, columnId } = payload;
      if (!cardId) return;

      const columnIndex = state.columns.findIndex(({ id }) => id === columnId);
      const column = state.columns[columnIndex];

      const updatedColumn = {
        ...column,
        cards: column.cards.filter(card => card.id !== cardId)
      };
      columns[columnIndex] = updatedColumn;

      return {
        ...state,
        columns
      };
    }
    case REMOVE_COLUMN: {
      return {
        ...state,
        columns: state.columns.filter(column => column.id !== payload)
      };
    }

    default:
      return state;
  }
};
