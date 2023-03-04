function Form(){


return (
    <div>
       <form className="row gy-2 gx-3 align-items-center">
            <div className="col-auto">
                <label className="visually-hidden" for="autoSizingInput">Name</label>
                <input type="text" className="form-control" id="autoSizingInput" placeholder="Name"/>
            </div>
            <div className="col-auto">
                <label className="visually-hidden" for="autoSizingInputGroup">Email</label>
                <div className="input-group">
                <div className="input-group-text">@</div>
                <input type="text" className="form-control" id="autoSizingInputGroup" placeholder="email"/>
                </div>
            </div>
            <div className="col-auto">
                <label className="visually-hidden" for="autoSizingInput">URL</label>
                <input type="text" className="form-control" id="autoSizingInput" placeholder="Audio URL"/>
            </div>
            <div className="col-auto">
                <label className="visually-hidden" for="autoSizingSelect">Audio type</label>
                <select className="form-select" id="autoSizingSelect">
                <option selected>WAV</option>
                <option value="1">MP4a</option>
                <option value="2">MP3</option> 
                </select>
            </div>
            <div className="col-auto">
                <div className="form-check">
                <input className="form-check-input" type="checkbox" id="autoSizingCheck"/>
                <label className="form-check-label" for="autoSizingCheck">
                    Remember me
                </label>
                </div>
            </div>
            <div className="col-auto">
                <button type="submit" className="btn btn-primary">Transcribe</button>
            </div>
        </form>
    </div>
)}

export default Form;