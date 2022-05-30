import Joi from 'joi'
import { getDB } from '~/config/mongodb'
import { ObjectId } from 'mongodb'
// Define column collection
const columnCollectionName = 'columns'
const columnCollectionSchema = Joi.object({
  boardId: Joi.string().required(),
  columnId: Joi.string().required(),
  title: Joi.string().required().min(3).max(20),
  cover: Joi.string().default(null),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false)
})

const validateSchema = async (data) => {
  return await columnCollectionSchema.validateAsync(data, { abortEarly: false })
}

const findOneById = async (id) => {
  try {
    const result = await getDB()
      .collection(columnCollectionName)
      .findOne({ _id: ObjectId(id) })
    console.log(result)
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const createNew = async (data) => {
  try {
    const value = await validateSchema(data)
    const result = await getDB()
      .collection(columnCollectionName)
      .insertOne(value)
    return findOneById(result.insertedId)
  } catch (error) {
    console.log(error)
  }
}

export const ColumnModel = { createNew }
