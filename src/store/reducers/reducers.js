import uuid from "uuid/v4";
import cloneDeep from "lodash/cloneDeep";
import {
  ADD_COLUMN,
  REMOVE_COLUMN,
  ADD_CARD,
  REMOVE_CARD,
  SWAP_COLUMN,
  MOVE_CARD,
  MOVE_CARD_ON_EMPTY_COLUMN
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

    case SWAP_COLUMN: {
      const { dragIndex, hoverIndex } = payload;
      columns = cloneDeep(state.columns);
      const tmp = columns[dragIndex];
      columns.splice(dragIndex, 1);
      columns.splice(hoverIndex, 0, tmp);
      return {
        ...state,
        columns
      };
    }

    case MOVE_CARD_ON_EMPTY_COLUMN: {
      const { lastColumnId, nextColumnId, cardId } = payload;
      if (lastColumnId === nextColumnId) return state;

      columns = cloneDeep(state.columns);
      const lastColumn = columns.find(column => {
        return column.id === lastColumnId;
      });

      const nextColumn = columns.find(column => {
        return column.id === nextColumnId;
      });

      const elementPos = lastColumn.cards.map(x => x.id).indexOf(cardId);
      const removed = lastColumn.cards.splice(elementPos, 1).pop();
      nextColumn.cards.push(removed);

      return {
        ...state,
        columns
      };
    }

    case MOVE_CARD: {
      const { lastColumnId, lastCardPos, nextColumnId, nextCardPos } = payload;
      columns = cloneDeep(state.columns);
      const lastColumn = columns.find(column => {
        return column.id === lastColumnId;
      });

      const nextColumn = columns.find(column => {
        return column.id === nextColumnId;
      });

      if (lastColumnId === nextColumnId) {
        lastColumn.cards.splice(
          nextCardPos,
          0,
          lastColumn.cards.splice(lastCardPos, 1)[0]
        );
      } else {
        nextColumn.cards.splice(nextCardPos, 0, lastColumn.cards[lastCardPos]);
        lastColumn.cards.splice(lastCardPos, 1);
      }

      return {
        ...state,
        columns
      };
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
