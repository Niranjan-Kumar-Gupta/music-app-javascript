

const file = document.getElementById('fileupload');
const audioContext = new AudioContext();
const container = document.getElementById('container');
const canvas = document.getElementById('canvas1');
const slider = document.getElementById('slide');

const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


let audioSource;
let analyser;
let pop = false

let songs = ['songs/teri.mp3','songs/meri.mp3','songs/dil.mp3','songs/hbd.mp3','songs/hbd1.mp3','songs/teri.mp3']
let songsImg = ['image/teri.jpg','image/meri.jpg','image/dil.jpg','image/bdy.jfif','image/bdy1.jfif','image/teri.jpg']
let songArtists = ['dhanesh','Jubin Nautiyal','Jubin Nautiyal','unkown','unkown','dhanesh']
let songName = ['teri ankho me','Meri Zindagi Hai Tu','Dil Galti Kar Baitha Hai','happy bdy to u','happy bdy to u','teri ankho']
let audio1 = new Audio();
let sn=0;

let musImg = new Image()
let musImgSize = canvas.width*0.8

function songChange(index) {
    let x = index;
    audio1.src = songs[x]
    musImg.src = songsImg[x]
    document.getElementById('songName').innerHTML = `${songName[x]}`
    document.getElementById('singer').innerHTML = `${songArtists[x]}`
    audio1.load()
}
songChange(0)

document.getElementById('next').addEventListener('click',()=>{
   

    if (songs.length-1 === sn) {
        sn = 0;
    }
    else if (sn<songs.length-1) {
        let x = ++sn
        songChange(x)
        aud_play_pause()
    }
   
})

document.getElementById('back').addEventListener('click',()=>{
    if (sn>0) {
        let y = --sn
        songChange(y)
        aud_play_pause()
    }
   
})



window.addEventListener('resize',()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    musImgSize = canvas.width*0.8
})



function aud_play_pause()  {  
    let curMin = 0;
    let curSec;
   
  
    
    if (audio1.paused) {
        document.getElementById('playPause').src = 'image/pause1.png';
        audio1.play()
        
    } else {
        audio1.pause()
        document.getElementById('playPause').src = 'image/play1.png';
       
    }
   

    let numberOfHeart = 50;
    let barHeight;
    let x;
    let theta=0;
    
        let sliderChange = false;
        audioSource = audioContext.createMediaElementSource(audio1);
        analyser = audioContext.createAnalyser();
        audioSource.connect(analyser);
        analyser.connect(audioContext.destination);
        analyser.fftSize = 512; 
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        const barWidth = canvas.width/bufferLength;
       
        function animate() { 
            x=0;
            ctx.clearRect(0,0,canvas.width,canvas.height);
            ctx.drawImage(musImg,canvas.width/2-musImgSize/2,canvas.height/2-musImgSize*1.5/2,musImgSize,musImgSize*1.2)
            ctx.fillStyle = `rgba(0,0,0,0.1)`;
            ctx.fillRect(canvas.width/2-musImgSize/2,canvas.height/2-musImgSize*1.5/2,musImgSize,musImgSize*1.2);
            Heart()
           
            analyser.getByteFrequencyData(dataArray)
            for (let i = 0; i < bufferLength; i++) {
                barHeight = dataArray[i];
                ctx.save();
                ctx.translate(canvas.width/2,canvas.height/2.2);
                ctx.rotate(i+Math.PI*2/bufferLength)
                ctx.beginPath();
                ctx.fillStyle = `hsl(${barHeight},100%,50%)`;
                ctx.fillRect(0,0,barWidth,barHeight*0.8);
                x += barWidth*1.2;
                ctx.restore();
    
                ctx.beginPath();
                ctx.fillStyle = `hsl(${barHeight},50%,50%)`;
                ctx.fillRect(x,0,barWidth,barHeight*0.4);
               // ctx.arc(x+barWidth/2,canvas.height - barHeight-barWidth/2,barWidth,0,Math.PI*2)
                ctx.fill();
                ctx.closePath();
              
            }
            theta += 0.5;
            numberOfHeart = dataArray[165]
         
            slider.max = audio1.duration
           
            curSec = Math.round((audio1.currentTime))%60
            curMin = Math.round(((audio1.currentTime-30)/60))
            slider.addEventListener('mousedown',()=>{
                sliderChange = true
            })
            if (!sliderChange) {
                slider.value = audio1.currentTime;
            }else{
                slider.addEventListener('mouseup',()=>{
                    audio1.currentTime = slider.value
                    sliderChange = false
                })
            }
            
            if (audio1.ended) {
                console.log('end')
                x = ++sn
                songChange(x)
                audio1.play()
            }
            document.getElementById('currentTime').innerHTML = `${curMin}.${curSec}`;
            document.getElementById('totalTime').innerHTML = `${Math.round((audio1.duration/60)*100)/100} `;
            requestAnimationFrame(animate)
    
          
        }
        animate()
    
    
   
   
    function Heart() {
       
       for (let i = 0; i < numberOfHeart; i++) {
        ctx.fillStyle = 'rgba(255,255,255,0.8)';
        ctx.strokeStyle =  'rgba(34,147,214,1)';
        let size = 10;

        ctx.beginPath(); 
        ctx.save();
        ctx.translate(canvas.width/2,canvas.height/2.2);
        ctx.rotate((i+Math.PI*2/numberOfHeart)*0.5+theta)
        let xx =i;
        let y = i*2;
        ctx.arc(xx,y,size,0,Math.PI*2);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath(); 
        ctx.arc(xx-3,y-3,size/2.5,0,Math.PI*2);
        ctx.arc(xx+7,y-1,size/3.5,0,Math.PI*2);
        ctx.closePath();
        ctx.fill(); 
        ctx.restore();
           
       }
    }

}

