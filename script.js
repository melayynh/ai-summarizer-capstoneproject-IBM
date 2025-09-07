async function summarizeText() {
    const text = document.getElementById("inputText").value;
    const output = document.getElementById("output");
    output.innerText = "⏳ Sedang meringkas...";
  
    try {
      const response = await fetch("http://localhost:3000/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
  
      const data = await response.json();
  
      if (data.summary) {
        output.innerText = "📌 Ringkasan:\n\n" + data.summary;
      } else {
        output.innerText = "⚠️ Gagal merangkum. Coba lagi!";
      }
    } catch (error) {
      output.innerText = "❌ Terjadi error: " + error.message;
    }
  }
  