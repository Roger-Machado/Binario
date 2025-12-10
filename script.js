document.addEventListener("DOMContentLoaded", function () {
  const offerBox = document.querySelector(".offer-box");
  const timerText = offerBox.querySelector(".timer-text");

  if (timerText) {
    // 1. Criar o elemento do contador onde o tempo será exibido.
    const countdownElement = document.createElement("div");
    countdownElement.id = "countdown-timer";

    // Inserir o contador antes do texto da oferta limitada
    timerText.parentNode.insertBefore(countdownElement, timerText);

    // Define o tempo final da oferta (Exemplo: 2 horas a partir de agora)
    const durationInMinutes = 120; // 2 horas
    const endTime = new Date().getTime() + durationInMinutes * 60 * 1000;

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = endTime - now;

      if (distance < 0) {
        clearInterval(interval);
        countdownElement.innerHTML = "OFERTA EXPIRADA";
        timerText.innerHTML = "Que pena, você perdeu esta chance!";
        // Opcional: Desabilitar o botão de compra
        document.querySelector(".large-btn").style.pointerEvents = "none";
        document.querySelector(".large-btn").style.opacity = "0.5";
        return;
      }

      // Cálculos de tempo (Horas, Minutos, Segundos)
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Formatação (adiciona zero à esquerda se for menor que 10)
      const formatTime = (time) => String(time).padStart(2, "0");

      countdownElement.innerHTML = `
                <span class="timer-value">${formatTime(hours)}</span>h 
                <span class="timer-separator">:</span> 
                <span class="timer-value">${formatTime(minutes)}</span>m 
                <span class="timer-separator">:</span> 
                <span class="timer-value">${formatTime(seconds)}</span>s
            `;
    };

    // Inicia e atualiza o contador a cada segundo
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
  }
});
