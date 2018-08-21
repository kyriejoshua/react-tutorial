import moment from 'moment'

/**
 * [isUnique 判断是否已打卡过]
 * @param  {Object}  a [description]
 * @param  {Array}  b [description]
 * @return {Boolean}   [description]
 */
export function isUnique(a, b) {
  return !b.find((item) => {
    return moment(item.start).isSame(a.start, 'day')
  })
}

// TODO 计算连续打卡时长
