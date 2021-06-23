/*
 * @Author: wangyunbo
 * @Date: 2021-06-23 15:21:38
 * @LastEditors: wangyunbo
 * @LastEditTime: 2021-06-23 15:26:02
 * @Description: file content
 * @FilePath: \dayByday\npm\example\test-repos-library-react\src\App.js
 */
import logo from './logo.svg';
import './App.css';
import { getRepos } from 'github-repos-search-test'
function App() {
  getRepos().then((repositories) => console.log(repositories))
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
