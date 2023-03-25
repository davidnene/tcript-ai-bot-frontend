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
   const [audioEmail, setAudioEmail] = useState('')

   const client = filestack.init('AR9IpPZYtQqujze7lQqt7z');
   const options = {
        fromSources: ["local_file_system","url"],
        accept: ["audio/*"],
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
   
    const URL = "https://tcript-api.onrender.com/transcripts"
    

    function handleName(e){
        setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
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
        })
        
    }

    function handleClearoutput(){
        setTranscript('')
        setButtonclick(false)
        setName('')
        setAudioURL('')
        setAudioTitle('')
        setAudioEmail('')
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

    function handleAudioEmail(e){
        setAudioEmail(e.target.value)
    }

    const uploadBtnColor = audioURL !== ""? "btn btn-success": "btn btn-primary"

    return (
    <div>
                <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark" data-bs-theme="dark">
        <div className="container-fluid text-white">
            <a className="navbar-brand text-white" href="/"><em>tcript AI</em></a>
            <button className="navbar-toggler btn btn-light bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon "></span>
            </button>
            <div className="collapse navbar-collapse text-white" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item ">
                <a className="nav-link active text-white" aria-current="page" href="/">Home</a>
                </li>
                <li className="nav-item">
                <a className="nav-link text-white" href="/">Features</a>
                </li>
                <li className="nav-item">
                <a className="nav-link text-white" href="/">Pricing</a>
                </li>
            </ul>
            <span className="navbar-text text-white">
                speech to text like magic!
            </span>
            </div>
        </div>
        </nav>
        <div>
            {/* <h4 className="bg-black text-white">tcript AI Bot</h4> */}
            <p >
                <b>Speech-to-Text Transcription Bot</b><br/>
                Accepted formats: MP3, MP4a, WAV<br/>
                Maximum size: 10mbs
            </p>
        </div>
    <div className="position-relative mx-auto" style={{"width": "90%"}}> 
    <div className="p-5">
       <form className="row gy-2 gx-3 align-items-center" onSubmit={handleSubmit}>
            <div className="col-auto">
                <label className="visually-hidden" htmlFor="autoSizingInput" >Name</label>
                <input type="text" className="htmlForm-control" id="autoSizingInput" placeholder="Name" onChange={handleName} value={name} required/>
            </div>
            <div className="col-auto">
                <label className="visually-hidden" htmlFor="autoSizingInputGroup">Email</label>
                <div className="input-group">
                <div className="input-group-text">@</div>
                <input type="text" className="htmlForm-control" id="autoSizingInputGroup" placeholder="email" onChange={handleAudioEmail} value={audioEmail} required/>
                </div>
            </div>
            <div className="col-auto">
                <label className="visually-hidden" htmlFor="autoSizingInput" >Title</label>
                <input type="text" onChange={handleAudioTitle} className="htmlForm-control" id="autoSizingInput" placeholder="Topic/Title" value={audioTitle} required/>
            </div>
            <div className="col-auto">
                <label htmlFor="autoSizingSelect">Audio type</label><br/>
                <select className="htmlForm-select" id="autoSizingSelect" defaultValue="0">
                <option value="0">Music</option>
                <option value="1">Podcast</option>
                <option value="2">Voice</option> 
                </select>
            </div>
            <div className="col-auto">
                <button onClick={handleFileUpload} type="submit" className={uploadBtnColor}>{audioURL !== ""?"Uploaded": "Upload audio"}</button>
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
        {
            transcript !== ''?
            <div className="col-auto border border-dark" style={{'padding':'20px'}}>
                <p>{error?<b style={{'color':'red'}}>Error Occurred! Please provide a valid link</b>:transcript === '' && buttonClick === true?<b>loading...</b>: transcript['transcript']}</p>
            </div>: transcript
        }
        {
            transcript === '' && buttonClick === true?<b>loading...</b>: ''
        }
        <br/>
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
    </div>
    </div>
)}

export default Form;