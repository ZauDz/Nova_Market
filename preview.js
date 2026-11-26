// Modo de previsualización sin dependencias. En Ionic se usan los componentes nativos.
export function pull(el, reload){
 let start=null;
 el.addEventListener('touchstart',e=>{start=el.parentElement.scrollTop===0&&e.touches.length===1?e.touches[0].clientY:null;},{passive:true});
 el.addEventListener('touchend',e=>{if(start!==null&&e.changedTouches[0].clientY-start>65)reload();start=null;});
 el.addEventListener('touchcancel',()=>start=null);
}
export function swipe(row){
 let start;
 row.addEventListener('touchstart',e=>{start=e.touches[0].clientX;},{passive:true});
 row.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-start;if(Math.abs(dx)>40)row.classList.toggle('reveal',dx<0);});
}
