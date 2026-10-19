var exemplos=[
{q:"Cliente diz que a impressora do financeiro não imprime nada, só fica piscando.",
 h:[["94%","Fila de impressão travada após atualização","A <mark>impressão</mark> ficava parada na fila e a luz <mark>piscava</mark>.","Reiniciar o spooler e limpar a fila resolveu."],
    ["81%","Impressora offline no setor financeiro","Dispositivo aparecia como <mark>offline</mark> para toda a sala.","Trocar a porta TCP/IP para o novo endereço fixo."]]},
{q:"Não consigo entrar no sistema desde ontem, fala que minha senha tá errada.",
 h:[["92%","Conta bloqueada por tentativas incorretas","Usuário recebia <mark>senha inválida</mark> mesmo digitando certo.","Desbloquear a conta e forçar redefinição de senha."],
    ["78%","Senha expirada sem aviso por e-mail","Acesso negado depois de <mark>um dia</mark> sem uso.","Atualizar a política de aviso e redefinir a senha."]]},
{q:"A internet da sala 3 cai toda hora, mas só no notebook.",
 h:[["90%","Notebook trocando de ponto de acesso","Conexão <mark>caía</mark> ao alternar entre dois roteadores.","Fixar o notebook na rede de 5 GHz da sala."],
    ["76%","Driver de rede desatualizado","Queda <mark>intermitente</mark> apenas em um equipamento.","Atualizar o driver da placa de rede."]]}
];
var query=document.getElementById("query"),hits=document.getElementById("hits"),chips=document.querySelectorAll(".chip");
function render(i){
  var e=exemplos[i];
  query.textContent=e.q;
  hits.innerHTML=e.h.map(function(x){
    return '<div class="hit"><div class="hit-top"><span>Caso anterior</span><b>'+x[0]+' parecido</b></div><p><strong>'+x[1]+'</strong></p><p>'+x[2]+'</p><div class="fix">Solução: '+x[3]+'</div></div>';
  }).join("");
  chips.forEach(function(c,n){c.setAttribute("aria-pressed",n===i?"true":"false")});
}
chips.forEach(function(c){c.addEventListener("click",function(){render(Number(c.dataset.i))})});
render(0);

/* contador dos números da seção Problema */
(function(){
  var nums=document.querySelectorAll(".stat strong");
  if(!nums.length||!("IntersectionObserver" in window)) return;
  if(window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var dur=1600;
  nums.forEach(function(el){
    el.dataset.alvo=parseInt(el.textContent,10);
    el.dataset.sufixo=el.textContent.replace(/[0-9]/g,"");
    el.textContent="0"+el.dataset.sufixo;
  });
  function animar(el){
    var alvo=Number(el.dataset.alvo),suf=el.dataset.sufixo,ini=null;
    function passo(t){
      if(ini===null) ini=t;
      var p=Math.min((t-ini)/dur,1);
      var e=1-Math.pow(1-p,3);
      el.textContent=Math.round(alvo*e)+suf;
      if(p<1) requestAnimationFrame(passo);
    }
    requestAnimationFrame(passo);
  }
  var obs=new IntersectionObserver(function(itens){
    itens.forEach(function(i){
      if(i.isIntersecting){animar(i.target);obs.unobserve(i.target)}
    });
  },{threshold:0.6});
  nums.forEach(function(el){obs.observe(el)});
})();
