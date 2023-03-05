import { useState } from "react"
import * as filestack from 'filestack-js'

function Form(){
   const [transcript, setTranscript] = useState('')
   const [buttonClick, setButtonclick] = useState(false)
   const [name, setName] = useState('')
   const [audioURL, setAudioURL] = useState('')
   const [error, setError] = useState(null)
   const [saveBtn, setSavebtn] = useState(false)
   const [uploadSuccessMessage, setUploadSuccessMessage] = useState('')
   const [audioTitle, setAudioTitle] = useState('')

   const client = filestack.init('AR9IpPZYtQqujze7lQqt7z');
   const options = {
        fromSources: ["local_file_system","url"],
        accept: ["video/*", "audio/*", "image/*"],
        onFileSelected: file => {
            if (file.size > 1000 * 1000 * 10) {
                throw new Error('File too big, select something smaller than 10MB');
            }
        },
        onFileUploadFinished: (data) => {
            setAudioURL(data['url'])
            setUploadSuccessMessage(`${audioTitle} file has been uploaded successfully :-)`)
        }
        };
   
   
    const data = {
        name,
        audioURL
    }
   
    const URL = "http://127.0.0.1:5000/transcripts"
    

    function handleName(e){
        setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        console.log(data)
        setButtonclick(!buttonClick)
        setUploadSuccessMessage('')
        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            setTranscript(data)
            setSavebtn(false)
            })
        .catch((error) => {
            setError(error)
            setButtonclick(!buttonClick)
            console.log(error)
        })
        
    }

    function handleClearoutput(){
        setTranscript('')
        setButtonclick(false)
        setName('')
        setAudioURL('')
        setAudioTitle('')
        if(error){
            setError(null)
        }
    }

    function handleSaveTranscript(){
        setSavebtn(true)
        //Save to db
    }
    
    
    function handleFileUpload(e){
        e.preventDefault()
        client.picker(options).open();

    }

    function handleAudioTitle(e){
        setAudioTitle(e.target.value)
    }

    const uploadBtnColor = audioURL !== ""? "btn btn-success": "btn btn-primary"

    return (
    <div className="p-5" >
       <form className="row gy-2 gx-3 align-items-center" onSubmit={handleSubmit}>
            <div className="col-auto">
                <label className="visually-hidden" htmlFor="autoSizingInput" >Name</label>
                <input type="text" className="htmlForm-control" id="autoSizingInput" placeholder="Name" onChange={handleName} value={name} required/>
            </div>
            <div className="col-auto">
                <label className="visually-hidden" htmlFor="autoSizingInputGroup">Email</label>
                <div className="input-group">
                <div className="input-group-text">@</div>
                <input type="text" className="htmlForm-control" id="autoSizingInputGroup" placeholder="email"/>
                </div>
            </div>
            <div className="col-auto">
                <label className="visually-hidden" htmlFor="autoSizingInput" >Title</label>
                <input type="text" onChange={handleAudioTitle} className="htmlForm-control" id="autoSizingInput" placeholder="Audio Title"required/>
            </div>
            <div className="col-auto">
                <label className="visually-hidden" htmlFor="autoSizingSelect">Audio type</label>
                <select className="htmlForm-select" id="autoSizingSelect" defaultValue="0">
                <option value="0">Music</option>
                <option value="1">Podcast</option>
                <option value="2">Voice</option> 
                </select>
            </div>
            <div className="col-auto">
                <button onClick={handleFileUpload} className={uploadBtnColor}>{audioURL !== ""?"Uploaded": "Upload audio"}</button>
            </div>
            {
            audioURL?<div className="col-auto">
                 <button type="submit" className="btn btn-primary">Transcribe</button>
            </div>:''
            }
        </form>
        <div>
        <p>{uploadSuccessMessage}</p>
        </div>
        <div className="col-auto, p-2">
            <p>{error?<b style={{'color':'red'}}>Error Occurred! Please provide a valid link</b>:transcript === '' && buttonClick === true?<b>loading...</b>: transcript['transcript']}</p>
        </div>
        <div className="col-auto">
            {
                transcript !== '' || error ?<div>
                <button onClick={handleClearoutput} className="btn btn-danger">Clear output</button>
            </div>:''
            }
        </div><br/>
        <div className="col-auto">
            {
            transcript === ''?'':<div >
                    <button onClick={handleSaveTranscript} className="btn btn-success">{saveBtn?"Saved!":"Save Output"}</button>
                </div>
            }
        </div>
    </div>
)}

export default Form;