document.addEventListener('DOMContentLoaded', () => {
    const txtPrompt = document.getElementById("prompt");
    const btnSend = document.getElementById("btnSend");
    const chatDiv = document.getElementById("chat");
    const modelSelector = document.getElementById("modelSelector");
    const messages = [];

    function showChat() {
        chatDiv.innerHTML = "";
        messages.forEach(({ role, content}) => {
            const bubbleDiv = document.createElement("div");
            bubbleDiv.classList.add("bubble", role == "user" ? "bubble-user" : "bubble-assistant");
            bubbleDiv.textContent = content;
            chatDiv.appendChild(bubbleDiv);
        })
        chatDiv.scrollTop = chatDiv.scrollHeight;
    }

    btnSend.addEventListener('click', async() => {
        const text = txtPrompt.value.trim();
        if (!text) return;
        
        messages.push({
            role: "user",
            content: text
        });
        
        txtPrompt.value = "";
        showChat();

        const selectedModel = modelSelector.value;
        btnSend.disabled = true;
        txtPrompt.disabled = true;

        const thinking = document.createElement("div");
        thinking.classList.add("bubble", "bubble-thinking");
        thinking.textContent = "Pensando...";
        chatDiv.appendChild(thinking);
        chatDiv.scrollTop = chatDiv.scrollHeight;

        try {
            const res = await fetch('http://localhost:11434/api/chat', {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({
                    model: selectedModel,
                    messages,
                    stream: false,
                })
            });

            if (!res.ok) {
                throw new Error("Error http en la solicitud");
            }

            const data = await res.json();
            const reply = data.message?.content ?? "(Sin respuesta)";

            messages.push({
              role: "assistant",
              content: reply
            });
        }
        catch(err) {
          console.error(err);
          messages.push({
              role: "assistant",
              content: "Error al conectar con Ollama"
          });
        }
        finally {
            thinking.remove();
            showChat();
            btnSend.disabled = false;
            txtPrompt.disabled = false;
        }
    });
})