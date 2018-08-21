import React, { PureComponent } from 'react'
import { WiredButton, WiredCard, WiredTextarea } from 'wired-elements'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import '../node_modules/react-big-calendar/lib/css/react-big-calendar.css'
import './home.css'

BigCalendar.momentLocalizer(moment)

export default class Calendar extends PureComponent  {
  constructor(props) {
    super(props)

    let events = window.localStorage.getItem('sports')
    events = (events && typeof events !== 'string') ? JSON.parse(events) : [{
      id: 0,
      title: 'Sports',
      allDay: false,
      start: new Date(2018, 7, 11),
      end: new Date(2018, 7, 11),
    }]
    this.state = {
      events
    }
  }

  unique(a, b) {
    return b.find((item) => {
      return moment(item.start).isSame(a.start, 'day')
    })
  }

  pushEvent = () => {
    const len = this.state.events.length
    const events = this.state.events.slice(0)
    const newEvents = [{
      id: len,
      title: 'Sports',
      allDay: false,
      start: new Date(),
      end: new Date()
    }]
    if (this.unique(newEvents, events)) { return }
    this.setState({
      events: events.concat(newEvents)
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

  render() {
    const cardClass = this.state.showCard ? 'card card-show': 'card card-hidden'
    return (
      <div className='calendar'>
        <div className={cardClass}/>
        <wired-button class='clear-btn' onClick={this.clearAll}>
          clearAll
        </wired-button>
        <BigCalendar
          events={this.state.events}
          startAccessor='start'
          endAccessor='end'
          eventPropGetter={this.eventPropGetter}
        />
        <wired-button class='push-btn' onClick={this.pushEvent}>
          push events
        </wired-button>
      </div>
    )
  }
}
