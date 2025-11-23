var body = document.body
window.addEventListener('scroll', e => {
    var totalH = document.documentElement.scrollHeight - window.innerHeight;
    var scrolled = window.scrollY;
    var per = scrolled / totalH;
    document.getElementById('scrollBar').style.width = `${per * 100}%`
    
});
