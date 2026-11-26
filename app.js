import {longPress,pinch,refresh,sliding} from './gestos/gestos.js';
const $ = s => document.querySelector(s);
const get = async url => {const r=await fetch(url,{cache:'no-store'});if(!r.ok) throw Error(url);return r;};
const template = async path => (await get(path)).text();
const native = new URLSearchParams(location.search).get('vista') !== 'respaldo';
if (native) {
  try {
    await import('/node_modules/@ionic/core/dist/ionic/ionic.esm.js');
    await customElements.whenDefined('ion-content');
  } catch (error) {
    document.documentElement.style.visibility = 'visible';
    document.body.innerHTML = '<main class="setup"><h1>Nova Market</h1><p>Falta cargar Ionic Core. Ejecuta Iniciar.cmd desde la carpeta del proyecto y vuelve a abrir la tienda.</p></main>';
    throw error;
  }
} else {
  document.body.classList.add('preview');
}
const preview=native?null:await import('./preview.js');
$('#nav').innerHTML=await template('/menu/menu.html');
let catalog=await (await get('/assets/catalogo.json')).json(), chosen=catalog[0], group='Todo', generation=0;
let cart={};try {cart=JSON.parse(localStorage.novaCart||'{}')||{};}catch{}
const save=()=>localStorage.novaCart=JSON.stringify(cart);
const money=n=>'RD$ '+n.toLocaleString('en-US');
const add=()=>{cart[chosen.id]=(cart[chosen.id]||0)+1;save();};
let openingMenu = Promise.resolve();
const closeMenu=async()=>{await openingMenu;return native?$('ion-menu').close():document.body.classList.remove('menuOpen');};
$('#openMenu').onclick=()=>native?(openingMenu=$('ion-menu').open()):document.body.classList.add('menuOpen');
$('#closeMenu').onclick=closeMenu;
const go=async route=>{await closeMenu();if(location.hash.slice(1)===route)await render();else location.hash=route;};
document.querySelectorAll('[data-route]').forEach(b=>b.onclick=()=>go(b.dataset.route));
$('#inspect').onclick=()=>{$('#options').close();go('detalle');};
$('#quickAdd').onclick=()=>{$('#options').close();add();go('carrito');};
$('#dismiss').onclick=()=>$('#options').close();

async function render(){
 const seq=++generation;
 const route=['catalogo','detalle','carrito'].includes(location.hash.slice(1))?location.hash.slice(1):'catalogo';
 const html=await template('/interfaces/'+route+'.html');
 if(seq!==generation)return;
 $('#page').innerHTML=html;
 document.querySelectorAll('.back-btn').forEach(b=>{ b.onclick=()=>{ location.hash='catalogo'; }; });
 document.querySelectorAll('[data-route]').forEach(b=>b.classList.toggle('selected',b.dataset.route===route));
 if(route==='catalogo'){
  const draw=()=>{
   const result=catalog.filter(p=>(group==='Todo'||group===p.category)&&(p.name+' '+p.capacity).toLowerCase().includes($('#search').value.toLowerCase()));
   $('#products').innerHTML=result.map(p=>`<ion-card><button class="product" data-id="${p.id}"><img src="/assets/${p.id}.svg" alt=""><span><small>${p.category}</small><b>${p.name}</b><em>${money(p.price)}</em></span><i>›</i></button><div class="qty"><span>Cant.</span><button class="qty-minus" data-qty="${p.id}">−</button><b class="qty-value" data-qty="${p.id}">${cart[p.id]||1}</b><button class="qty-plus" data-qty="${p.id}">+</button></div></ion-card>`).join('')||'<p>Sin coincidencias. Prueba otra búsqueda.</p>';
   for(const b of document.querySelectorAll('.product')){
    const item=catalog.find(p=>p.id===b.dataset.id);
    longPress(b,()=>{chosen=item;$('#chosen').textContent=item.name;$('#options').showModal();});
    b.onclick=()=>{chosen=item;go('detalle');};
   }
   for(const b of document.querySelectorAll('#products .qty-minus')) b.onclick=e=>{e.stopPropagation(); const p=catalog.find(x=>String(x.id)===b.dataset.qty); if(p){const c=(cart[p.id]||1);cart[p.id]=Math.max(1,c-1);save(); draw();} };
   for(const b of document.querySelectorAll('#products .qty-plus')) b.onclick=e=>{e.stopPropagation(); const p=catalog.find(x=>String(x.id)===b.dataset.qty); if(p){cart[p.id]=(cart[p.id]||1)+1;save(); draw();} };
   document.querySelectorAll('.chips button').forEach(b=>b.classList.toggle('selected',b.textContent===group));
  };
  $('#search').oninput=draw;document.querySelectorAll('.chips button').forEach(b=>b.onclick=()=>{group=b.textContent;draw();});draw();
  const reload=async()=>{try{const data=await(await get('/assets/catalogo.json')).json();if(seq!==generation)return;catalog=data;draw();$('#updated').textContent='Catálogo actualizado · '+new Date().toLocaleTimeString('es-DO');}catch{if(seq===generation)$('#updated').textContent='Error al actualizar. Intenta de nuevo.';}};
  refresh($('ion-refresher'),reload);preview?.pull($('article'),reload);
 }
 if(route==='detalle'){
  $('#picture').src='/assets/'+chosen.id+'.svg';$('#picture').alt=chosen.name;$('#name').textContent=chosen.name;$('#price').textContent=money(chosen.price);
  $('#specs').innerHTML=[chosen.capacity,chosen.material,'Retiro gratis en Mao'].map(s=>'<ion-item><ion-label>'+s+'</ion-label></ion-item>').join('');
  $('#resetZoom').onclick=pinch($('#photo'),scale=>{$('#picture').style.transform='scale('+scale+')';$('#scale').textContent=Math.round(scale*100)+' %';});
  $('#buy').onclick=()=>{add();go('carrito');};
 }
 if(route==='carrito'){
  const draw=()=>{
   const items=catalog.filter(p=>cart[p.id]>0);
   const rowsTemplate = document.createElement('template');
   rowsTemplate.innerHTML=items.map(p=>`<ion-item-sliding data-id="${p.id}"><ion-item><img slot="start" class="thumb" src="/assets/${p.id}.svg" alt=""><ion-label><b>${p.name}</b><p>${money(p.price)} · Cant. ${cart[p.id]}</p></ion-label><div class="qty"><span>Cant.</span><button class="cart-minus" data-id="${p.id}">−</button><b class="cart-qty" data-id="${p.id}">${cart[p.id]}</b><button class="cart-plus" data-id="${p.id}">+</button></div></ion-item><ion-item-options side="end"><ion-item-option color="danger">Eliminar</ion-item-option></ion-item-options></ion-item-sliding>`).join('')||'<p class="empty">Tu carrito está vacío.</p>';
   const rows = document.importNode(rowsTemplate.content, true);
   rows.querySelectorAll('ion-item-options').forEach(options => { options.side = 'end'; });
   $('#rows').replaceChildren(rows);
   for(const b of document.querySelectorAll('#rows .cart-minus')) b.onclick=e=>{e.stopPropagation(); const id=b.dataset.id; cart[id]=Math.max(1,(cart[id]||1)-1);save(); draw();};
   for(const b of document.querySelectorAll('#rows .cart-plus')) b.onclick=e=>{e.stopPropagation(); const id=b.dataset.id; cart[id]=(cart[id]||1)+1;save(); draw();};
   $('#total').textContent=money(items.reduce((sum,p)=>sum+p.price*cart[p.id],0));$('#confirm').disabled=!items.length;
   document.querySelectorAll('ion-item-sliding').forEach(row=>{sliding(row,()=>{delete cart[row.dataset.id];save();draw();});preview?.swipe(row);});
  };draw();
  $('#confirm').onclick=()=>{const total=$('#total').textContent;cart={};save();draw();$('#receipt').textContent='Pedido de práctica confirmado · '+total+' al retirar.';};
 }
}
addEventListener('hashchange',render);await render();
