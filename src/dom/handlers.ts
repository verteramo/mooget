import { ddQHandler } from './qhandler.dd'
import { manswerQHandler } from './qhandler.manswer'
import { matchQHandler } from './qhandler.match'
import { mchoiceQHandler } from './qhandler.mchoice'
import { textQHandler } from './qhandler.text'
import { truefalseQHandler } from './qhandler.truefalse'

export const handlers = [
  ddQHandler,
  manswerQHandler,
  matchQHandler,
  mchoiceQHandler,
  textQHandler,
  truefalseQHandler
]
