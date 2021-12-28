

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
let musImgSize = canvas.width*0.8;

let recentlyPlayedSong = [];

for (let i = 0; i < songName.length; i++) {
    document.getElementById('my_music_name').innerHTML += `<div id=${i} class="songNamelist" >
                                                                <img id="listImg" src=${songsImg[i]} alt='*'> 
                                                                <div id='songnameArtist'>
                                                                    <h3>${songName[i]}</h3>
                                                                    <p>${songArtists[i]}</p>
                                                                </div>  
                                                                <div id=${i}after_play class='musicgif'>
                                                                    <img src="image/wave.gif" alt='*'>
                                                                </div>
                                                            </div>` 
}

function recent__play__song(num) {
    document.getElementById('all_music_recent').innerHTML = ``
     for (let i = 0; i < recentlyPlayedSong.length; i++) {
        document.getElementById('all_music_recent').innerHTML += `<div id=${i}recentPlay class="online_music_list class_music_recent" >
                                                                    <img  src=${songsImg[recentlyPlayedSong[i]]} alt='*'> 
                                                                    <h3>${songName[recentlyPlayedSong[i]].slice(0,17)}...</h3>
                                                                </div>` 
    }
}
for (let i = 0; i < songName.length; i++) {
    document.getElementById('all_music_top_hindi').innerHTML += `<div id=${i}topHindi class="online_music_list class_music_toph" >
                                                                <img  src=${songsImg[i]} alt='*'> 
                                                                <h3>${songName[i].slice(0,17)}...</h3>
                                                            </div>` 
}
for (let i = 0; i < songName.length; i++) {
    document.getElementById('all_music_top_bhojpuri').innerHTML += `<div id=${i}topBhojpuri class="online_music_list class_music_topb" >
                                                                <img  src=${songsImg[i]} alt='*'> 
                                                                <h3>${songName[i].slice(0,17)}...</h3>
                                                            </div>` 
}
for (let i = 0; i < songName.length; i++) {
    document.getElementById('all_music_top_english').innerHTML += `<div id=${i}topEnglish class="online_music_list class_music_tope" >
                                                                <img  src=${songsImg[i]} alt='*'> 
                                                                <h3>${songName[i].slice(0,17)}...</h3>
                                                            </div>` 
}
for (let i = 0; i < songName.length; i++) {
    document.getElementById('all_music_top_hits').innerHTML += `<div id=${i}topHits class="online_music_list class_music_top_hit" >
                                                                <img  src=${songsImg[i]} alt='*'> 
                                                                <h3>${songName[i].slice(0,17)}...</h3>
                                                            </div>` 
}
for (let i = 0; i < songName.length; i++) {
    document.getElementById('all_music__moreFU').innerHTML += `<div id=${i}moreFu class="online_music_list class_music_moreFU" >
                                                                <img  src=${songsImg[i]} alt='*'> 
                                                                <h3>${songName[i].slice(0,17)}...</h3>
                                                            </div>` 
}




document.getElementById('myMusic').addEventListener('click',()=>{
    document.getElementById('my_music_name').classList.toggle('my_music_name_after');
    document.getElementById('online_music').classList.remove('online__music');
    document.getElementById('more__songs').classList.remove('more_songs_btn_click')
   
     
})

document.getElementById('onlineBtn').addEventListener('click',()=>{
    document.getElementById('online_music').classList.toggle('online__music');
    document.getElementById('my_music_name').classList.remove('my_music_name_after');
     
})


function online_music_play(classname,id1,id2,classname2) {
    let n = document.getElementsByClassName(classname)
    for (let i = 0; i < n.length; i++) {
         document.getElementById(`${i+id1}`).addEventListener('click',()=>{
         document.getElementById(id2).classList.toggle(classname2);
            songChange(i)
            sn = i;
            aud_play_pause()
            
         })       
    }

}

online_music_play('songNamelist','','my_music_name','my_music_name_after')

online_music_play('class_music_toph','topHindi','online_music','online__music')

function songChange(index) {
    let m = document.getElementsByClassName('songNamelist')
    let x = index;
    audio1.src = songs[x]
    musImg.src = songsImg[x]
    document.getElementById('songName').innerHTML = `${songName[x]}`
    document.getElementById('singer').innerHTML = `${songArtists[x]}`
    audio1.load()
    recentlyPlayedSong.unshift(x)
    recent__play__song(x)
    for (let i = 0; i < m.length; i++) {     
        if (i === x) {
            document.getElementById(`${i}after_play`).style.display = 'block'
        }else{
            document.getElementById(`${i}after_play`).style.display = 'none'
        }
    }
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

