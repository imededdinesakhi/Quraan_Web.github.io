//explore button
let exploreBtn = document.querySelector('.title .btn'),
    HadithSection = document.querySelector('.hadith');
    exploreBtn.addEventListener('click',()=>{
        HadithSection.scrollIntoView({
            behavior:"smooth"
        })
    })

// nav fixed
let fixedNav = document.querySelector('.header'),
 scrollBtn = document.querySelector('.scrollBtn');
window.addEventListener("scroll",()=>{
    window.scrollY > 100 ? fixedNav.classList.add('active') : fixedNav.classList.remove('active');
   
   
   window.scrollY > 500 ? scrollBtn.classList.add('active') :  scrollBtn.classList.remove('active');
    
        

 
    
})
scrollBtn.addEventListener('click',()=>{
    window.scrollTo({
        top:0,
        behavior:"smooth"
    })
})


//fetch hadith 

let hadithContainer = document.querySelector('.hadithContainer'),
    next = document.querySelector('.buttons .next'),
    prev = document.querySelector('.buttons .prev'),
    number = document.querySelector('.buttons .number');
    let hadithIndex = 0;
    /*
    HadithCharger();
    function HadithCharger()
    {
        fetch("https://hadis-api-id.vercel.app/hadith/abu-dawud?page=1&limit=20")
        .then(response => response.json())
        .then(data =>{
        console.log(data);
           
            let Hadiths = data.data.data;
            changeHadith();
            next.addEventListener('click',()=>{
                hadithIndex == 19 ? hadithIndex = 0 : hadithIndex++;
                changeHadith()
            })

            prev.addEventListener('click',()=>{
                hadithIndex == 0 ? hadithIndex = 19 : hadithIndex--;
                changeHadith()

            })

            function changeHadith()
            {
                 hadithContainer.innerText = Hadiths[hadithIndex].arab;
                 number.innerText = `20  - ${hadithIndex + 1}`
            }
           
        })
    }


/*

const api ="https://api.hadith.sutanlab.id/books/muslim?range=1-150"
async function getData(){
    const response = await fetch(api)
    const data = await response.json();
    console.log(data)
}
getData()
*/

async function getData() {
    const fetchAPI = fetch(`https://hadis-api-id.vercel.app/hadith/abu-dawud?page=1&limit=20`);
    const response = await fetchAPI;
    const data = await response.json();
let Hadiths = data.items;

changeHadith();
next.addEventListener('click',()=>{
    hadithIndex == 19 ? hadithIndex = 0 : hadithIndex++;
    changeHadith()
})

prev.addEventListener('click',()=>{
    hadithIndex == 0 ? hadithIndex = 19 : hadithIndex--;
    changeHadith()

})

function changeHadith()
{
     hadithContainer.innerText = Hadiths[hadithIndex].arab;
     number.innerText = `20  - ${hadithIndex + 1}`
}
  hadithContainer.innerText = Hadiths[hadithIndex].arab;

  }
 
  getData();
//fetch Api Quran  

let surahsContainer = document.querySelector('.surahsContainer')
getSurahs();
function getSurahs()
{
    fetch("http://api.alquran.cloud/v1/meta")
    .then(response => response.json())
    .then(data=>{
        let surahs = data.data.surahs.references;
        let numberOfSurahs = 114;
        surahsContainer.innerHTML ="";
        for (let i =0; i <numberOfSurahs; i++){
            surahsContainer.innerHTML +=
        ` 
           <div class="surah">
               <p> ${surahs[i].name}</p>
               <p>${surahs[i].englishName}</p>
           </div>
   
            
            
        `

        }
        
        let SurahsTitels = document.querySelectorAll('.surah');
        let popup = document.querySelector('.surah-popup'),
          AyatContainer = document.querySelector('.ayat');
            SurahsTitels.forEach((title,index) =>{
           title.addEventListener('click',()=>{
               fetch(`http://api.alquran.cloud/v1/surah/${index + 1 }`)
               .then(response => response.json())
               .then(data=>{
                
               AyatContainer.innerHTML ="";
               let ayat = data.data.ayahs;
               ayat.forEach(aya=>{
                   popup.classList.add('active');
                   
             AyatContainer.innerHTML +=
                    `
                   <p>(${aya.numberInSurah}) - ${aya.text}</p>
                   
                   
                    `

               })
                
               })


             })
           
           
            })
        
          let closePopup = document.querySelector('.close-popup');
          closePopup.addEventListener('click',()=>{
            popup.classList.remove('active');
          })
    })
}
 


//link section 
let sections = document.querySelectorAll("section"),
    links = document.querySelectorAll('.header ul li');

    links.forEach(link=>{
        link.addEventListener('click',()=>{
        document.querySelector('.header ul li.active').classList.remove('active');
        link.classList.add('active');
        let target =link.dataset.filter;
        sections.forEach(section=>{
            if(section.classList.contains(target))
            {

                section.scrollIntoView({
                    behavior:"smooth"
                })
            }
        })

        })
    })
// active sidebar 
let bars = document.querySelector('.bars'),
    SideBar = document.querySelector('.header ul');
    bars.addEventListener('click', ()=>{
        SideBar.classList.toggle("active");
    })