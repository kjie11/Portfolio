const canHover = matchMedia('(hover: hover)').matches;

document.querySelectorAll('.detail-preview').forEach((video) => {
    if (!canHover) return;

    video.controls = false;
    video.addEventListener('pointerenter', () => video.controls = true);
    video.addEventListener('pointerleave', () => video.controls = false);
    video.addEventListener('focus', () => video.controls = true);
    video.addEventListener('blur', () => video.controls = false);
});
