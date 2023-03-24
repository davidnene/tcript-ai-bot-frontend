## **tcript AI Bot - Frontend**
tcript is a speech to text bot that uses WhisperAPI for transcription.

This is the frontend development repository.

### **Technologies**
- ReactJS
- Bootstrap
- Filestack

### **Architecture**
- A user adds their details and uploads an audio 10mb max
- Once the user clicks on transcribe;
  - The video is  uploaded to filestack via API
  - FIlestack API returns a response which includes the video link
  - The video link is sent to [backend/tcript API]('https://github.com/davidnene/tcript-ai-bot-backend.git') as a `POST` request
  - The tcript API returns the transcript as a response in json format
  - The transcript is then dispayed to the user
- The user can choose to save(coming soon!) or clear output and upload another audio

### **How to run client/UI on localhost**
- Ensure you have node package manager installed in your pc (npm)
- Clone this repository `git clone https://github.com/davidnene/tcript-ai-bot-frontend.git`
- Navigate into the directory via terminal `cd tcript-ai-bot-frontend` for linux/unix users
- Run `code .` to open your default IDE
- Open terminal and run `npm install` to install the required packages
- Run `npm start` to start the server
- If successful, your deault browser will open a new tab with the UI running on `http://localhost:3000`
- Walaah!! You can now upload your audio and experience the transcription magic!!

### **Live link**

### **Date released**
24-March-2023

### **Author**
David Nene - Fullstack | AI Engineer

