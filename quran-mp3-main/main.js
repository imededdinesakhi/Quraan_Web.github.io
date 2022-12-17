let sheekh = document.querySelector('#list');
let surah = document.querySelector('#surah');
let player = document.querySelector('#player');

const Reciters = async () =>{
    sheekh.innerHTML = ` 
    <div class="text-center">
    <span class='spinner-border'></span>
    </div>`;
    surah.innerHTML = ` 
    <div class="text-center">
    <span class='spinner-border'></span>
    </div>`;
    player.innerHTML = ` 
    <div class="text-center">
    <span class='spinner-border'></span>
    </div>`;
    const res = await fetch('https://mp3quran.net/api/_arabic.php');
    const data = await res.json();
    recitersSurah(data.reciters);
}
Reciters();
function recitersSurah(data){
   sheekh.innerHTML = '';
   data.forEach(element => {
    let listSheekh = `
    <ul class="list-group-item bg-transparent border-0 text-light py-0 d-flex curser">
                <i class="bi bi-person-circle  me-2 fs-6"></i>
                <span class="fs-6" >${element.name}</span>
                <span class="d-none">${element.Server}</span>
        </ul>
        <hr/>
    `;
    sheekh.innerHTML += listSheekh;
});
DataSurah()
   
}
const DataSurah = async () =>{
    const res = await fetch('https://api.quran.com/api/v4/chapters');
    const data = await res.json();  
    DataListSurah(data.chapters);
}

function DataListSurah(data){
    surah.innerHTML = '';
    data.forEach(element => {
        let SurahListHome = `
        <ul class="list-group-item bg-transparent border-0 text-light py-0 d-flex justify-content-between curser fs-5">
        <span>${element.id}.</span>
        <span class='arabic'>${element.name_arabic}</span>
        <span class="d-none">${element.name_complex}</span>
        <span class="d-none">${element.revelation_place}</span>
        <span class="d-none">${element.id}</span>
        </ul>
    <hr /> 
        `;
        surah.innerHTML += SurahListHome;
    });
}

sheekh.addEventListener('click',(e) =>{
    if(e.target.classList == 'fs-6'){
       let url = e.target.parentElement.children[2].innerText;
       let name = e.target.parentElement.children[1].innerText;

      surah.addEventListener('click',(s) =>{
          if(s.target.classList == 'arabic'){
            let id = s.target.parentElement.children[4].innerText;
            let english = s.target.parentElement.children[2].innerText;
            let arabic = s.target.parentElement.children[1].innerText;
            let revelation_place = s.target.parentElement.children[3].innerText;
           Paly(name,arabic,english,revelation_place,id,url)
          }
      })
    }
})

function Paly(name,arabic,english,revelation_place,id,url){
    let nub = '';
    if(id > 9){
        if(id > 100){
            nub = `/${id}`;
        }else{
            nub = `/0${id}`;
        }
    }else{
        nub = `/00${id}`;
    }
    let audio = `${url}${nub}.mp3`;
    let PlayHome = `
    <div >
    <ul class="list-group-item bg-transparent border-0 text-light py-0 d-flex justify-content-between curser py-1">
        <span class='fs-6 mt-1'>القارئ:</span>
        <span class='fs-6 mt-1'>${name}</span>
    </ul>
    <hr /> 
</div>
<div> 
    <ul class="list-group-item bg-transparent border-0 text-light py-0 d-flex justify-content-between curser py-1">
        <span class='fs-6 mt-1'>السورة:</span>
        <span class='fs-6 mt-1'>${arabic}</span>
    </ul>
    <hr /> 
</div>


    <div>
        <audio controls autoplay> <source src="${audio}" type="audio/mpeg"></audio>           
    </div>
</div>
    `;
    player.innerHTML = PlayHome;
}