// Бесконечно пролистываемая галерея

let galleries = document.getElementsByClassName("scrollable gallery");
const scrollSpeed = 75;
const deltaTimeMs = 15;
const deltaTime = deltaTimeMs / 1000;

window.addEventListener("load", initializeScroll);

function initializeScroll()
{
    for (let gallery of galleries)
    {
        let elements = Array.from(gallery.children);
        for (let element of elements)
        {
            let copy = element.cloneNode(true);
            gallery.appendChild(copy);
        }
        gallery.scrollLeft = gallery.scrollWidth / 2;
        gallery.addEventListener("scroll", loopScroll);
    }
    setInterval(autoScroll, deltaTimeMs)
}

function loopScroll()
{
    let gap = parseInt(this.style.getPropertyValue("gap"));
    if (isNaN(gap)) gap = 0;
    let width = this.scrollWidth + gap;
    let height = this.scrollHeight + gap;
    if (this.scrollLeft < width / 4)
    {
        this.scrollLeft += width / 2;
    }
    if (this.scrollLeft > width * 3 / 4)
    {
        this.scrollLeft -= width / 2;
    }
    if (this.scrollTop < height / 4)
    {
        this.scrollTop += height / 2;
    }
    if (this.scrollTop > height * 3 / 4)
    {
        this.scrollTop -= height / 2;
    }
}

function autoScroll()
{
    for (let gallery of galleries)
    {
        gallery.scrollLeft += scrollSpeed * deltaTime;
        gallery.scrollTop += scrollSpeed * deltaTime;
        // loopScroll.call(gallery);
    }
}