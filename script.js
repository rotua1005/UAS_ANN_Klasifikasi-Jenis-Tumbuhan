// JavaScript to handle camera capture and prediction
window.onload = function () {
    const video = document.getElementById('video');
    const captureButton = document.getElementById('capture');
    const predictButton = document.getElementById('predictBtn');
    const canvas = document.getElementById('canvas');
    const capturedImg = document.getElementById('capturedImg');
    const capturedImageDiv = document.getElementById('capturedImage');

    // Start video stream from camera
    navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
            video.srcObject = stream;
        })
        .catch((err) => {
            console.log('Error accessing webcam: ' + err);
        });

    // Capture image from the video feed
    captureButton.onclick = function () {
        // Draw the current video frame on the canvas
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

        // Display the captured image
        const imageData = canvas.toDataURL('image/jpeg');
        capturedImg.src = imageData;
        capturedImageDiv.style.display = 'block';
        predictButton.style.display = 'inline-block';
    };

    // Predict using the captured image
    predictButton.onclick = function () {
        const formData = new FormData();
        formData.append('file', dataURLtoFile(canvas.toDataURL(), 'capturedImage.jpg'));

        // Send the image to the backend for prediction
        fetch('/predict', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.class) {
                alert('Prediction: ' + data.class);
            } else {
                alert('Error: ' + data.error);
            }
        })
        .catch(error => {
            console.error('Error during prediction:', error);
        });
    };
};

// Helper function to convert Data URL to File
function dataURLtoFile(dataurl, filename) {
    const arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type: mime});
}
