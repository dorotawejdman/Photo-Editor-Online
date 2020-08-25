const canvas = document.getElementById('canvas')
const canvas1 = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
const ctx1 = canvas1.getContext('2d')

const reader = new FileReader();
const img = new Image();
const max_width = 500;
const uploadImage = (e) => {
    reader.onload = () => {
        img.onload = () =>{
            console.log(canvas.width)
            if (img.width>max_width){
                
                canvas.width = max_width//img.width/5;
                canvas.height = max_width*img.height/img.width;
            }
            else{
                canvas.width = img.width;
                canvas.height = img.height;
            }
            canvas1.height = canvas.height;
            canvas1.width = canvas.width;
            ctx.drawImage(img,0,0,canvas.width,canvas.height)
            ctx1.drawImage(img,0,0,canvas1.width,canvas1.height)
        }
        img.src = reader.result;
    }
    reader.readAsDataURL(e.target.files[0])
    console.log(reader)
}


const imageLoader = document.getElementById('uploader')

imageLoader.addEventListener('change',uploadImage)

const greyscale = () => {
    const imageData = ctx.getImageData(0,0,canvas.width,canvas.height)
    const data = imageData.data

    for(let i=0; i<data.length; i+=4 ){
        const grey = data[i]*0.21 + data[i+1]*0.71 + data[i+2]*0.07;
        data[i] = grey;
        data[i+1] = grey;
        data[i+2] = grey;
    }

    ctx.putImageData(imageData,0,0);
}

const sepia = () => {
    const imageData = ctx.getImageData(0,0,canvas.width,canvas.height)
    const data = imageData.data

    for(let i=0; i<data.length; i+=4 ){
        const grey = data[i]*0.21 + data[i+1]*0.71 + data[i+2]*0.07;
        data[i] = grey + 95;
        data[i+1] = grey + 58 ;
        data[i+2] = grey;
    }

    ctx.putImageData(imageData,0,0);
}

const invert = () => {
    const imageData = ctx.getImageData(0,0,canvas.width,canvas.height)
    const data = imageData.data

    for(let i=0; i<data.length; i+=4 ){
        
        data[i] = 255 - data[i]
        data[i+1] = 255 - data[i+1]
        data[i+2] = 255 - data[i+1]
    }

    ctx.putImageData(imageData,0,0);
}

const rgb2bgr = () => {
    const imageData = ctx.getImageData(0,0,canvas.width,canvas.height)
    const data = imageData.data

    for(let i=0; i<data.length; i+=4 ){
        const r = data[i];
        data[i] = data[i+2] ;
        data[i+2] = r;
    }

    ctx.putImageData(imageData,0,0);
}

const binary = () => {
    const imageData = ctx.getImageData(0,0,canvas.width,canvas.height)
    const data = imageData.data

    for(let i=0; i<data.length; i+=4 ){
        const grey = data[i]*0.21 + data[i+1]*0.71 + data[i+2]*0.07;
        if(grey>125){
            data[i]=data[i+1]=data[i+2]=255
        }
        else{
            data[i]=data[i+1]=data[i+2]=0
        }
    }

    ctx.putImageData(imageData,0,0);
}

const clear = () => {
    img.src = reader.result;
}

document.querySelectorAll('button')[0].addEventListener('click',greyscale);
document.querySelectorAll('button')[1].addEventListener('click',sepia);
document.querySelectorAll('button')[2].addEventListener('click',invert);
document.querySelectorAll('button')[3].addEventListener('click',rgb2bgr);
document.querySelectorAll('button')[4].addEventListener('click',binary);
document.querySelectorAll('button')[5].addEventListener('click',clear);




















// ctx.fillText("canvas text",100,150)
// //ctx.strokeRect(0,0,canvas.width, canvas.height)
// ctx.fillStyle = '#eeeddd'
// ctx.fillRect(0,0,50,50)
// ctx.fillStyle = 'red'
// ctx.beginPath();
// ctx.moveTo(canvas.width/2,canvas.height/2);
// ctx.lineTo(250,50);
// ctx.lineTo(250,100)
// ctx.closePath();
// ctx.fill();
