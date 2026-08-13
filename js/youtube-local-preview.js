if (location.protocol === 'file:') {
    document.querySelectorAll('.video-container iframe[src*="youtube.com/embed/"]').forEach((iframe) => {
        const videoId = new URL(iframe.src).pathname.split('/').pop();
        const preview = document.createElement('a');

        preview.className = 'youtube-preview';
        preview.href = `https://www.youtube.com/watch?v=${videoId}`;
        preview.target = '_blank';
        preview.rel = 'noopener noreferrer';
        preview.setAttribute('aria-label', 'Watch this video on YouTube');
        preview.innerHTML = `<img src="https://i.ytimg.com/vi/${videoId}/hqdefault.jpg" alt=""><span aria-hidden="true">▶</span>`;
        iframe.replaceWith(preview);
    });
}
