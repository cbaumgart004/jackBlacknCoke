document.addEventListener('DOMContentLoaded', () => {
    const card = document.getElementById('card');
    
    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
    });
});