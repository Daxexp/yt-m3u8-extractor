
async function extract() {
  const url = document.getElementById("urlInput").value;
  const response = await fetch("/extract", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url })
  });
  const data = await response.json();
  const resultsDiv = document.getElementById("results");
  const preview = document.getElementById("preview");
  resultsDiv.innerHTML = "";
  preview.innerHTML = "";

  if (data.error) {
    resultsDiv.innerHTML = "<p style='color:red'>" + data.error + "</p>";
    return;
  }

  const info = data.info;
  preview.innerHTML = `
    <h3>${info.title}</h3>
    <p>By ${info.uploader}</p>
    <img src="${info.thumbnail}" width="320" />
    <iframe width="100%" height="400" src="https://www.youtube.com/embed/${info.id}" frameborder="0"></iframe>
    <iframe width="100%" height="300" src="https://www.youtube.com/live_chat?v=${info.id}&embed_domain=localhost" frameborder="0"></iframe>
    <button onclick="generateShare('${info.webpage_url}')">🔗 Generate Share Link</button>
  `;

  info.formats.filter(f => f.url && f.ext === 'mp4' || f.ext === 'm3u8').forEach(f => {
    const div = document.createElement("div");
    div.innerHTML = `
      <p>${f.format} [${f.resolution || 'audio'}]</p>
      <a href="${f.url}" target="_blank">${f.url}</a>
      <div id="qrcode-${f.format_id}"></div>
    `;
    resultsDiv.appendChild(div);
    QRCode.toCanvas(document.getElementById(`qrcode-${f.format_id}`), f.url);
  });
}

function generateShare(url) {
  fetch("/share", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url })
  }).then(res => res.json()).then(data => {
    alert("Sharable link: " + window.location.origin + data.share_url);
  });
}

function toggleTheme() {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
}
