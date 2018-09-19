import React, { PureComponent } from 'react'
import { WiredButton, WiredListbox, WiredIconButton } from 'wired-elements'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import swal from 'sweetalert'
import { isUnique,
  getFormattedDate,
  isRecentlyExercised,
  getLastingMax,
  getRecentlyLasting
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
    const events = this.state.events
    let Tip
    if (isRecentlyExercised(events)) {
      const lasting = getRecentlyLasting(events)
      console.info(lasting)
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
    const len = this.state.events.length
    const events = this.state.events.slice(0)
    const newEvents = {
      id: len,
      title,
      allDay: false,
      start: getFormattedDate(),
      end: getFormattedDate()
    }
    if (!isUnique(newEvents, events)) { return }
    this.setState({
      events: events.concat([newEvents])
    }, () => {
      window.localStorage.setItem('sports', JSON.stringify(this.state.events))
    })
  }

  clearAll = () => {
    this.setState({
      events: []
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

  handleSubmit = (e) => {
    if (e.keyCode === 13 && e.shiftKey) {
      const title = e.target.value ? `Sports: ${e.target.value}` : ''
      this.pushEvent(title)
      this.closeCard()
      swal(SWAL_PUNCH_SUCCESS)
    }
  }

  renderTip() {
    const lasting = getLastingMax(this.state.events)
    return (
      <wired-listbox class='wired-tip'>
        <wired-item value='one' text={`您最长连续打卡${lasting}天!`}></wired-item>
      </wired-listbox>
    )
  }

  renderCard() {
    const cardClass = this.state.showCard ? 'card card-show': 'card card-hidden'
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

  render() {
    return (
      <div className='calendar'>
        {this.renderTip()}
        {this.renderCard()}
        <wired-button class='clear-btn' onClick={this.clearAll}>
          clearAll
        </wired-button>
        <BigCalendar
          events={this.state.events}
          startAccessor='start'
          endAccessor='end'
          eventPropGetter={this.eventPropGetter}
        />
        <wired-icon-button class='push-btn red big' onClick={this.addEvent}>
          favorite
        </wired-icon-button>
      </div>
    )
  }
}
