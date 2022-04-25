//Inicialização e Variaveis 
const main = document.getElementsByTagName('main')[0];
let divs = main.getElementsByClassName('letra');
let key =  document.getElementsByTagName('table')[0].getElementsByTagName('tr');
let k1 = key[0].getElementsByTagName('td');
let k2 = key[1].getElementsByTagName('td');
let k3 = key[2].getElementsByTagName('td');
let key_clicked = [];
let position = 0;
let max = 5;
let word_fe = ''
let div_position = divs[position]
let score = 0;
let score_max = 0;
let linhas = [0];
let scores = [];
let acertos = 0;
document.getElementById('d2').style.display = 'none'
document.getElementById('d1').style.display = 'none'

//Funções
function estatisca(){
    document.getElementById('score-e').textContent = String(score) + 'pts';
    document.getElementById('acerto-e').textContent = String(acertos);
    document.getElementById('max-e').textContent =+ String(score_max) + 'pts';

}
function error(message){
    document.getElementById('error').textContent = message;
    document.getElementById('error').style.left = '0px';
    setTimeout(function(){   document.getElementById('error').style.left = '-120px';
    document.getElementById('error').textContent = "";}, 4000)

}
function change_letter(o){
    l = String(o)
    if(l=='ç'){
        return 'c';
    }else if(l=='á' || l=='â' || l=='ã'){
        return 'a';
    }else if(l=='é'||l=='ê'){
        return 'e';
    }else if(l=='í'){
        return 'i';
    }else if(l=='ó'||l=='ô'||l=='õ'){
        return 'o'
    }else{
        return l
    }
}
function change_word(w){
    x = change_letter(w[0]) + change_letter(w[1]) + change_letter(w[2]) + change_letter(w[3]) + change_letter(w[4]);
    return x;

}
function insert_word(l){
    if(l=='Back'){
        if(position<max-4){
            null;
        }else{
            divs[position-1].innerText = "";
            position --;
        }
    }else if(l=='ENTER'){
        next();
    }else{
        if(position < max ){
            divs[position].innerText = l.toUpperCase();
            position ++;
        }else{
            null;
        }


}}
function venceu(){
    acertos ++;
    document.getElementById('d1').style.display = 'flex';
    document.getElementById('vencedor').style.transition = '2s';
    document.getElementById('vencedor').style.top = '0px';
    //colorir bolas
    for(let i = position; i>4; i-=5){
        document.getElementsByClassName('ball')[i/5-1].style.backgroundColor = '#609e31';
    }
    score += Math.abs((position-30)*60+50);
    document.getElementById('score').textContent = "Score:" + " "+ String(score) +" "+ 'pontos';
}
function perdeu(){
    document.getElementById('d2').style.display = 'flex';
    document.getElementsByClassName('titulo')[1].innerText = "Perdeu";
    document.getElementById('vencedor').style.transition = '2s';
    document.getElementById('vencedor').style.top = '0px';
    document.getElementById('palavra').textContent = 'A palavra era: '+ String(sortd_pa)
    linhas = [0];
    //colorir bolas
    for(let i = 0; i<6; i++){
        document.getElementsByClassName('ball')[i].style.backgroundColor = 'red';
    }
    score += Math.abs((position-30)*60) ;
    document.getElementById('score').textContent = "Score:" + " "+ String(score) +" "+ 'pontos';
}
function proxima(x){
    clarear(null,4)
    key_clicked = [];
    k = null;
    document.getElementById('vencedor').style.top = '-90vh';
    setTimeout(function(){
        document.getElementsByClassName('titulo')[1].innerText = "Acertou";
        linhas = [0];
        document.getElementById('palavra').textContent = ''

        for(let i = 0; i<6; i+=1){
            document.getElementsByClassName('ball')[i].style.backgroundColor = '#2f1a0e';
        }
        sort_pa = palavras[Math.floor(Math.random()*4)];
        sortd_pa = sort_pa[Math.floor(Math.random()*sort_pa.length)];
        position = 5;


        for(i=0;i<30;i++){
            divs[i].style.backgroundColor = "#391e10";
            divs[i].textContent = '';
        }
        position = 0;
        max = 5;
        word_fe = '';
        document.getElementById('d1').style.display = 'none';
        document.getElementById('d2').style.display = 'none';
        if(x == '2'){
            score = 0;
            estatisca()
    
        }else{
            null;
        }
    }, 1000)

}
function next(){
    estatisca()
    if(position%5 == 0){
        if(linhas.indexOf(position)>=0){
            error('(!) Escreva uma palavra.');
        }else{
            max = max + 5;
            let cont = 0;
            let dl = null;
            for(let i = max-5; i < max ; i++){
                dl = divs[i-5];
                if(change_letter(dl.textContent) == change_letter(sortd_pa[cont]).toUpperCase()){
                    dl.style.backgroundColor = "#672400"; 
                    clarear(dl.textContent,0)
                }else if(change_word(sortd_pa).indexOf(change_letter(dl.textContent).toLowerCase())>0){
                    dl.style.backgroundColor = "#cd982d"
                    clarear(dl.textContent,1)
                }else{
                    clarear(dl.textContent,2)
                }
                cont++;
                word_fe = String(word_fe) + String(dl.textContent);
        
            }
            if(change_word(word_fe)==change_word(sortd_pa).toUpperCase()){
                venceu();
            }else if(position == 30){
                perdeu();
            }else{
                word_fe = '';
            }
            linhas.push(position);;
        }
 
    }else{
        error("(!) Palavras de 5 letras.");
    }
    score_max = Math.max(score,score_max);
    estatisca();    
}
function instruction(){
    document.getElementById('instruction').style.animation = 'sumir 1s linear';
    setTimeout(function(){document.getElementById('instruction').style.display = 'none';},1000)

}
function clarear(key,code){

    if(code != 4){
        let k = null
        for(let i = 0; i < k1.length; i++){
            if(k1[i].textContent == key){
                k = k1[i];
                break;
            }else{null}
        }
        if(k==null){
            for(let i = 0; i < k2.length; i++){
                if(k2[i].textContent == key){
                    k = k2[i];
                    break;
                }else{null}
            }
            if(k==null){
                for(let i = 0; i < k3.length; i++){
                    if(k3[i].textContent == key){
                        k = k3[i];
                        break;
                    }else{null}
                }
            }else{null}
        }else{null}
    
    
        if(code==0){
            k.style.backgroundColor = "#672400";
        }else if(code==1){
            if(key_clicked.indexOf(k.textContent)>=0){
                null
            }else{
            k.style.backgroundColor = "#cd982d";}
        }else if(code==2){
            if(key_clicked.indexOf(k.textContent)>=0){
                null
            }else{
            k.style.backgroundColor = "#391e10";}
        }
        
        key_clicked.push(k.textContent)
    }else{
        for(let i = 0; i < k1.length; i++){
            k1[i].style.backgroundColor = '';
            k2[i].style.backgroundColor = '';
            if(i<8){
                k3[i].style.backgroundColor = ''
            }

    }}


}

// Montando o Mapa
for (let index = 1; index <= 30; index++) {
    main.innerHTML += '<div class="letra")></div>';
}

// Escolhendo a palavras
const palavras = [palavras1, palavras2, palavras3, palavras4];
sort_pa = palavras[Math.floor(Math.random()*4)];
sortd_pa = sort_pa[Math.floor(Math.random()*sort_pa.length)];

// Entrada do teclado

    //teclado fisico
document.body.onkeydown = function(){
    if(event.keyCode == 8){
        if(position<max-4){
            null;
        }else{
            divs[position-1].innerText = "";
            position --;
        }
    }
}
document.body.onkeypress = function(){
    if(Number(event.keyCode) == 13){
        next();
    }else if(event.keyCode >47 && event.keyCode <58 ){
        error('(!) Apenas Letras');

    }else if(position < max ){
        divs[position].innerText = (event.key).toUpperCase();
        position ++;
    }else{
        null;
    }
    

}
    //teclado virtual
key[0].addEventListener('click', function x(){
    insert_word(event.target.textContent);
})
key[1].addEventListener('click', function x(){
    insert_word(event.target.textContent);
})
key[2].addEventListener('click', function x(){
    insert_word(event.target.textContent);
})

//estatisca bar
let push = document.getElementById('estatisca');
push.addEventListener('mouseenter', function(){
    document.getElementById('estatisca_box').style.transition = '0.5s'
    document.getElementById('estatisca_box').style.left = '79%'
})

push.addEventListener('mouseleave', function(){
    document.getElementById('estatisca_box').style.left = ''
})

