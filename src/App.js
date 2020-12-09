
import React, {useState, useEffect} from 'react';
import './App.css';
import Post from './Post';
import {db, auth} from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {Button, Input} from '@material-ui/core/';
import ImageUpload from './ImageUpload';
import firebase from 'firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import FlipMove from 'react-flip-move';
import ChatIcon from '@material-ui/icons/Chat';
function getModalStyle() {
  const top = 50 ;
  const left = 50 ;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

 



  

function SignIn() {
  
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null)
  const [verf, setVerf] = useState(null)
  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged((authUser)=>{
      if (authUser){
        console.log(authUser)
        
        
        setUser(authUser);
        setVerf(authUser.emailVerified)
        
        
      }else{
        setUser(null);
      }
    })
    return () =>{
      unsubscribe();
    }
  },[user,username])

 
  const signIn = (event) =>{
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password)
    .catch((error) => alert(error.message))
    setOpenSignIn(false)
    
  }

  const signUp=(event)=>{
    event.preventDefault();
    auth.createUserWithEmailAndPassword(email, password)
    .then((authUser)=>{
      return authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch((error)=>alert(error.message))
    setOpen(false)
    
   
  }

  function verr(){
    
      user.sendEmailVerification().then(function() {
        // Email sent.
        window.alert('Verification mail sent!')
        
        
        
        
      }).catch(function(error) {
        // An error happened.
        window.alert(':(')
      });
    
  }
  

  return (
    <div>
      {((user&&!verf)||(!user&&!verf))?(<div className="open">
      
      <Modal
        open={open}
        onClose={()=>{setOpen(false)}}
        
      >
              <div style={modalStyle} className={classes.paper}>
            <form className="app__signUp">
                <center>
            <img className="app__headerImage"
             src="https://scontent.xx.fbcdn.net/v/t1.15752-9/128656746_380737519879916_1922437333728547801_n.png?_nc_cat=105&ccb=2&_nc_sid=58c789&_nc_ohc=L-BMs2PzYXwAX_SA21p&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=a91f40664a002f6de7344372cbf8158b&oe=5FEF8DF0" 
             alt="insta" />

            </center>
            <Input 
              placeholder='Username'
              type='text'
              value={username}
              onChange={(e)=> setUsername(e.target.value)}
              />

            <Input 
              placeholder='email'
              type='text'
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
              />
              <Input 
              placeholder='password'
              type='password'
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
              />
              <Button type="submit" onClick={signUp}>Sign up</Button>
                </form>
            
            
            
          </div>
      </Modal>


      <Modal
        open={openSignIn}
        onClose={()=>{setOpenSignIn(false)}}
        
      >
              <div style={modalStyle} className={classes.paper}>
            <form className="app__signUp">
                <center>
            <img className="app__headerImage"
             src="https://scontent.xx.fbcdn.net/v/t1.15752-9/128656746_380737519879916_1922437333728547801_n.png?_nc_cat=105&ccb=2&_nc_sid=58c789&_nc_ohc=L-BMs2PzYXwAX_SA21p&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=a91f40664a002f6de7344372cbf8158b&oe=5FEF8DF0" 
             alt="insta" />

            </center>
            

            <Input 
              placeholder='email'
              type='text'
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
              />
              <Input 
              placeholder='password'
              type='password'
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
              />
              <Button type="submit" onClick={signIn}>Sign In</Button>
                </form>
            
            
            
          </div>
      </Modal>
       <div className="signinimg">
       <img src="https://scontent.fdac27-1.fna.fbcdn.net/v/t1.15752-9/130250234_676268889733003_5424408228838431154_n.png?_nc_cat=102&ccb=2&_nc_sid=ae9488&_nc_ohc=tFktD5Ma3DEAX8RacsA&_nc_ht=scontent.fdac27-1.fna&oh=e1503d79519ce81058a28843aaa61730&oe=5FF13418" alt="peer-village"></img>
       </div>
       <div className="app__loginContainer">
         <Button variant="contained" onClick={()=>setOpenSignIn(true)}>Sign In</Button>
         <Button variant="contained" style={{display: (user&&!verf)?'none':'block'}} onClick={()=>setOpen(true)}>Sign up</Button>
         {!verf ? (
      <form>
        <Button style={{display: ((user&&verf)||(!user&&!verf))?'none':'block'}} className="ver" onClick={verr}>Verify your account by clicking here!</Button>
      </form>
     ):(
       <div className="app__loginContainer">
         you are verified.
       </div>
      
     )}
       </div>
      <div>
        <div className="instruction">
        If you are new here-<br/>
        1. First sign up<br/>
        2. Verify your email<br/>
        3. Reload this page. <br/>
        4. Sign in and enjoy..
        </div>
        
        
      </div>
     
    </div>):<App/>}
    </div>
    
  )

}


 
function Verifymail(){
  
  return(
    
     <div>
       
       {<SignIn/>}
     </div>
    
  )
}  

  
  


function App() {
  const [posts, setPost] = useState([]);
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null)
  

  

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged((authUser)=>{
      if (authUser){
        console.log(authUser)
        
        
        setUser(authUser);
        
        
        
      }else{
        setUser(null);
      }
    })
    return () =>{
      unsubscribe();
    }
  },[user,username])
  
  function control(){
    auth.signOut()
    
  }
  
  
  // getModalStyle is not a pure function, we roll the style only on the first render
  
  
  useEffect(()=>{
    db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot=>{
      setPost(snapshot.docs.map(doc=>({
        id:doc.id,
        post:doc.data(),
        like: doc.like,
        us: doc.username,
        
        
      }))); 
    })
  }, [])
  
  
  return (
    <div className="App">

      
      
     <div className="app__header">
       <img className="app__headerImage" src="https://scontent.fdac27-1.fna.fbcdn.net/v/t1.15752-9/130250234_676268889733003_5424408228838431154_n.png?_nc_cat=102&ccb=2&_nc_sid=ae9488&_nc_ohc=tFktD5Ma3DEAX8RacsA&_nc_ht=scontent.fdac27-1.fna&oh=e1503d79519ce81058a28843aaa61730&oe=5FF13418" alt="peer-village"></img>
       <form>
         <Button><a href="https://messenger-d3559.web.app/"><ChatIcon/></a></Button>
     <Button type="submit" onClick={control} variant="outlined" color="secondary">Log out</Button>
     </form>
     </div>
     {user?.displayName?(
        <ImageUpload username={user.displayName} usermail={user.email} />
        
      ):(
        <h3>You need to log in </h3>
      )}
     
     <div className="app__post">
       
     {
       posts.map(({id, post,like,us,demail})=>(
         <Post key={id} user={user} postId={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} like={like} id={us} demail={post.usermail}/>
         
       ))
     }
     
     </div>
    
    </div>
  );
}

export default SignIn;
