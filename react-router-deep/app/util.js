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

/**
 * [getFormattedDate 格式化日期]
 * @param  {Date} date [description]
 * @return {String}      [description]
 */
export function getFormattedDate(date = undefined) {
  return moment(date).format('YYYY-MM-DD HH:mm')
}
// TODO 计算连续打卡时长
