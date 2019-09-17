import uuid from "uuid/v4";
import cloneDeep from "lodash/cloneDeep";
import {
  ADD_COLUMN,
  REMOVE_COLUMN,
  ADD_CARD,
  SHIFT_CARD,
  REMOVE_CARD,
  SWAP_CARD
} from "../consts";

export default {
  columns: [
    {
      title: "",
      cards: []
    }
  ],
  cards: [],
  card: {}
};

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

    case MOVE_CARD {

    }

    // case SHIFT_CARD: {
    //   const { srcColumnId, targetColumnId, srcCardId } = payload;
    //   if (srcColumnId !== targetColumnId) {
    //     const card = Object.assign({}, columns[srcColumnId].cards[srcCardId]);
    //     columns[srcColumnId].cards.splice(srcCardId, 1);
    //     columns[targetColumnId].cards.push(card);
    //     return {
    //       ...state,
    //       columns
    //     };
    //   }
    //   return state;
    // }

    // case SWAP_CARD: {
    //   const { src, target } = payload;
    //   console.log("payload", payload);
    //   columns = cloneDeep(state.columns);
    //   const tempCardStore = columns.find(({ id }) => id === src.columnId).cards[
    //     src.cardId
    //   ];
    //   console.log(columns.find(column => column.id === src.columnId).cards);
    //   console.log(src);
    //   columns[src.columnId].cards[src.cardId] =
    //     columns[target.columnId].cards[target.cardId];
    //   columns[target.columnId].cards[target.cardId] = tempCardStore;
    //   return {
    //     ...state,
    //     columns
    //   };
    // }

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
