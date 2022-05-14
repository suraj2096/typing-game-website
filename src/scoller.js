const scroll=()=>{
 setTimeout(() => {
    let childslider = document.querySelector('.slider');
    let btn1 = document.querySelector('.first');
    let btn2 = document.querySelector('.second');
    let btn3 = document.querySelector('.third');
    let btn4 = document.querySelector('.forth');  
   let click = 1;
   def();
   btn1.addEventListener('click',(event)=>{
       click = 2;
       childslider.style.transform="translateX(0%)";
       btn1.style.backgroundColor="blue";
   })
   btn2.addEventListener('click',()=>{
       childslider.style.transform="translateX(-100%)";
       btn1.style.backgroundColor="";
       btn2.style.backgroundColor="blue";
       click = 3;
   })
   btn3.addEventListener('click',()=>{
       childslider.style.transform="translateX(-200%)";
       btn2.style.backgroundColor="";
       btn3.style.backgroundColor="blue";
       click=4
   })
   btn4.addEventListener('click',()=>{
       childslider.style.transform="translateX(-300%)";
       btn3.style.backgroundColor="";
       btn4.style.backgroundColor="blue";
       click=1
   });

   function def (){
       if(click===1 ){
       if(btn4.style.backgroundColor==="blue"){
        btn4.style.backgroundColor="";
}          
           childslider.style.transform="translateX(0%)";
  btn1.style.backgroundColor="blue";
    click+=1;
         return;
        }
        else if(click===2){
            childslider.style.transform="translateX(-100%)";
            btn1.style.backgroundColor="";
            btn2.style.backgroundColor="blue";
            click+=1;
            return;
        }
        else if(click===3){
            
            childslider.style.transform="translateX(-200%)";
            btn2.style.backgroundColor="";
            btn3.style.backgroundColor="blue";
            click+=1;
         return;
        }
        else if(click===4){
            
            childslider.style.transform="translateX(-300%)";
            btn3.style.backgroundColor="";
            btn4.style.backgroundColor="blue";
            click=1;
          return;
        }
        
     }

   setInterval(() => {
       def();
       
   }, 2800);
},1000);
}
export default scroll;

