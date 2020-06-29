  import React,{Component}from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation';
import Logo from './components/Logo';
import Imagelink from './components/Imagelink';
import FaceRec from './components/FaceRec';
import Signin from  './components/Signin';
import Register from './components/Register';
import Rank from './components/Rank';

import './CSS/App.css';


const particleoption={
   particles: {
        number: {
          value:80,
          density : {
            enable :true,
            value_area : 400
          }
        },
    },
    interactivity : {
      events :{
      onhover : {
        enable:true,
        mode:"grab"
      }
    },
    "modes": {
      "grab":{
        "distance":450,
        "line_linked":{
          "opacity":1
        }
      }
  },
  "repulse":{"distance":100,"duration":0.4}
}
}
const initialState = {
      input : '',
      imageUrl : '',
      box:{},
      route:'signin',
      issigned:false,
      user:{
        id:'',
        name : '',
        email : '',
        entries: 0,
        joined: ''
      }
  }

class App extends Component{
  constructor(){
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user:{
        id:data.id,
        name : data.name,
        email : data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  facelocation =(data) => {
    const faceArea=data.outputs[0].data.regions[0].region_info.bounding_box;
    const image= document.getElementById('inputimage')
    const hyt= Number(image.height);
    const wth=Number(image.width); 
    return {
      leftcol: faceArea.left_col*wth,
      toprow: faceArea.top_row*hyt,
      rightcol: wth-(faceArea.right_col*wth),
      bottomrow: hyt-(faceArea.bottom_row*hyt)
    }
  }

  display = (box) => {
    this.setState({
      box:box
    });
  }

  onInputChange = (event) => {
      this.setState({
        input:event.target.value
      })
  }
  onSubmit = (e) => {
    e.preventDefault();
    this.setState({
      imageUrl:this.state.input
      })
      fetch('https://brain-face-server.herokuapp.com/imageurl', { 
        method : 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({  
          input : this.state.input
        })
      })
      .then(response => response.json())
        .then(response =>{
      if(response!=='unable to work with API'){
        fetch('https://brain-face-server.herokuapp.com/image', { 
        method : 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({  
          id : this.state.user.id
        })
      })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user,{entries:count}))
        })
        this.display(this.facelocation(response));
    }
    else{
      alert("Please upload a clear Image");
    }
  })
    .catch(err => console.log(err));
  }
  onroutechange = (route) => {
    if(route==='home'){
        this.setState({issigned:true})
      }
    else if(route==='signout'){
        this.setState(initialState)
      }
    this.setState({route:route });
  }
  render() {
      return (
      <div className="App">
       <Particles className='particle' params={particleoption}/> 
          <Navigation issigned={this.state.issigned} onroutechange={this.onroutechange} />
          {this.state.route === 'home' 
            ? <div>
               <Logo />
               <Rank name={this.state.user.name} entries={this.state.user.entries} />
              <Imagelink onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
              <FaceRec  box={this.state.box} imageUrl={this.state.imageUrl}/>
          </div>
          : ( this.state.route==='signin'
              ?  <Signin loadUser={this.loadUser} onroutechange={this.onroutechange} /> 
              : <Register loadUser={this.loadUser} onroutechange={this.onroutechange} /> 
            )
        }
      </div>
    );
  }
}

export default App;
