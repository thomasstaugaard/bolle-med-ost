'use strict';
// Afskrevne menupriser fra caféernes egne hjemmesider, kontrolleret 10. november 2026.
// Oplysningerne viser et udvalg, ikke et repræsentativt gennemsnit for København.
const cafes = [
  {name:'Kaffesalonen', area:'Nørrebro', price:34, url:'https://kaffesalonen.com/morgenmad/', detail:'Bolle med smør og økologisk ost'},
  {name:"Segall’s", area:'Indre By', price:35, url:'https://www.segalls.dk/12/segall-menu-morgen', detail:'Hjemmebagt bolle med ost og smør'},
  {name:'Café Lili', area:'Indre By', price:35, url:'https://www.cafelili.dk/menus', detail:'Bolle med ost'},
  {name:'Family Zoo', area:'Østerbro', price:40, url:'https://familyzoo.dk/cafe/', detail:'Bolle med smør og krystalost'},
  {name:'P88', area:'Christianshavn', price:54, url:'https://p88.dk/menu', detail:'Bolle med smør og ost'},
  {name:"Den Go’e Kaffebar", area:'Frederiksberg', price:59, url:'https://dengoekaffebar.coffea.dk/index.php/menu/', detail:'Bolle med smør og vesterhavsost'}
];
const fmt = value => Number(value).toLocaleString('da-DK',{maximumFractionDigits:1});
const band = price => price < 40 ? 'Under 40 kr.' : price < 50 ? '40–49 kr.' : '50+ kr.';
const bands = ['Under 40 kr.','40–49 kr.','50+ kr.'];
const bars = document.querySelector('#bar-chart');
cafes.forEach(cafe=>{
  const row=document.createElement('div');row.className='bar-row';
  const label=document.createElement('span');label.className='bar-label';label.textContent=cafe.name;
  const track=document.createElement('div');track.className='bar-track';
  const fill=document.createElement('div');fill.className='bar-fill';fill.style.width=`${cafe.price/65*100}%`;
  const value=document.createElement('span');value.className='bar-value';value.textContent=fmt(cafe.price);
  track.append(fill);row.append(label,track,value);bars.append(row);
});
const list=document.querySelector('#cafe-list');
cafes.forEach(cafe=>{
  const a=document.createElement('a');a.className='cafe-entry';a.href=cafe.url;a.target='_blank';a.rel='noopener noreferrer';
  const name=document.createElement('span');name.className='cafe-name';name.textContent=cafe.name;
  const area=document.createElement('span');area.className='cafe-area';area.textContent=cafe.area+' · '+cafe.detail;
  const price=document.createElement('span');price.className='cafe-price';price.textContent=cafe.price+' kr.';
  const icon=document.createElement('span');icon.className='outbound';icon.setAttribute('aria-hidden','true');icon.textContent='↗';
  a.setAttribute('aria-label',`${cafe.name}, ${cafe.area}, ${cafe.price} kroner. Se menukort (åbner ny fane)`);
  a.append(name,area,price,icon);list.append(a);
});
function renderPivot(){
  const group=document.querySelector('#pivot-group').value;
  const measure=document.querySelector('#pivot-measure').value;
  const rowKey=cafe=>group==='area'?cafe.area:band(cafe.price);
  const groupNames=[...new Set(cafes.map(rowKey))].sort((a,b)=>a.localeCompare(b,'da'));
  if(group==='band')groupNames.splice(0,groupNames.length,...bands);
  document.querySelector('#pivot-row-heading').textContent=group==='area'?'Bydel':'Prisniveau';
  const tbody=document.querySelector('#pivot-body');tbody.replaceChildren();
  const output=value=>measure==='count'?String(value.length):(value.length?fmt(value.reduce((sum,c)=>sum+c.price,0)/value.length)+' kr.':'—');
  for(const groupName of [...groupNames,'I alt']){
    const tr=document.createElement('tr');const th=document.createElement('th');th.scope='row';th.textContent=groupName;tr.append(th);
    for(const colName of [...bands,'I alt']){
      const subset=cafes.filter(c=>(groupName==='I alt'||rowKey(c)===groupName)&&(colName==='I alt'||band(c.price)===colName));
      const td=document.createElement('td');td.textContent=output(subset);tr.append(td);
    }
    tbody.append(tr);
  }
  document.querySelector('#pivot-note').textContent=measure==='count'?'Cellerne viser antal caféer. Totalen er antallet af caféer i hver gruppe.':'Cellerne viser gennemsnitsprisen i kroner. Totalen er et vægtet gennemsnit af caféerne, ikke en sum.';
}
document.querySelector('#pivot-group').addEventListener('change',renderPivot);
document.querySelector('#pivot-measure').addEventListener('change',renderPivot);
renderPivot();
