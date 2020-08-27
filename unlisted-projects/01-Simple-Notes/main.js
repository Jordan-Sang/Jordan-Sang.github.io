const textarea = document.getElementsByTagName('textarea')[0];

if (window.localStorage.getItem('text')) {
    textarea.value = window.localStorage.getItem('text');
} else {
    window.localStorage.setItem('text', '');
}

window.addEventListener('beforeunload', () => {
    window.localStorage.removeItem('text');
    window.localStorage.setItem('text', textarea.value);
});