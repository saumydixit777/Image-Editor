let filters={
    brightness:{
        value:100,
        min:0,
        max:200,
        unit:"%",
    },
    contrast:{
        value:100,
        min:0,
        max:200,
        unit:"%",
    },
    saturation:{
        value:100,
        min:0,
        max:200,
        unit:"%",
    },
    hueRotation:{
        value:0,
        min:0,
        max:360,
        unit:"deg",
    },
    blur:{
        value:0,
        min:0,
        max:20,
        unit:"px",
    },
    grayscale:{
        value:0,
        min:0,
        max:100,
        unit:"%",
    },
    sepia:{
        value:0,
        min:0,
        max:100,
        unit:"%",
    },
    opacity:{
        value:100,
        min:0,
        max:100,
        unit:"%",
    },
    invert:{
        value:0,
        min:0,
        max:100,
        unit:"%",
    },
}

const imageCanvas=document.querySelector("#image-canvas");
const imgInput=document.querySelector("#image-input");
const canvasCtx=imageCanvas.getContext("2d");
const resetBtn=document.querySelector("#reset-btn");
const downloadBtn=document.querySelector("#download-btn");
const presetContainer=document.querySelector(".presets");

let file=null;
let image=null;

const filtersContainer=document.querySelector(".filters");

function createFilterElement(name,unit="%",value,min,max){

    const div=document.createElement("div");
    div.classList.add("filter");

    const input=document.createElement("input");
    input.type="range";
    input.value=value;
    input.min=min;
    input.max=max;
    input.id=name;

    const p=document.createElement("p");
    p.innerText=name;

    div.appendChild(input);
    div.appendChild(p);

    input.addEventListener("input",(event)=>{
        filters[name].value=event.target.value;
        applyFilters();
    })

    return div;
}

Object.keys(filters).forEach(key=>{
    const filterElement=createFilterElement(
        key,
        filters[key].unit,
        filters[key].value,
        filters[key].min,
        filters[key].max
    );

    filtersContainer.appendChild(filterElement);
})

imgInput.addEventListener("change",(event)=>{

    file=event.target.files[0];

    const imagePlaceholder=document.querySelector(".placeholder");

    imageCanvas.style.display="block";

    if(imagePlaceholder) imagePlaceholder.style.display="none";

    image=new Image();
    image.src=URL.createObjectURL(file);

    image.onload=()=>{
        imageCanvas.width=image.width;
        imageCanvas.height=image.height;
        canvasCtx.drawImage(image,0,0);
    }

})

function applyFilters(){

    if(!image) return;

    canvasCtx.clearRect(0,0,imageCanvas.width,imageCanvas.height);

    canvasCtx.filter=`
    brightness(${filters.brightness.value}${filters.brightness.unit})
    contrast(${filters.contrast.value}${filters.contrast.unit})
    saturate(${filters.saturation.value}${filters.saturation.unit})
    hue-rotate(${filters.hueRotation.value}${filters.hueRotation.unit})
    blur(${filters.blur.value}${filters.blur.unit})
    grayscale(${filters.grayscale.value}${filters.grayscale.unit})
    sepia(${filters.sepia.value}${filters.sepia.unit})
    opacity(${filters.opacity.value}${filters.opacity.unit})
    invert(${filters.invert.value}${filters.invert.unit})
    `;

    canvasCtx.drawImage(image,0,0);
}

resetBtn.addEventListener("click",()=>{

    filters={
        brightness:{value:100,min:0,max:200,unit:"%"},
        contrast:{value:100,min:0,max:200,unit:"%"},
        saturation:{value:100,min:0,max:200,unit:"%"},
        hueRotation:{value:0,min:0,max:360,unit:"deg"},
        blur:{value:0,min:0,max:20,unit:"px"},
        grayscale:{value:0,min:0,max:100,unit:"%"},
        sepia:{value:0,min:0,max:100,unit:"%"},
        opacity:{value:100,min:0,max:100,unit:"%"},
        invert:{value:0,min:0,max:100,unit:"%"},
    }

    Object.keys(filters).forEach(key=>{
        const slider=document.getElementById(key);
        if(slider){
            slider.value=filters[key].value;
        }
    })

    applyFilters();
})

downloadBtn.addEventListener("click",()=>{
    if(!image) return;

    const link=document.createElement("a");
    link.download="edited-image.png";
    link.href=imageCanvas.toDataURL();
    link.click();
})

const presets={
    normal:{
        brightness:100,
        contrast:100,
        saturation:100,
        hueRotation:0,
        blur:0,
        grayscale:0,
        sepia:0,
        opacity:100,
        invert:0
    },

    vintage:{
        brightness:110,
        contrast:120,
        saturation:90,
        hueRotation:10,
        blur:0,
        grayscale:10,
        sepia:40,
        opacity:100,
        invert:0
    },

    cool:{
        brightness:100,
        contrast:110,
        saturation:120,
        hueRotation:180,
        blur:0,
        grayscale:0,
        sepia:0,
        opacity:100,
        invert:0
    },

    dramatic:{
        brightness:90,
        contrast:150,
        saturation:120,
        hueRotation:0,
        blur:0,
        grayscale:0,
        sepia:0,
        opacity:100,
        invert:0
    },

    bw:{
        brightness:100,
        contrast:120,
        saturation:0,
        hueRotation:0,
        blur:0,
        grayscale:100,
        sepia:0,
        opacity:100,
        invert:0
    },

    warm:{
        brightness:105,
        contrast:110,
        saturation:130,
        hueRotation:20,
        blur:0,
        grayscale:0,
        sepia:20,
        opacity:100,
        invert:0
    },

    cold:{
        brightness:95,
        contrast:105,
        saturation:110,
        hueRotation:200,
        blur:0,
        grayscale:0,
        sepia:0,
        opacity:100,
        invert:0
    },

    faded:{
        brightness:110,
        contrast:80,
        saturation:80,
        hueRotation:0,
        blur:0,
        grayscale:20,
        sepia:20,
        opacity:100,
        invert:0
    },

    cinematic:{
        brightness:95,
        contrast:140,
        saturation:120,
        hueRotation:340,
        blur:0,
        grayscale:0,
        sepia:10,
        opacity:100,
        invert:0
    },

    neon:{
        brightness:110,
        contrast:160,
        saturation:180,
        hueRotation:260,
        blur:0,
        grayscale:0,
        sepia:0,
        opacity:100,
        invert:0
    },

    soft:{
        brightness:110,
        contrast:90,
        saturation:105,
        hueRotation:0,
        blur:2,
        grayscale:0,
        sepia:10,
        opacity:100,
        invert:0
    },

    negative:{
        brightness:100,
        contrast:100,
        saturation:100,
        hueRotation:0,
        blur:0,
        grayscale:0,
        sepia:0,
        opacity:100,
        invert:100
    }
}
Object.keys(presets).forEach(key=>{

    const presetBtn=document.createElement("button");
    presetBtn.classList.add("preset-btn","btn");
    presetBtn.innerText=key;

    presetContainer.appendChild(presetBtn);

    presetBtn.addEventListener("click",()=>{

        const preset=presets[key];

        Object.keys(preset).forEach(filterKey=>{

            filters[filterKey].value=preset[filterKey];

            const slider=document.getElementById(filterKey);

            if(slider){
                slider.value=preset[filterKey];
            }

        });

        applyFilters();

    });

});