document.addEventListener('DOMContentLoaded', () => {
  const player1Section = document.getElementById('player1-section');
  const player2Section = document.getElementById('player2-section');
  const nextButton = document.getElementById('next-button');
  const backButton = document.getElementById('back-button');

  nextButton.addEventListener('click', () => {
    const player1Name = document.getElementById('player1-name').value.trim();
    const player1NPM = document.getElementById('player1-npm').value.trim();

    if (player1Name === '' || player1NPM === '') {
      alert('Harap isi semua data Player 1.');
      return;
    }

    if (isNaN(player1NPM)) {
      alert('NPM harus berupa angka.');
      return;
    }

    player1Section.classList.add('hidden');
    player2Section.classList.remove('hidden');
  });

  backButton.addEventListener('click', () => {
    player2Section.classList.add('hidden');
    player1Section.classList.remove('hidden');
  });
});
