const AddItemByVoice = async ({ token, vendorId, setLoading, onResult }) => {
  if (!vendorId || !token) return alert("Authentication info missing.");
  setLoading(true);

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    const chunks = [];

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data);
    };

    mediaRecorder.onstop = async () => {
      const blob = new Blob(chunks, { type: "audio/webm" });
      const fd = new FormData();
      fd.append("audio", blob, "input.webm");
      fd.append("language", "1");

      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/transcribe`, {
          method: "POST",
          body: fd,
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Transcription failed");
        }

        const data = await res.json();
        const parsed = parseTranscription(data.transcription);
        onResult(parsed);
      } catch (err) {
        alert("Transcription Error: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    mediaRecorder.start();
    setTimeout(() => {
      mediaRecorder.stop();
      stream.getTracks().forEach((t) => t.stop());
    }, 10000); // 10 seconds
  } catch (err) {
    alert("Audio Error: " + err.message);
    setLoading(false);
  }
};

const parseTranscription = (text) => {
  const output = {};
  const matchItem = text.match(
    /(?:add\s)?(\d+)\s*(kg|kilo|grams|g|liters|litre|units|piece)?\s+of\s+(\w+)/i
  );
  if (matchItem) {
    const unitRaw = matchItem[2]?.toLowerCase() || "";
    const unitMap = {
      kg: "kg",
      kilo: "kilo",
      g: "kg",
      grams: "kg",
      litres: "litre",
      liters: "litre",
      litre: "litre",
      units: "piece",
      piece: "piece",
    };
    output.quantity = matchItem[1];
    output.unit = unitMap[unitRaw] || "";
    output.itemName = matchItem[3];
  }
  const cat = text.match(/category\s*(\w+)/i);
  if (cat) output.category = cat[1].toLowerCase();
  const pr = text.match(/price\s*(\d+(\.\d+)?)/i);
  if (pr) output.pricePerUnit = pr[1];
  return output;
};

export default AddItemByVoice;
