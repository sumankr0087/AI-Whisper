const recordBtn = document.getElementById('record-btn'); // Button to start/stop recording
const indicator = document.getElementById('indicator'); // Visual indicator for assistant activity
let mediaRecorder;
let audioChunks = [];

// When the button is pressed, start recording
recordBtn.addEventListener('mousedown', async () => {
  try {
    indicator.style.backgroundColor = 'red'; // Change color to red while recording
    console.log("Recording started...");

    // Request microphone access and start capturing audio
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    audioChunks = []; // Clear previous audio chunks

    mediaRecorder.ondataavailable = (e) => {
      audioChunks.push(e.data);
      console.log("Audio data captured:", e.data); // Debug: Log each chunk
    };

    mediaRecorder.start();
  } catch (err) {
    console.error("Error accessing microphone:", err);
  }
});

// When the button is released, stop recording
recordBtn.addEventListener('mouseup', async () => {
  console.log("Recording stopped.");
  indicator.style.backgroundColor = 'grey'; // Reset indicator color

  if (mediaRecorder && mediaRecorder.state !== 'inactive') {
    mediaRecorder.stop();
    mediaRecorder.onstop = async () => {
      console.log("Recording complete.");

      // Combine audio chunks into a single Blob
      const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
      const audioUrl = URL.createObjectURL(audioBlob);

      console.log("Audio playback URL:", audioUrl);

      // Play back the recorded audio (for testing)
      const audio = new Audio(audioUrl);
      audio.play();

      // Optional: Save the audio file for inspection
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = audioUrl;
      a.download = 'recording.wav';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };
  }
});
