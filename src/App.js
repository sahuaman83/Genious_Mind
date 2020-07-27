import React ,{Component} from 'react';
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Rank from './components/Rank/Rank.js';
import Signin from './components/Signin/Signin.js';
import Register from './components/Register/Register.js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import './App.css';
import 'tachyons';

const app = new Clarifai.App({
 apiKey: 'e6e47fea9af14a71b0be73c9f8416591'
});

const particlesOptions={
  particles: {
    number:{
      value:125,
      density:{
        enable: true,
        value_area:800,
      }},
     size:{
      value:1,
    }},
       interactivity: {
      events: {
          onhover: {
              enable: true,
              mode: "repulse"
    }}}} 

class App extends Component{
  constructor(){
    super();
    this.state={
      input:"",
      imageUrl:"",
      box:{},
      route: "signin",
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

// componentDidMount(){
//   fetch('http://localhost:3001')
//   .then(response=>response.json())
//   .then(data=>console.log(data))
// }

loadUser=(data)=>{
  this.setState({
    user:{
    id: data.id,
    name: data.name,
    email: data.email,
    entries: data.entries,
    joined: data.joined
    }
  })
}

calculateFaceLocation=(data)=>{
  const clarifaiFace=data.outputs[0].data.regions[0].region_info.bounding_box;
  const image=document.getElementById("inputImage");
  const width=Number(image.width);
  const height=Number(image.height);
  // console.log(clarifaiFace);
  // console.log(width,height);

  return{
    leftCol: clarifaiFace.left_col * width,
    topRow: clarifaiFace.top_row * height,
    rightCol: width - (clarifaiFace.right_col * width),
    bottomRow: height - (clarifaiFace.bottom_row * height)
  }
}

displayFaceBox=(box)=>{
  // console.log(box);
  this.setState({box:box})
}

onInputChange=(event)=>{
this.setState({input:event.target.value});
}

onPictureSubmit=(event)=>{
  this.setState({imageUrl:this.state.input});
  app.models.initModel({id: Clarifai.FACE_DETECT_MODEL})
      .then(generalModel => {
        return generalModel.predict(this.state.imageUrl);
      })
      .then(response=>{
        if(response){
          fetch('http://localhost:3001/image',{
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response=>response.json())
        .then(count=>{
          this.setState(Object.assign(this.state.user,{entries:count}))
        })
      }
        this.displayFaceBox(this.calculateFaceLocation(response))
      });
}

 onRouteChange=(route)=>{
  if(route==="signout")
    this.setState({isSignedIn:false})
  else
    if(route==="home")
       this.setState({isSignedIn:true})
  this.setState({route:route})
 }

  render(){
  return (
    <div className="App">
    <Particles className="particles" params={particlesOptions}/>
    <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
    {
      this.state.route==="home"
      ? <div>
            <Logo/>
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
            <ImageLinkForm 
            onInputChange={this.onInputChange}
            onPictureSubmit={this.onPictureSubmit}
            />
            <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
       </div> 
      :(
          this.state.route==="signin"
          ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          :  <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
        )
     
    }
    </div>
  );}
}

export default App;
