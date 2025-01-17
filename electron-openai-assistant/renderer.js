const recordBtn = document.getElementById('record-btn');
const indicator = document.getElementById('indicator');
let mediaRecorder;
let audioChunks = [];

// Function to send the transcribed message to OpenAI and get a response
async function sendToOpenAI(message) {
  try {
    indicator.style.backgroundColor = 'blue';

    const response = await fetch('https://relay-openai.onrender.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer fk-1',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: message }],
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    indicator.style.backgroundColor = 'grey';
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error communicating with OpenAI API:", error);
    indicator.style.backgroundColor = 'grey';
  }
}

// When the button is pressed, start recording
recordBtn.addEventListener('mousedown', async () => {
  try {
    indicator.style.backgroundColor = 'red';
    console.log("Recording started...");

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    audioChunks = [];

    mediaRecorder.ondataavailable = (e) => {
      audioChunks.push(e.data);
      console.log("Audio data captured:", e.data);
    };

    mediaRecorder.start();
  } catch (err) {
    console.error("Error accessing microphone:", err);
  }
});

// When the button is released, stop recording
recordBtn.addEventListener('mouseup', async () => {
  console.log("Recording stopped.");
  indicator.style.backgroundColor = 'grey';

  if (mediaRecorder && mediaRecorder.state !== 'inactive') {
    mediaRecorder.stop();

    mediaRecorder.onstop = async () => {
      console.log("Recording complete.");

      const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
      const audioUrl = URL.createObjectURL(audioBlob);

      console.log("Audio playback URL:", audioUrl);

      const audio = new Audio(audioUrl);
      audio.play();
    };
  }
});
