// Rolling-title typing/deleting animation under the hero name.
export function initTypingAnimation(typingTextEl) {
    const titles = [
        'JavaScript',
        'HTML & CSS',
        'Front-end Development',
        'Back-end Development',
        'Telegram Bot Development',
        'Telegram Mini Apps',
        'Responsive Web Design',
        'UI Design',
        'Graphic Design',
        'Thumbnail Design',
        'Photo Editing',
        'Open Source',
    ];

    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingPause = 1800;
    const typingSpeed = 65;
    const deletingSpeed = 30;

    function typeAnimation() {
        const currentTitle = titles[titleIndex];

        if (isDeleting) {
            charIndex--;
            typingTextEl.textContent = currentTitle.substring(0, charIndex);

            if (charIndex <= 0) {
                isDeleting = false;
                titleIndex = (titleIndex + 1) % titles.length;
                setTimeout(typeAnimation, 250);
                return;
            }

            setTimeout(typeAnimation, deletingSpeed);
            return;
        }

        charIndex++;
        typingTextEl.textContent = currentTitle.substring(0, charIndex);

        if (charIndex >= currentTitle.length) {
            isDeleting = true;
            setTimeout(typeAnimation, typingPause);
            return;
        }

        const speed = typingSpeed + Math.random() * 35;
        setTimeout(typeAnimation, speed);
    }

    setTimeout(typeAnimation, 400);
}
