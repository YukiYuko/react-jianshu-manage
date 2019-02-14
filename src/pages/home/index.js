import React from 'react';
import admin from "../../api/admin";

class Home extends React.Component {
  componentDidMount() {
    admin.getAdminList().then((res) => {
      console.log(res)
    })
  }

  render() {
    return (
      <div className="home-wrap">
        首页
      </div>
    )
  }
}

export default Home;