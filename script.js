
let dd //暫存抽到的數量;
let num
let firstTimeGamer = 1 //新手教學的開關
let timeForGiftCount = 3 //紀錄抽獎點數
let costPoint = 0 //玩家的點數

//=================================
//     主要系統渲染
//=================================

function renderSys(){
  const textlist = [`點數：${costPoint}`,,`抽獎次數：${timeForGiftCount}`]
  for(i=0;i<3;i++){
    if(i != 1){
      timeForGift[i].textContent = textlist[i]
    }
    
  }
  
  
}



// ======================
//        抽獎系統 
// ======================

const card = document.querySelector('.card');
const timeForGift = Array.from(document.querySelectorAll('.timeforgift>ul>li'))


card.addEventListener('click',()=>{
    //=========  抽獎的主要系統  ===================

    if(firstTimeGamer == 1){
      //新手教學
      window.alert('您可以選擇你要添加的物品')
      firstTimeGamer = 0
    }

    if(timeForGiftCount < 0){
      //避免點數不足的預判
      timeForGiftCount = 0 //強迫最低是0點
      renderSys()
      window.alert('點數不足')
      return 0
      }

    timeForGiftCount -= 1 // 扣1點
    renderSys()
    
    
    sale()
    
    //將抽到的整數顯示到前端
    dd = Math.floor(Math.random()*100)
    card.textContent = dd
    
    
});

//======================
//      物品欄系統
//======================
let stuff = [{id:1,name:'apple',url:'./images/apple.png',count:1},{id:2,name:'milk',url:'./images/milk.jpg',count:0}]
let collect = Array.from(document.querySelectorAll('.collect>ul>li'))


//  顯示物品欄的物品和數量

function renderCollect(){
  //更新物品欄畫面
  for(i=0;i<collect.length;i++){
    if(stuff[i] == null){
      break
    } else{
      collect[i].innerHTML = `<img src='${stuff[i].url}'><span>${stuff[i].count}`
    }
  }}
renderCollect()

// 點擊物品
collect.forEach((item)=>{
    item.addEventListener('click', function(){
    let index = collect.indexOf(item)
    if(firstTimeGamer == 1){
      window.alert('請先抽獎')
    } else {
      stuff[index].count += dd
      collect[index].innerHTML = `<img src='${stuff[index].url}'><span>${stuff[index].count}`
      dd = 0 //Clean up
      card.textContent = "?"
    }
  })
})


//====================
//====  顧客系統  =====
//====================

const customer = ['小明','大華','花花'] //客人的資料
const saleChatting = document.querySelector('.customer')
let saleTargets = [] //點餐的資料庫


// ======= 隨機顧客與隨機數量========

function sale() {
    
    if(firstTimeGamer == 1) {
      return
    }else {
      let n1,n2
      n1 = Math.floor(Math.random()*10)
      n2 = Math.floor(Math.random()*customer.length)
      
      saleTargets.push({'count':n1,'text':`${customer[n2]}需要蘋果牛奶${n1}個`})
      }
    
    renderCustomer()
  }

//===============
//    解任務
//===============
//1.蘋果和牛奶比例1:1
//2.比對原料有沒有充足
//2.1 充足就蘋果牛奶換點數 1:0.5
//2.2 不充足就看缺什麼



function sell(countForCustomer,whoCustomer){
  // 賣蘋果牛奶的檢驗
  
  if(stuff[0].count < countForCustomer){
    return alert(`${stuff[0].name}不足`)
  }
  if(stuff[1].count < countForCustomer){
    return alert(`${stuff[1].name}不足`)
  }
  
  stuff[0].count -= countForCustomer
  stuff[1].count -= countForCustomer
  saleTargets.splice(whoCustomer,1)
  earn(countForCustomer)
  renderCollect()
  renderCustomer()
}




//監聽點了哪一個任務
let custeromInPage = document.querySelector('.customer')


custeromInPage.addEventListener('click',(e)=>{
    let onePerson =  e.target.closest('.item-C')
    let customerList = Array.from(custeromInPage.querySelectorAll('.item-C'))
    let index = customerList.indexOf(onePerson)
    sell(saleTargets[index].count,index)
    })

//==============================
//        點數與轉換系統 
//       任務報酬比 1:0.5
//==============================
function earn(k){
  //賺取點數
  let cost = k * 0.5
  costPoint += cost
  timeForGift[0].textContent = `點數：${costPoint}`
  arrowRender()
}


timeForGift[1].addEventListener('click',()=>{
  //點數換抽獎次數
  let k = Math.floor(costPoint *0.8)
  timeForGiftCount += k
  costPoint -= k
  renderSys()
  arrowRender()
  })



function arrowRender(){
  //符合條件就顯示箭頭
  let list = document.querySelectorAll('.timeforgift li')
  
  if(costPoint < costPoint*0.8){
    list[1].classList.add('non-display')
  }
  list[1].classList.remove('non-display')
}





//====================================================
//  客人的畫面更新
//====================================================
function renderCustomer(){
  saleChatting.innerHTML = ""
  if(saleTargets.length == 0){
    saleChatting.innerHTML = '<span>目前沒客人'
  } else {
    
    saleTargets.forEach((saleTarget,index)=>{
      saleChatting.innerHTML += `<li class="item-C">${saleTargets[saleTargets.indexOf(saleTarget)].text}</li>`
    })

    custeromInPage = document.querySelector('.customer')
    
  }
}
sale()
renderCustomer()

