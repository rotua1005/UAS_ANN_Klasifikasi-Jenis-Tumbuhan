<h1>Klasifikasi Jenis Tumbuhan Menggunakan ANN</h1>
<p>Proyek ini adalah web untuk klasifikasi jenis tumbuhan menggunakan model ANN. Dibangun dengan Flask (backend), HTML, dan CSS (frontend). Model ANN dikembangkan di Google Colab dan diterapkan menggunakan Flask.</p>

<h2>Langkah-Langkah Menjalankan Proyek</h2>

<h3>1. Prasyarat</h3>
<p>Pastikan Anda memiliki perangkat lunak berikut terpasang di komputer Anda:</p>
<ul>
  <li><a href="https://www.python.org/downloads/">Python 3.8 atau lebih baru</a></li>
  <li><a href="https://git-scm.com/">Git</a></li>
  <li>Google Chrome atau browser lain</li>
</ul>

<h3>2. Instalasi Virtual Environment</h3>
<p>Langkah pertama adalah membuat environment virtual:</p>
<ol>
  <li>Buka terminal atau command prompt.</li>
  <li>Jalankan perintah berikut untuk membuat environment virtual:</li>
  <pre><code>python -m venv venv</code></pre>
  <li>Aktifkan environment virtual:</li>
  <ul>
    <li>Windows: <code>venv\Scripts\activate</code></li>
    <li>macOS/Linux: <code>source venv/bin/activate</code></li>
  </ul>
</ol>

<h3>3. Instalasi Dependensi</h3>
<p>Setelah environment virtual diaktifkan, instal semua dependensi yang dibutuhkan:</p>
<pre><code>pip install -r requirements.txt</code></pre>
<p>File <code>requirements.txt</code> berisi:</p>
<pre><code>
flask
tensorflow
numpy
pandas
</code></pre>

<h3>4. Menambahkan Model ANN</h3>
<p>Salin model ANN yang telah Anda simpan di Google Colab (misalnya, file <code>model.h5</code>) ke folder proyek. Pastikan Anda telah menyimpan file tersebut di folder <code>models/</code>.</p>

<h3>5. Menjalankan Aplikasi</h3>
<ol>
  <li>Jalankan aplikasi Flask dengan perintah:</li>
  <pre><code>python app.py</code></pre>
  <li>Buka browser dan akses aplikasi di <a href="http://127.0.0.1:5000" target="_blank">http://127.0.0.1:5000</a>.</li>
</ol>
