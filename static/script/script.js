// Dapatkan elemen video dan canvas
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const capturedImageContainer = document.getElementById('capturedImage');
const capturedImg = document.getElementById('capturedImg');
const captureButton = document.getElementById('capture');
const predictButton = document.getElementById('predictBtn');

// Cek apakah browser mendukung getUserMedia
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(stream) {
            video.srcObject = stream;
        })
        .catch(function(error) {
            console.log("Error accessing camera: ", error);
        });
}

// Fungsi untuk menangkap gambar
captureButton.addEventListener('click', function() {
    // Ambil gambar dari video dan gambar ke canvas
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Tampilkan gambar yang telah diambil
    const imageUrl = canvas.toDataURL('image/png');
    capturedImg.src = imageUrl;
    capturedImageContainer.style.display = 'block';

    // Tampilkan tombol prediksi
    predictButton.style.display = 'inline-block';
});

// Fungsi untuk prediksi gambar yang diambil
predictButton.addEventListener('click', function() {
    // Kirim gambar ke server untuk prediksi
    const formData = new FormData();
    formData.append('file', dataURItoBlob(capturedImg.src));

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
        alert('Error during prediction: ' + error);
    });
});

// Fungsi untuk mengubah data URI ke Blob
function dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/png' });
}

// Fungsi untuk mengunggah gambar
function uploadImage(event) {
    event.preventDefault();

    // Ambil file dari input
    const fileInput = document.getElementById('file');
    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append('file', file);

    // Kirim gambar ke server untuk prediksi
    fetch('/predict', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.class) {
            // Tampilkan gambar yang diunggah dan hasil prediksi
            document.getElementById('uploadedImage').src = data.image_path;
            document.getElementById('imageContainer').style.display = 'block';
            document.getElementById('result').style.display = 'block';
            document.getElementById('result').innerHTML = 'Prediction: ' + data.class;
        } else {
            alert('Error: ' + data.error);
        }
    })
    .catch(error => {
        alert('Error during prediction: ' + error);
    });
}
