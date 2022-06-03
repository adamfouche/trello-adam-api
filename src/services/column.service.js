import { ColumnModel } from '~/models/column.model'
import { BoardModel } from '~/models/board.model'
import { CardModel } from '~/models/card.model'
import { ObjectId } from 'mongodb'
const createNew = async (data) => {
  try {
    const newColumn = await ColumnModel.createNew(data)
    newColumn.cards = []
    // Update columnOrder in board collection
    await BoardModel.pushColumnOrder(
      newColumn.boardId.toString(),
      newColumn._id.toString()
    )
    return newColumn
  } catch (error) {
    throw new Error(error)
  }
}

const update = async (id, data) => {
  try {
    const updateData = {
      ...data,
      updatedAt: Date.now()
    }
    if (updateData._id) delete updateData._id
    if (updateData.cards) delete updateData.cards
    if (updateData.boardId) updateData.boardId = ObjectId(updateData.boardId)
    const updatedColumn = await ColumnModel.update(id, updateData)
    if (updatedColumn._destroy) {
      // Remove all cards in this column
      CardModel.deleteMany(updatedColumn.cardOrder)
    }
    return updatedColumn
  } catch (error) {
    throw new Error(error)
  }
}

export const ColumnService = { createNew, update }
