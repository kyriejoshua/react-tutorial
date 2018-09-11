import React, { PureComponent } from 'react'
import { WiredButton } from 'wired-elements'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import swal from 'sweetalert'
import { isUnique, getFormattedDate, isRecentlyExercised } from './util'
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
    !isRecentlyExercised(this.state.events) && swal(SWAL_PUNCH_WARNING)
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

  render() {
    const cardClass = this.state.showCard ? 'card card-show': 'card card-hidden'
    return (
      <div className='calendar'>
        <div className={cardClass}>
          <div className='calendar-card'>
            <textarea className='card-textarea'
            onKeyDown={this.handleSubmit}
            onBlur={this.closeCard}/>
          </div>
        </div>
        <wired-button class='clear-btn' onClick={this.clearAll}>
          clearAll
        </wired-button>
        <BigCalendar
          events={this.state.events}
          startAccessor='start'
          endAccessor='end'
          eventPropGetter={this.eventPropGetter}
        />
        <wired-button class='push-btn' onClick={this.addEvent}>
          push events
        </wired-button>
      </div>
    )
  }
}
