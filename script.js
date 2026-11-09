document.addEventListener('DOMContentLoaded', () => {
    const txtPrompt = document.getElementById("prompt");
    const btnSend = document.getElementById("btnSend");
    const responseDiv = document.getElementById("response");
    const modelSelector = document.getElementById("modelSelector");

    btnSend.addEventListener('click', async() => {
        const text = txtPrompt.value.trim();
        if (!text) return;
        
        const selectedModel = modelSelector.value;
        btnSend.disabled = true;
        responseDiv.textContent = "Pensando...";

        try {
            const res = await fetch('http://localhost:11434/api/generate', {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({
                model: selectedModel,
                prompt: text,
                stream: false,
                })
            });

            if (!res.ok) {
                throw new Error("Error http en la solicitud");
            }

            const data = await res.json();
            responseDiv.textContent = data.response ?? '(Sin respuesta)';

            txtPrompt.value = "";
        }
        catch(err) {
          console.error(err);
          responseDiv.textContent = "Error al conectar con Ollama";  
        }
        finally {
            btnSend.disabled = false;
        }
    });
})