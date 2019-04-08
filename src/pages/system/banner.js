import React from "react";
import Minigrid from "minigrid";
import "./style/banner.less";
import {
  Button,
  Card,
  Icon,
  Modal
} from 'antd';
import UploadTemplate from "./components/upload";
import system from "../../api/system";
import {tips, drop} from "../../actions";
import Empty from "../../components/public/Empty";
const { Meta } = Card;


class Banner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      banners: [],
      loading: true,
      visible: false
    }
  }
  componentDidMount() {
    this.getData();
  }

  initGrid () {
    let grid = new Minigrid({
      container: '.banner',
      item: '.card',
      gutter: 10
    });
    grid.mount();
    window.addEventListener('resize', () => {
      grid.mount()
    });
    let mulitImg = document.querySelectorAll(".card-cover");
    let promiseAll = [], img = [], imgTotal = mulitImg.length;
    for(let i = 0 ; i < imgTotal ; i++){
      promiseAll[i] = new Promise((resolve)=>{
        img[i] = new Image();
        img[i].src = mulitImg[i].src;
        img[i].onload = function(){
          //第i张加载完成
          resolve(img[i])
        }
      })
    }
    Promise.all(promiseAll).then(()=>{
      //全部加载完成
      grid.mount();
      this.setState({
        loading: false
      })
    })
  }
  // 添加banner
  createBanner = (data) => {
    system.banner_create(data).then((res) => {
      let banners = [...this.state.banners, res.data];
      this.setState({
        visible: false,
        banners
      });
    });
  };
  // banner列表
  getData = () => {
    system.banner_list().then((res) => {
      this.setState({
        banners: res.data
      }, () => {
        this.initGrid();
      });
    });
  };
  // 删除
  del = ({id}) => {
    drop().then(() => {
      system.banner_del(id).then(() => {
        this.setState((prevState) => ({
          banners: prevState.banners.filter((item) => item.id !== id)
        }));
        tips("成功", "success");
      })
    });
  };
  render() {
    const {banners, loading, visible} = this.state;
    return (
      <div className="banner-warp">
        <div className="banner-head" style={{paddingBottom: "20px"}}>
          <Button type="primary" icon="plus" onClick={() => this.setState({visible: true})}>添加</Button>
          {/*上传图像*/}
          <Modal
            title="上传头图"
            centered
            visible={visible}
            footer={null}
            onCancel={() => this.setState({visible: false})}
          >
            <UploadTemplate ok={this.createBanner} close={() => this.setState({visible: false})}/>
          </Modal>
        </div>
        <div className="banner">
          {
            banners.length ? banners.map((item, index) => (
              <Card
                className="card"
                key={index}
                hoverable
                style={{ width: "30%" }}
                cover={<img className="card-cover" alt="example" src={item.image} />}
                loading={loading}
                actions={[<Icon type="edit" />, <Icon type="delete" onClick={()=> this.del(item)}/>, <Icon type="ellipsis" />]}
              >
                <Meta
                  title={item.title}
                  description={item.desc}
                />
              </Card>
            )) : Empty
          }
        </div>
      </div>
    );
  }
}

export default Banner;
