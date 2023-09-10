import logo from './logo.svg';
import './App.css';
import React from 'react'
import music from './music.mp3'
import asake from './asake.mp3'
import './css/bootstrap5/css/bootstrap.min.css'
import './css/fontawesome_5/css/all.min.css'
import './css/acss/acss.css'
import './css/acss/acss_dark.css'
import avatar from './avatar.jpeg'
import wife from './wifeMaterial.mp3'
import newmusic from './newmusic.jpg'

const PlayerContext = React.createContext();

function PlayerContextProvider({children}){

let audioRefs = React.useRef([])
let currentAudioRef = React.useRef()
let [currentTrack, setCurrentTrack] = React.useState(null);
let [isPlaying,setIsPlaying] = React.useState(false);
let [audioDuration,setAudioDuration] = React.useState()
let [currentTime,setCurrentTime] = React.useState()
let [playingSign,setPlayingSign] = React.useState(false)

const readableAudioDuration = (x) =>{
var minutes = Math.floor(x.duration /60)
var seconds = Math.floor(x.duration %60)
return(`${minutes}:${seconds < 10 ? '0':''}${seconds}`)
}

const readableAudioCurrentTime = (x)=>{
var minutes = Math.floor(x.currentTime /60)
var seconds = Math.floor(x.currentTime %60)
return(`${minutes}:${seconds < 10 ? '0':''}${seconds}`)
}

const nextPlay =(x)=>{
var audio = document.getElementById('audio' + x.id)
audio.play()
audio.currentTime = audio.duration
}

const letPlay=(x,loop=false)=>{
    
    //let audio = audioRefs.current[x.id]
    var audio = document.getElementById('audio' + x.id)
    var audios = document.querySelectorAll('audio')
    if (audio == null){
      
    }
    
    let check = audio.paused
    
    if (check){
          audios.forEach((x)=>{x.pause();})
          audio.play()
          setPlayingSign(true)
    }
    else if(loop){
        audio.play()
        setPlayingSign(true)
    }
    else{
      audio.pause()
      setPlayingSign(false)
    }

    //check ? audio.play() : audio.pause()
    setIsPlaying(x)
    audio.addEventListener('timeupdate',()=>setCurrentTime(readableAudioCurrentTime(audio)))
  
    setAudioDuration(readableAudioDuration(audio))
   /* if (currentAudioRef.previous){
    let prev = currentAudioRef.previous[x.id]
    prev.pause()}
    console.log(x)
    //console.log(x)
    /*let audio = document.getElementById(x.id);
    console.log(x)
    ;
    console.log('tel ' + isPlaying)
*/
  }


return(
      <PlayerContext.Provider value = {{currentTrack, setCurrentTrack, isPlaying , setIsPlaying, letPlay, audioRefs, audioDuration,setAudioDuration,currentTime,setCurrentTime, nextPlay,playingSign,setPlayingSign}} >
        {children}
      </PlayerContext.Provider>
  )
}


function usePlayer(){
  return React.useContext(PlayerContext)
}


function SearchBar(props){
  return(
      <form action="">
        <input type='search' class="form-control sz-16 color-bg-black color-black" placeholder="search music" />
      </form>
  )
}

const PlaySign = ()=> <i class="fas fa-play"></i>
const PauseSign = ()=> <i class="fas fa-pause"></i>


function PlayerFullBox(props){
let {currentTrack, setCurrentTrack, isPlaying , setIsPlaying, letPlay, audioRefs, currentAudioRef,audioDuration,setAudioDuration,currentTime,setCurrentTime, nextPlay, playingSign, setPlayingSign} = usePlayer()
let [audioPercent,setAudioPercent] = React.useState('0%')
let [playSign,setPlaySign] = React.useState(true)

const toSeconds = (x) =>{
  var g = x.split(':')
  var minutes = +g[0] *60
  var seconds = +g[1]
  var time = minutes + seconds
  return time
}



React.useEffect(()=>{
  var t = audioDuration ? toSeconds(audioDuration) : ''
  var c = currentTime ? toSeconds(currentTime) : ''
  var percent = (c/t) * 100
  console.log(t)
  console.log(percent)
  setAudioPercent(`${percent}%`)
},[currentTime])

React.useEffect(()=>{
  setPlaySign(false)
},[playingSign])
return(
<div class="container-fluid color-bg-white position-fixed color-bg-black h-100 p-3 w-100" style={{top:'0',backgrund:`url(${props.items.coverPhoto})`,objectPosition:'',repeat:'no-repeat',lef:'0',right:'0',zIndex:'1000000'}}>
<br />
   <div class="row"> <div class="col-12 center"><img src={props.items.coverPhoto} class="img-fluid" style={{width:'350px',height:'350px',objectFit:'cover'}}/> </div></div>
   <br />
  <div class="row my-2"><div class="col-12 sz-20"> {props.items.title}</div>
   <div class="col color-silver"> {props.items.artist} </div>
   </div>
   
   <audio ref={currentAudioRef} ><source src={props.items.url} /></audio>
    <div class="row ">
    <div class="col-12 p-2"><div class="color-bg-black bg-light rounded w-100" style={{height:'3px'}} ></div><div class="contair color-bg-white rounded position-relative" style={{height:'3px',marginTop:'-3px',width:audioPercent,backgroundColor:'white'}} ></div> </div>
    </div>
   <div class="row">
    <div class="col sz-12 color-silver" style={{textAlign:'left'}}>{currentTime} </div>
    <div class="col sz-12 color-silver" style={{textAlign:'right'}}>{audioDuration}</div>
    </div>
    <br />
    <br />
    <div class="row justify-content-center align-items-center center">
    <div class="col-3"><button class="btn btn-link no-decoration color-black sz-18" onClick={()=>props.toggleFullScren()}> <i class="fas fa-compress"></i> </button></div>
   <div class="col-3"><button onClick={()=>letPlay(props.items)} class="btn btn-link no-decoration sz-24 rouded-circle" style={{ackgroundColor:'white',color:'white',widh:'50px',heiht:'50px'}}> {playingSign ? <PauseSign />:<PlaySign />} </button> </div>
   <div class="col-3"><button class="btn no-decoration color-dark-white sz-18" onClick={()=>nextPlay(props.items)}><i class="fas fa-step-forward color-black"></i></button></div>
   </div>
   
</div>

)
}

function PlayerSmallBox(props){
let {currentTrack, setCurrentTrack, isPlaying , setIsPlaying, letPlay, audioRefs, currentAudioRef, nextPlay, playingSign,setPlayingSign} = usePlayer()
return(
  <div id="fixed-bottom" class="fixed-bottom container-fluid p-2" style={{bttom:'25px',overflow:'hidden'}}>
    <div class="row align-items-center rounded bg-light p-2 m-1">
          <div class="col-md-1 col-3"><img src={props.items.coverPhoto} class="img-fluid rounded" style={{width:'50px',height:'50px',objectFit:'cover'}}/> </div>
          <div class="col bold btn-link no-decoration" onClick={props.onClick} >
          <div class="row"><div class="col-12 sz-14">{props.items.title} </div>
          <div class="col-12 color-silver sz-12">{props.items.artist} </div>
          </div>
          </div>

          <div class="col-2 col-md-1"><button onClick={()=>letPlay(props.items)} class="btn btn-link no-decoration color-dark-white sz-md-24"> {playingSign ? <PauseSign />:<PlaySign />} </button> </div>
          <div class="col-2 display-sm-none col-md-1"><button class="btn no-decoration color-dark-white" onClick={()=>nextPlay(props.items)}><i class="fas fa-step-forward"></i></button></div>
          <div class="col-2 col-md-1"><button class="btn no-decoration color-dark-white" onClick={()=>props.toggleFullScren()}> <i class="fas fa-expand"></i> </button> </div>
          
        <div class="row">
          <div class="col"><audio ref={currentAudioRef} ><source src={props.items.url} /></audio> </div>
        </div>
    </div>
  </div>
)
}

function Player(props){
let playerItems = props.Items
let [fullscreen,setFullScreen] = React.useState(false) 
let {playingSign,setPlayinSign} = usePlayer()
let player = React.useRef()

const changeMode = () => {
setFullScreen(fullscreen ? false : true);
let removeFixed = document.getElementById('fixed-bottom')
//removeFixed.classList.toggle('fixed-bottom')
}

React.useEffect(()=>{
if(playingSign){
  player.current.classList.remove('hide')
}
},[playingSign])

return(
    <div class="hide" ref={player}>
        {fullscreen ? <PlayerFullBox items={props.Items} toggleFullScren={()=>changeMode()} /> : <PlayerSmallBox items={props.Items} toggleFullScren={()=>changeMode()}/> }
    </div>
)

}


function SideBar(props){
  let navItems = [{name:'Home',url:''},{name:'Discover',url:''},{name:'Radio',url:''},{name:'Artist',url:''},{name:'Library',url:''}]

  if (props.items){
    let navItems = props.items
  }
  
  return(
        <div class='container'>
        {navItems.map((x)=>
          <div class='row m-2'>
          <div class='col p-2 sz-20'>
            <a class="no-decoration color-dark-white" href={x.url}> {x.name} </a>
          </div>
          </div>
        )}
        </div>
    )
}

function MusicBox(props){
  let dummy = [{title:'Yoga',artist:'Asake',size:'3.40mb',url:asake,coverPhoto:avatar,id:1},{title:'Pallazo',artist:'Asake',size:'3.40mb',url:music,coverPhoto:newmusic,id:2},{title:'Wife Material',artist:'Ponzi',size:'3.40mb',url:wife,coverPhoto:avatar,id:3}]
  //let dummy = {title:'',artist:'',url:'',coverPhoto:''}
  let musicList =props.items ? props.items : dummy 
  //let [nowPlaying,setNowPlaying]= React.useState(dummy) 
  let {currentTrack, setCurrentTrack, isPlaying , setIsPlaying, letPlay, audioRefs} = usePlayer()
  
  React.useEffect(()=>{
    var audios = document.querySelectorAll('audio');
    audios.forEach((audio)=>{
        var getIndex = audio.getAttribute('index');
        var index = +getIndex
        var nextSong = musicList[index+1];
        console.log(nextSong)
        if (nextSong == null){
          nextSong = musicList[0]
        }
        audio.addEventListener('play',()=>{document.querySelector(`.${audio.id}`).classList.add('show')});
        audio.addEventListener('pause',()=>{document.querySelector(`.${audio.id}`).classList.remove('show')});
        audio.addEventListener('ended',()=>{letPlay(nextSong,true)});
          //letPlay(musicList[index+1])
        })
    }
    ,[musicList.length])

  return(
    <div class="">
    <div class="row sz-24 color-p"><div class="col"> {props.title ? props.title: 'My Music'} </div> 
    </div>
      <div class="row m-1">
          {
            musicList.map((x,e)=>{
              return(
                    <div class="col-sm col-md-12 rounded borde p-2 my-2 m-md-1" key={x.id}>
                      <div class="row align-items-center">
                        <div class="col-3">
                        <img src={x.coverPhoto} class="img-fluid rounded" style={{width:'50px',height:'50px',objectFit:'cover'}}/> 
                        </div>
                        
                        <div class="col btn-link no-decoration" onClick={()=>letPlay(x)} >
                        <div class="row"> 
                        <div class="col-12">{x.title} </div>
                        <div class="col-12 sz-12 color-silver">{x.artist} </div>
                        </div>
                        </div>
                        <div class={`col hide audio${x.id}`} id={'spinner'+ x.id }><div class="spinner-grow"></div></div>
                        <div class="col"><audio index={e} id={"audio"+x.id}><source src={x.url} /></audio> </div>
                        <div class="col-2"><i class="fas fa-ellipsis-v passive color-silver"></i></div>
                    </div>
                    </div>
                )
            })
          }
          <Player Items={isPlaying} onClick={letPlay} /> 
    </div>
    </div>
  )
}


function App() {
  
  //let [nowPlaying, setNowPlaying] = React.useState(null)
  //let [musicList, setMusicList] = React.useState(dummy)

let myMusic = [{title:'Yoga',artist:'Asake',size:'3.40mb',url:asake,coverPhoto:avatar,id:5},{title:'Pallazo',artist:'Asake',size:'3.40mb',url:music,coverPhoto:avatar,id:6},{title:'Wife Material',artist:'Ponzi',size:'3.40mb',url:wife,coverPhoto:avatar,id:7}]
  return (
    <PlayerContextProvider>
    <div className="container-fluid font-apple" >
      <header className="navbar sz-24 mb-3">
              <div class="navbar-brand bold color-black ">AudioFlix </div>
              <div class="navbar-brand color-black display-md-none"> <i class="fas fa-bars"></i></div>
      </header>
      
        <div class="row">
        <div class="col-2 display-sm-none">
        <SearchBar />
        <SideBar />
        </div>
        <div class="col">
        <MusicBox />
        <br />
        <MusicBox items={myMusic} title="Trending Song"/>
        <br />
        <MusicBox />
        </div>

        </div>
                <br />
        <br />
        <br />
    </div>
    </PlayerContextProvider>
  );
}


// function App(){
    

//     return(
//       <div class='my-3' style={{backgroundImage:"url({avatar})"}}>
//           <div class='container'>
//                 <div class="row center my-2">
//                     <div class="col sz-36 sz-md-60 bold">
//                         Google
//                     </div>
//                 </div>

//                 <div class="row my-2">
//                     <div class="col sz-24">
//                         <input class="form-control" placeholder="Search Google or Type Url" />
//                     </div>
//                 </div>

//                 <div class="row my-2">
//                     <div class="col">
//                         <span class="d-inline-block rounded-circle p-2"><i class="fas fa-home"></i> </span>
//                     </div>
//                 </div>
//                 <div class="row center">
//                     <div class="col">
//                         <img src={avatar} class="img-fluid rounded-circle" style={{width:"300px",height:"300px"}}/>
//                     </div>
//                 </div>

//           </div>
//       </div>
//       )
// }

export default App;
