$('document').ready(function(){

visor=document.getElementById("reloj"); //localizar pantalla del reloj
//variables de inicio:
    var marcha=0; //control del temporizador
    var cro=0; //estado inicial del cronómetro.
    $('.button').click(function(){
        $(this).css('display', 'none');
        $('.overlay').css('display', 'none');
        $('#cronometro').css('display', 'inline-block');
        empezar();
    });

});

//Estado empezar: Poner en marcha el crono
function empezar() {
    emp=new Date(); //fecha inicial (en el momento de pulsar)
    elcrono=setInterval(tiempo,10); //función del temporizador.
    marcha=1 //indicamos que se ha puesto en marcha.
}
//función del temporizador
function tiempo() {
    actual=new Date(); //fecha a cada instante
    //tiempo del crono (cro) = fecha instante (actual) - fecha inicial (emp)
    cro=actual-emp; //milisegundos transcurridos.
    cr=new Date(); //pasamos el num. de milisegundos a objeto fecha.
    cr.setTime(cro);
    //obtener los distintos formatos de la fecha:
    cs=cr.getMilliseconds(); //milisegundos
    cs=cs/10; //paso a centésimas de segundo.
    cs=Math.round(cs); //redondear las centésimas
    sg=cr.getSeconds(); //segundos
    mn=cr.getMinutes(); //minutos
    ho=cr.getHours()-1; //horas
    //poner siempre 2 cifras en los números
    if (cs<10) {cs="0"+cs;}
    if (sg<10) {sg="0"+sg;}
    if (mn<10) {mn="0"+mn;}
    //llevar resultado al visor.
    visor.innerHTML=ho+":"+mn+":"+sg;
}
//parar el cronómetro
function parar() {
    clearInterval(elcrono); //parar el crono
    marcha=0; //indicar que está parado.
}

//Volver al estado inicial
function reiniciar() {
    if (marcha==1) {  //si el cronómetro está en marcha:
        clearInterval(elcrono); //parar el crono
        marcha=0;	//indicar que está parado
    }
    //en cualquier caso volvemos a los valores iniciales
    cro=0; //tiempo transcurrido a cero
    visor.innerHTML = "0:00:00"; //visor a cero
}
