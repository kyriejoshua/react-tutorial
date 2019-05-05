import React, { PureComponent } from 'react'
import { WiredButton, WiredListbox, WiredIconButton, WiredCard } from 'wired-elements'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import swal from 'sweetalert'
import { isUnique,
  isSameDate,
  getToday,
  getFormattedDate,
  isRecentlyExercised,
  getLastingMax,
  getRecentlyLasting,
  getExercisedInfo,
  getCurrentEvents
} from './util'
import data from './data'
import * as CONSTANTS from './constants'
import '../node_modules/react-big-calendar/lib/css/react-big-calendar.css'
import './home.css'

BigCalendar.momentLocalizer(moment)

const SWAL_PUNCH_WARNING = {
  title: CONSTANTS.PUNCH_WARNING,
  icon: 'warning',
  button: false
}

const SWAL_PUNCH_SUCCESS = {
  title: CONSTANTS.PUNCH_SUCCESS,
  icon: 'success',
  button: false
}

const SWAL_PUNCH_INFO = {
  icon: 'info',
  button: false
}

const CURRENTYEAR = new Date().getFullYear()
const LASTYEAR = CURRENTYEAR - 1

export default class Home extends PureComponent  {
  constructor(props) {
    super(props)

    let events = window.localStorage.getItem('sports')
    events = (events && typeof events !== 'string') ? JSON.parse(events) : data
    this.state = {
      events
    }
  }

  componentDidMount() {
    const { events } = this.state
    const currentEvents = getCurrentEvents(events)
    let Tip
    if (isRecentlyExercised(currentEvents)) {
      const lasting = getRecentlyLasting(currentEvents)
      Object.assign(SWAL_PUNCH_INFO, { title: `您当前连续打卡 ${lasting} 天！继续努力！`})
      Tip = SWAL_PUNCH_INFO
    } else {
      Tip = SWAL_PUNCH_WARNING
    }
    swal(Tip)
  }

  addEvent = () => {
    this.setState({ showCard: true })
  }

  pushEvent = (title = 'Sports') => {
    const { events } = this.state
    const currentEvents = getCurrentEvents(events, 'new')
    const len = currentEvents.length
    const newCurrentEvents = currentEvents.slice(0)
    const newEvents = {
      id: len,
      title,
      allDay: false,
      start: getFormattedDate(),
      end: getFormattedDate()
    }
    if (!isUnique(newEvents, currentEvents)) { return }
    events[CURRENTYEAR] = newCurrentEvents.concat([newEvents])
    this.setState({ events }, () => {
      window.localStorage.setItem('sports', JSON.stringify(this.state.events))
    })
  }

  /**
   * [清除今日数据，仅在今日有数据时清除]
   * @return {[type]} [description]
   */
  clearToday = () => {
    const { events } = this.state
    const currentEvents = getCurrentEvents(events, 'new')
    const lastEvent = currentEvents[currentEvents.length - 1]
    if (lastEvent && isSameDate(getToday(), lastEvent.start)) {
      currentEvents.pop()
      events[CURRENTYEAR] = currentEvents
    }
    this.setState({ events }, () => {
      window.localStorage.setItem('sports', undefined)
    })
  }

  /**
   * [清除所有数据]
   * @return {[type]} [description]
   */
  clearAll = () => {
    this.setState({
      events: {}
    }, () => {
      window.localStorage.setItem('sports', undefined)
    })
  }

  /**
   * [手动设置 events 样式]
   * @param  {[type]}  event      [description]
   * @param  {[type]}  start      [description]
   * @param  {[type]}  end        [description]
   * @param  {Boolean} isSelected [description]
   * @return {[type]}             [description]
   */
  eventPropGetter = (event, start, end, isSelected) => {
    const eventStyle = {
      event: {
        margin: '10px',
        paddingLeft: '20px',
        borderRadius: '4px',
        backgroundColor: '#78c2ad'
      }
    }

    return {
      style: eventStyle.event
    }
  }

  closeCard = () => {
    this.setState({ showCard: false })
  }

  handleCard = () => {
    this.setState({ showInfo: !this.state.showInfo })
  }

  handleSubmit = (e) => {
    if (e.keyCode === 13 && e.shiftKey) {
      const title = e.target.value ? `Sports: ${e.target.value}` : ''
      this.pushEvent(title)
      this.closeCard()
      swal(SWAL_PUNCH_SUCCESS)
    }
  }

  renderTip() {
    const currentEvents = getCurrentEvents(this.state.events)
    const lasting = getLastingMax(currentEvents)
    return (
      <wired-listbox class='wired-tip'>
        <wired-item value='one' text={`您最长连续打卡${lasting}天!`}></wired-item>
      </wired-listbox>
    )
  }

  renderCard() {
    const cardClass = this.state.showCard ? 'card show': 'card hidden'
    return (
      <div className={cardClass}>
        <div className='calendar-card'>
          <textarea className='card-textarea'
          onKeyDown={this.handleSubmit}
          onBlur={this.closeCard}/>
        </div>
      </div>
    )
  }

  renderInfo() {
    const cardInfoClass = this.state.showInfo ? 'show': 'hidden'
    const currentEvents = getCurrentEvents(this.state.events)
    const len = Array.isArray(currentEvents) ? currentEvents.length : 0
    const LastingAllTip = `您目前已打卡 ${len} 次。`
    const lasting = getLastingMax(currentEvents)
    const LastingLongestTip = `其中，最长连续打卡 ${lasting} 次。`
    const info = getExercisedInfo(currentEvents)
    let { monthly = [], times = {} } = info
    const LastingDay = `其中，最多的一天是 ${times.maxDay}, 做了 ${times.max} 下。`
    return (
      <wired-card class={`wired-card ${cardInfoClass}`} onClick={this.handleCard}>
        <h3>{this.state.events[CURRENTYEAR] ? CURRENTYEAR : LASTYEAR} 打卡统计面板:</h3>
        <h4>{LastingAllTip}</h4>
        <h4>{LastingLongestTip}</h4>
        {monthly.map((item) => {
          return (<h4 key={item.key}>{`其中，${item.month} 月打卡 ${item.times} 次。`}</h4>)
        })}
        <h4>{LastingDay}</h4>
      </wired-card>
    )
  }

  renderBtns() {
    return (
      <div className='btns'>
        <wired-icon-button class='push-btn red big' onClick={this.addEvent}>
          favorite
        </wired-icon-button>
        <wired-icon-button class='info-btn green big' onClick={this.handleCard}>
          info
        </wired-icon-button>
      </div>
    )
  }

  renderClear() {
    return (
      <div className="clear-btns">
        <wired-button class='clear-btn' onClick={this.clearToday}>
          clearToday
        </wired-button>
        <wired-button class='clear-btn' onClick={this.clearAll}>
          clearAll
        </wired-button>
      </div>
    )
  }

  renderCalendar() {
    const currentEvents = getCurrentEvents(this.state.events)
    return <BigCalendar
          events={currentEvents}
          startAccessor='start'
          endAccessor='end'
          eventPropGetter={this.eventPropGetter}
        />
  }

  render() {
    return (
      <div className='calendar'>
        {this.renderTip()}
        {this.renderCard()}
        {this.renderClear()}
        {this.renderCalendar()}
        {this.renderBtns()}
        {this.renderInfo()}
      </div>
    )
  }
}
