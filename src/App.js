import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Create from './components/create_component';
import Edit from './components/edit_component';
import Index from './components/index_component';

class App extends React.Component {

  constructor() {
    super();

    this.state = {
      provinces :[]
    }
  }

    componentDidMount(){
      // ajax call
      fetch('http://localhost:8000/api/all')
      .then(response => response.json())
      .then((json) => {
        this.setState({
          provinces :json.data
        })
      })
    }

    filter = () => {
      fetch('http://localhost:8000/api/get?filter=' + this.state.filter)
      .then(response => response.json())
      .then((json) => {
        this.setState({
          provinces :json.data
        })
      })
    }

    onChangeText = (event) => {
      this.setState({
        filter : event.target.value
      })
    }

    renderProvinces(item,index) {
      return <li key={index}>{item.name}</li>
    }

  render() {
    return(
      <Router>
      <div className="container">
         <nav className="navbar navbar-expand-lg navbar-light bg-light">
           <Link to={'/'} className="navbar-brand">React CRUD Example</Link>
           <div className="collapse navbar-collapse" id="navbarSupportedContent">
             <ul className="navbar-nav mr-auto">
             <li className="nav-item">
                 <Link to={'/'} className="nav-link">Home</Link>
               </li>
               <li className="nav-item">
                 <Link to={'/create'} className="nav-link">Create</Link>
               </li>
               <li className="nav-item">
                 <Link to={'/index'} className="nav-link">Index</Link>
               </li>
             </ul>
           </div>
         </nav> <br/>
         <h2>Welcome to React CRUD Tutorial</h2> <br/>
         <Switch>
             <Route exact path='/create' component={ Create } />
             <Route path='/edit/:id' component={ Edit } />
             <Route path='/index' component={ Index } />
         </Switch>

      <div className="App" style={{textAlign:"left"}}>
        <p className="App-intro">
          Filter
        </p>
        <input type="text" value={this.state.filter} onChange={this.onChangeText} style={{marginBottom: 8}}/><br/>
        <button onClick={this.filter}>Saring</button>

        <div style={{display: 'flex', justifyContent: 'center', textAlign: 'left'}}>
          <ol>
             { this.state.provinces.map(this.renderProvinces) }
          </ol>
        </div>
      </div>

      </div>
      </Router>
    );
  }
}

export default App;
