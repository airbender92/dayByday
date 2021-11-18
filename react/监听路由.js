/*
 * @Author: wangyunbo
 * @Date: 2021-11-18 16:19:40
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-11-18 16:19:40
 * @FilePath: \dayByday\react\监听路由.js
 * @Description: file content
 */
class App extends Component {
  
  componentWillMount() {
    this.unlisten = this.props.history.listen((location, action) => {
      console.log("on route change");
    });
  }
  componentWillUnmount() {
      this.unlisten();
  }
  render() {
     return (
         <div>{this.props.children}</div>
      );
  }
}
export default withRouter(App);