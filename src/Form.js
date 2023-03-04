import { useState } from "react"

function Form(){
   const [transcript, setTranscript] = useState('')
   const [buttonClick, setButtonclick] = useState(false)
   const [name, setName] = useState('')
   const [audioURL, setAudioURL] = useState('')
   const [error, setError] = useState(null)
   
    const data = {
        name,
        audioURL
    }
   
    const URL = "http://127.0.0.1:5000/transcripts"
    

    function handleName(e){
        setName(e.target.value)
    }

    function handleURL(e){
        setAudioURL(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        console.log(data)
        setButtonclick(!buttonClick)
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
            setName('')
            setAudioURL('')
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
        if(error){
            setError(null)
        }
    }

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
                <label className="visually-hidden" htmlFor="autoSizingInput" >URL</label>
                <input type="text" className="htmlForm-control" id="autoSizingInput" placeholder="Audio URL" onChange={handleURL} value={audioURL} required/>
            </div>
            <div className="col-auto">
                <label className="visually-hidden" htmlFor="autoSizingSelect">Audio type</label>
                <select className="htmlForm-select" id="autoSizingSelect" defaultValue="0">
                <option value="0">WAV</option>
                <option value="1">M4a</option>
                <option value="2">MP3</option> 
                </select>
            </div>
            
            <div className="col-auto">
                <button type="submit" className="btn btn-primary">Transcribe</button>
            </div>
        </form>
        <div >
            <p>{error?<b style={{'color':'red'}}>Error Occurred! Please provide a valid link</b>:transcript === '' && buttonClick === true?"loading...": transcript['transcript']}</p>
        </div>
        {
            transcript !== '' || error ?<div className="col-auto">
            <button onClick={handleClearoutput} className="btn btn-danger">Clear output</button>
        </div>:''
        }
    </div>
)}

export default Form;