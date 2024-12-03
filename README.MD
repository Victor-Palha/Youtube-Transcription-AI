# Youtube Transcription
This is a fullstack app create using Javascript, Node.js and Express. The app uses the Youtube API with ffmpeg to transcribe Youtube videos.

## Client
The client is made using vanilla Javascript and is responsible for sending the Youtube video URL to the server.
After the server downloads the video, the client will display the transcription using the **Xenova Transformers** as a AI model.

## Server
The server download videos from youtube and convert them to mp3, saving them in a folder called "audios" in the src folder of the project.
## Routes
### /audio -> GET
This route receives a query parameter called "v" with the video id of the youtube video and returns the path to audio file of the video in mp3 format.
* https://api.victor-palha/audio?v=video_id
* Response:
```json
{
    "message": "Audio downloaded and converted to mp3",
    "path": "path_to_audio"
}
```
### /audio -> DELETE
This route receives a query parameter called "v" with the video id of the youtube video and deletes the audio file of the video.
* https://api.victor-palha/audio?v=video_id
* Response: status 204

## Installation
To install the app, you need to have Node.js installed on your machine. After that, you can clone the repository and run the following commands:
```bash
cd client
npm install
npm run build
cd ..
cd server
npm install
```

## Running the app
To run the app, you can use the script `start.sh` in the root directory. This script will start the server and the client at the same time.

### Manual start
To start the server, you can run the following command:
```bash
cd server
npm run start
```

To start the client, you can run the following command:
```bash
cd client
npm run preview
```

### Docker
If you have docker installed on your machine, you can run the following command to start the app:
```bash
docker-compose up --build
```

