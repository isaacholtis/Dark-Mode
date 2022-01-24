let bgColor = window.getComputedStyle(document.body, null)
    .getPropertyValue('background-color').replace(/\s/g, '')
let rgbColor = bgColor.split("(")[1].split(")")[0]
rgbColor = rgbColor.split(",")

let numbertoHex = rgbColor.map((x) => {
    x = parseInt(x).toString(16)
    return (x.length==1) ? "0"+x : x
})
numbertoHex = "#"+numbertoHex.join("")

let nib = numbertoHex.split('')

let r = parseInt(nib[1]+nib[2],16)
let g = parseInt(nib[3]+nib[4],16)
let b = parseInt(nib[5]+nib[6],16)

let brightness = ( r * 299 + g * 587 + b * 114) / 1000
console.log(brightness)

const html = document.getElementsByTagName('html')[0]
const getAtributes = html.attributes
let hasDarkAttribute;
for (i = 0; i < getAtributes.length; i++) {
    if (getAtributes[i].nodeName.match('dark')
        || getAtributes[i].value.match('dark')) {
        hasDarkAttribute = true
    }
}
const exceptionsList = ["ephy-about:overview", "https://www.reddit.com/"]
let isException = window.location.href



if ((brightness > 128 || (brightness == 0 && hasDarkAttribute != true))
        && !exceptionsList.includes(isException)) {

    // emojis
    document.querySelectorAll('p, span, gl-emoji').forEach((i)=>{
        if ((/\p{Emoji}/u.test(i.innerText))) {
            i.style.filter = 'invert(1) contrast(0.95) saturate(0.5) hue-rotate(180deg)'
        }
    })

    html.style.filter = 'invert(1) hue-rotate(180deg)'

    const style = document.createElement('style');
    document.head.appendChild(style);

    // insert CSS Rule
    style.sheet.insertRule(`
        img, video, iframe, [role=img]:not(svg), figure {
            filter: invert(1) hue-rotate(180deg);
        picture {
            filter: invert(1) hue-rotate(180deg);
        }
        svg {
            filter: invert(1) hue-rotate(180deg);
        }
        .error-body {
            filter: invert(1) hue-rotate(180deg);
        }
    `);

}
