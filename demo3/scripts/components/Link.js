import React, {PropTypes} from 'react'
const T = PropTypes

/**
 * [带回调功能的链接]
 * @param  {[type]} options.active   [description]
 * @param  {[type]} options.children [description]
 * @param  {Function} options.onClick  [通过 mapDispatchToProps 派发的方法]
 * @return {[type]}                  [description]
 */
const Link = ({active, children, onClick}) => {
  if (active) {
    return <span>{children}</span>
  }

  return (
    <a href="#" onClick={e => {
      e.preventDefault();
      onClick();
    }}>
      {children}
    </a>
  )
}

Link.propTypes = {
  active: T.bool.isRequired,
  children: T.node.isRequired,
  onClick: T.func.isRequired
}

export default Link
