import React from 'react'
import "./nomatch.less"

export default class NoMatch extends React.Component {

  render() {
    return (
      <div className="nomatch" style={{textAlign:'center',fontSize:'24'}}>
        404 No Found!!!
      </div>
    );
  }
}