
let dd //抽到的數量;
let num;

const card = document.querySelector('.card');

function getNewNum(rra){
  //抽一個整數，記錄到陣列
  rra = Math.floor(Math.random()*100)
  dd = rra
  
  return rra
};

function inputNum(nid){
  //將抽到的整數顯示到前端
  nid.textContent=getNewNum()

}


// ======================
//        點擊抽獎 
// ======================
let firstTimeGamer = 1 //新手教學的開關
let timeForGiftCount = 3 //紀錄抽獎點數
const timeForGift = document.querySelector('.timeforgift')


card.addEventListener('click',()=>{
    timeForGiftCount -= 1 // 扣1點
    timeForGift.innerHTML = `<span> 你目前的抽獎次數：${timeForGiftCount}`
    if(timeForGiftCount < 0){
      timeForGiftCount = 0 //強迫最低是0點
      timeForGift.innerHTML = `<span> 你目前的抽獎次數：${timeForGiftCount}`
      window.alert('點數不足')
      return 0
    }else{
      sale()
      if(firstTimeGamer == 1){
        window.alert('您可以選擇你要添加的物品')
        firstTimeGamer = 0
      }
      
      getNewNum();
      inputNum(card)
    }
    
});

//======================
//      物品欄系統
//======================
let stuff = [{id:1,name:'apple',url:'./images/apple.png',count:1},{id:2,name:'milk',url:'./images/milk.jpg',count:0}]
let collect = Array.from(document.querySelectorAll('.collect>ul>li'))


//  顯示物品欄的物品和數量
for(i=0;i<collect.length;i++){
  if(stuff[i] == null){
    break
  } else{
    collect[i].innerHTML = `<img src='${stuff[i].url}'><span>${stuff[i].count}`
  }
  
}

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
      //console.log(`現在${stuff[index].name}有${stuff[index].count}個`)
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

//================================================
// 隨機顧客與隨機數量
//================================================
function sale() {
    
    if(firstTimeGamer == 1) {
      return
    }else {
    let n1,n2
    n1 = Math.floor(Math.random()*100)
    n2 = Math.floor(Math.random()*customer.length)
    
    saleTargets.push(`${customer[n2]}需要蘋果牛奶${n1}個`)
    //console.log(saleTargets)
    //saleChatting.appendChild(document.createElement('li')).textContent = `${customer[n2]}需要蘋果牛奶${n1}個`
      }
    
    renderCustomer()
    
    
}

//===============
//    解任務
//===============




//====================================================
//  客人的畫面更新
//====================================================
function renderCustomer(){
  saleChatting.innerHTML = ""
  if(saleTargets.length == 0){
    saleChatting.innerHTML = '<span>目前沒客人'
  } else {
    saleTargets.forEach((saleTarget,index)=>{
      console.log(saleTargets.indexOf(saleTarget))
      saleChatting.innerHTML += `<li>${saleTargets[saleTargets.indexOf(saleTarget)]}</li>`
    })
  }
}
sale()
renderCustomer()