
# YouTube Livestream to M3U8 Extractor

A simple web app to extract M3U8 livestream URLs from YouTube videos using `yt-dlp` with a Flask backend.

## Features

- ✅ Paste YouTube livestream URL and extract stream info
- ✅ Display metadata: title, uploader, thumbnail
- ✅ Show embedded video + live chat
- ✅ Display all M3U8 stream links
- ✅ QR code generation for each link
- ✅ Generate shareable URLs
- ✅ Dark/Light theme toggle

## How to Run

1. Clone or download this repository:

```
git clone https://github.com/your-user/yt-m3u8-extractor.git
```

2. Install dependencies:

```
pip install -r requirements.txt
```

3. Start the server:

```
python app.py
```

4. Open in your browser:

```
http://127.0.0.1:5000/
```

## Technologies

- Python 3
- Flask
- yt-dlp
- HTML/CSS/JavaScript
- QRCode.js

## Notes

- This tool works best with YouTube livestreams or videos that have HLS (m3u8) formats.
- Ensure yt-dlp is up to date using `pip install -U yt-dlp`.

## License

MIT License
