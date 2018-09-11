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

/**
 * [getToday 获取当天]
 * @return {[type]} [description]
 */
export function getToday() {
  return moment()
}

/**
 * [getYesterday 获取昨天]
 * @return {[type]} [description]
 */
export function getYesterday() {
  return getToday().add(-1, 'days')
}

/**
 * [isRecentlyExercised 最近有没有锻炼啊]
 * @param  {Array}   events [description]
 * @return {Boolean}        [description]
 */
export function isRecentlyExercised(events = []) {
  if (!Array.isArray(events) || events.length === 0) { return }
  const lastDay = events[events.length - 1]
  return lastDay && (getYesterday().isSame(lastDay.start, 'day') || getToday().isSame(lastDay.start, 'day'))
}
// TODO 计算连续打卡时长
