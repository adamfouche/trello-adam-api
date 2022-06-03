import Joi from 'joi'
import { getDB } from '~/config/mongodb'
import { ObjectId } from 'mongodb'
// Define card collection
const cardCollectionName = 'cards'
const cardCollectionSchema = Joi.object({
  boardId: Joi.string().required(),
  columnId: Joi.string().required(),
  title: Joi.string().required().min(3).max(30).trim(),
  cover: Joi.string().default(null),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false)
})

const validateSchema = async (data) => {
  return await cardCollectionSchema.validateAsync(data, { abortEarly: false })
}

const findOneById = async (id) => {
  try {
    const result = await getDB()
      .collection(cardCollectionName)
      .findOne({ _id: ObjectId(id) })
    console.log(result)
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const createNew = async (data) => {
  try {
    const validatedValue = await validateSchema(data)
    const insertValue = {
      ...validatedValue,
      boardId: ObjectId(validatedValue.boardId),
      columnId: ObjectId(validatedValue.columnId)
    }
    const result = await getDB()
      .collection(cardCollectionName)
      .insertOne(insertValue)
    return findOneById(result.insertedId)
  } catch (error) {
    throw new Error(error)
  }
}

/**
 *
 * @param {Array of string id} ids
 */
const deleteMany = async (ids) => {
  try {
    const transformIds = ids.map((id) => ObjectId(id))
    const result = await getDB()
      .collection(cardCollectionName)
      .updateMany({ _id: { $in: transformIds } }, { $set: { _destroy: true } })
    return result
  } catch (error) {
    throw new Error(error)
  }
}

export const CardModel = { createNew, cardCollectionName, deleteMany }
