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

const classException = document.body
const classExceptionList = ['error-body']
let hasClassException
for (i = 0; i < classException.classList.length; i++) {
    if (classException.classList[i].includes(classExceptionList)) {
        hasClassException = true
    }
}


const exceptionsList = ["ephy-about:overview", "www.reddit.com/", "app.element.io", "www.twitch.tv", "twitter.com", "geeksforgeeks.org"]
const noExceptionsList = ["www.phoronix.com"]
function isException(site) {return window.location.href.includes(site)}


    if ((brightness > 128 || brightness === 0) || noExceptionsList.find(isException) !== undefined) {
        if (hasClassException == undefined) {
            if (hasDarkAttribute == undefined) {
                if (exceptionsList.find(isException) === undefined) {
                    // emojis
                    document.querySelectorAll('p, span, gl-emoji').forEach((i)=>{
                        if ((/\p{Emoji}/u.test(i.innerText))) {
                            i.style.filter = 'invert(1) contrast(0.95) saturate(0.5) hue-rotate(180deg)'
                        }
                    })

                    html.style.filter = 'invert(1) hue-rotate(180deg)'
                    
                    // Select all elements with css background image
                    var tags = document.getElementsByTagName('*'),
                        el;

                    for (var i = 0, len = tags.length; i < len; i++) {
                        el = tags[i];
                        if (el.currentStyle) {
                            if( el.currentStyle['backgroundImage'] !== 'none' ) 
                                el.style = 'filter: invert(1) hue-rotate(180deg)'
                                console.log('é o if')
                        }
                        else if (window.getComputedStyle) {
                            if( document.defaultView.getComputedStyle(el, null).getPropertyValue('background-image') !== 'none' ) 
                                el.style = 'filter: invert(1) hue-rotate(180deg)'
                                console.log('é o else if')
                        }
                    }

                    const style = document.createElement('style');
                    document.head.appendChild(style);

                    // insert CSS Rule
                    style.sheet.insertRule(`
                        img, video, iframe, [role=img]:not(svg) {
                            filter: invert(1) hue-rotate(180deg) !important;
                        svg {
                            filter: invert(1) hue-rotate(180deg) !important;
                        }
                        [role=article] {
                            filter: invert(1) hue-rotate(180deg) !important;
                        } 
                        .navbar {
                            filter: invert(1) hue-rotate(180deg) !important;
                        }

                        // specifics websites
                            // w3 schools
                        w3-code {
                            filter: invert(1) hue-rotate(180deg);

                        }
                    `);

                }
            }
            }

    }
