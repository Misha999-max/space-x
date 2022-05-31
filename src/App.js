import React from 'react';
import Header from './components/header/Header';
import Home from './components/Home/Home';
import Main from './components/main/Main';
import Features from './components/Features/Features';
import Footer from './components/Footer/Footer';
import './style.css';
import FetchData from './servise/FetchData';
import {BrowserRouter,Route} from 'react-router-dom'
import Calendar from './components/calendar/Calendar';
import Details from './components/details/Details';
 

class App extends React.Component {

  fetchData = new FetchData();

   state = {
    rocket:'Falcon 1',
    rocketFeatures: null,
    rockets:[],
    company: null,
  };

  componentDidMount () {
    this.updateRoket();
    this.upDateCompany()
    
  }

  updateRoket() {
    console.log(this.state)

    this.fetchData.getRocket()
        .then(data=> {
          this.setState({rockets:data.map(item => item.name)})
          return data
        })
        .then(data => data.find(item => item.name === this.state.rocket))
        .then(rocketFeatures => this.setState({ rocketFeatures }));

    console.log(this.state)
  }

  changeRocket = (rocket) => {
    this.setState({
      rocket
    },this.updateRoket())
  }
  upDateCompany = () => { 
      this.fetchData.getCompany()
        .then(company => this.setState({company}) ) 
  }

  render (){
    console.log(this.state)
    return (

      <BrowserRouter>
        <Header rockets ={this.state.rockets} changeRocket={this.changeRocket}/>

        <Route path='/'>
         {this.state.company && <Home company ={this.state.company} />}
        </Route>

        <Route path ='/rocket'>
          <Main rocket={this.state.rocket}/>
          {this.state.rocketFeatures &&
           <Features rocket = {this.state.rocket} {...this.state.rocketFeatures}/>}
        </Route>
       
       <Route path='/calendar'>
            {/* <Main/> */}
          <Calendar/>
       </Route>
       <Route path='/details'>
            {/* <Main/> */}
          <Details/>
       </Route>
        
        
        {this.state.company && <Footer {...this.state.company.links} />}
        
      </BrowserRouter>
    );
  }
 
}

export default App;
