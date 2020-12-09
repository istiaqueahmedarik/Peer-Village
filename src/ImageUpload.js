import React, {useState} from 'react'
import { Button} from "@material-ui/core"
import { storage, db} from "./firebase"
import firebase from 'firebase';
import './ImageUpload.css'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

function Imageupload({username,usermail}) {
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [caption, setCaption] = useState('');
    

    const handleChange = (e) => {
        if(e.target.files[0]){
            setImage(e.target.files[0]);
        }
    }

    const handleUpload = ()=>{
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) *100
                )
                setProgress(progress)
            },
            (error) =>{
                console.log(error);
                alert(error.message)
            },
            ()=>{
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url =>{
                        db.collection("posts").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            imageUrl: url,
                            username: username,
                            usermail: usermail
                            
                            
                        })
                        setProgress(0);
                        setCaption("");
                        setImage(null);
                    })
            }
        )
    }
    const text = ()=>{
        db.collection("posts").add({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            
                            username: username,
                            usermail: usermail
        })
        setCaption("");
    }
    const useStyles = makeStyles((theme) => ({
        root: {
          '& > *': {
            margin: theme.spacing(1),
          },
        },
        input: {
          display:"none"
        },
      }));
    const classes = useStyles();
    return (
        
        <div className="ImageUpload">
            <CircularProgress variant="determinate" value={progress}  />
            
          <input type="text" placeholder="Enter a Caption.." onChange={event=>setCaption(event.target.value)} value={caption} className="post__input"/>
          
          <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={handleChange}
      />
      <label htmlFor="contained-button-file">
        <IconButton color="primary" aria-label="upload picture" component="span" disabled={image}>
        <PhotoCamera />
        </IconButton>
      </label>
          
          <Button variant="contained" color="primary" component="span" type="submit"   onClick ={handleUpload} disabled={!image} >
          Upload
        </Button>
        <Button variant="contained" color="primary" component="span" type="submit"   onClick ={text} disabled={!caption || image} >
          Post
        </Button>
          
        </div>
    )
}

export default Imageupload
