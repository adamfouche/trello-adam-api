import { BoardModel } from '~/models/board.model'
import { cloneDeep } from 'lodash'
const createNew = async (data) => {
  try {
    const result = await BoardModel.createNew(data)
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const getFullBoard = async (boardId) => {
  try {
    const board = await BoardModel.getFullBoard(boardId)
    // Add card to each column
    if (!board || !board.columns) {
      throw new Error('Board not found!')
    }
    // Filter out all of the column that have _destroy = false
    const transformBoard = cloneDeep(board)
    transformBoard.columns = transformBoard.columns.filter(
      (col) => col._destroy === false
    )
    transformBoard.columns.forEach((column) => {
      column.cards = transformBoard.cards.filter(
        (card) => card.columnId.toString() === column._id.toString()
      )
    })
    // Sort column by columnOrder, sort card b cardOrder, this step will be implelmented in the front-end side.
    // Remove cards array
    delete transformBoard.cards
    // console.log(board)
    return transformBoard
  } catch (error) {
    throw new Error(error)
  }
}
export const BoardService = { createNew, getFullBoard }
