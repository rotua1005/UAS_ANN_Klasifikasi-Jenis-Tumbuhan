from flask import Flask, render_template, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import os
import base64
from io import BytesIO
from PIL import Image

app = Flask(__name__)

# Load model
model = load_model('plant_model.h5')

# Labels klasifikasi
LABELS = ['batang', 'daun', 'buah']

# Route utama untuk halaman web
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/team')
def team():
    return render_template('team.html')

@app.route('/info')
def info():
    return render_template('info.html')

# Route untuk prediksi dari file gambar
@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    # Simpan file gambar
    file_path = os.path.join('static', file.filename)
    file.save(file_path)

    # Preprocessing gambar
    img = image.load_img(file_path, target_size=(150, 150))
    x = image.img_to_array(img) / 255.0
    x = np.expand_dims(x, axis=0)

    # Prediksi gambar
    predictions = model.predict(x)
    result = LABELS[np.argmax(predictions)]

    return jsonify({'class': result, 'image_path': file_path})

# Route untuk prediksi gambar yang dikirim dari kamera
@app.route('/predict-video', methods=['POST'])
def predict_video():
    data = request.get_json()
    image_data = data.get('image', None)

    if not image_data:
        return jsonify({'error': 'No image data provided'}), 400

    # Menghapus prefix 'data:image/jpeg;base64,' dari base64 image string
    image_data = image_data.split(',')[1]
    img_bytes = base64.b64decode(image_data)

    # Mengubah byte menjadi gambar menggunakan PIL
    img = Image.open(BytesIO(img_bytes))
    img = img.resize((150, 150))  # Resize image sesuai ukuran yang dibutuhkan model
    img = np.array(img) / 255.0  # Normalisasi
    img = np.expand_dims(img, axis=0)

    # Prediksi gambar
    predictions = model.predict(img)
    result = LABELS[np.argmax(predictions)]

    # Menyimpan gambar untuk ditampilkan di frontend
    img_path = 'static/temp_image.jpg'
    img.save(img_path)

    return jsonify({'class': result, 'image_path': img_path})

if __name__ == '__main__':
    app.run(debug=True)
