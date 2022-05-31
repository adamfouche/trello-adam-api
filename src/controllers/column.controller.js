import { HttpStatusCode } from '~/utils/constants'
import { ColumnService } from '~/services/column.service'
const createNew = async (req, res) => {
  try {
    const result = await ColumnService.createNew(req.body)
    // console.log(result)
    res.status(HttpStatusCode.OK).json(result)
  } catch (error) {
    console.log(error)
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message
    })
  }
}

const update = async (req, res) => {
  try {
    const { id } = req.params
    const result = await ColumnService.update(id, req.body)
    // console.log(result)
    res.status(HttpStatusCode.OK).json(result)
  } catch (error) {
    console.log(error)
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message
    })
  }
}
export const ColumnController = { createNew, update }
