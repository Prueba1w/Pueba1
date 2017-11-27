/* 
 * @version v3.0
 * Buscador creador por andrés cataño Medellín 2012
 * Si tienen algun incoveniente no olvides escribir:
 * serdnah2@gmail.com | andres0994@hotmail.com
 * Software libre, el conocimiento es libre.
 * No olvides agradecer y seguirme en mis cuentas:
 * Youtube: http://www.youtube.com/user/serdnah2
 * Twitter: @Andres542
 * Facebook: https://www.facebook.com/andres.ktano
 */

var currentPaginator = 1;
var totalPages = "";
var findComplete = false;
var validateSearch = "";
var oldSearch = "";
function main(){
    createListeners();
}


function createListeners(){
    $("#logoBottom").hover(
        function () {
            $(this).animate({"opacity":"0.4"},500);
        }, 
        function () {
            $(this).animate({"opacity":"1"},500);
        }
    );
            
    $("#submit").click(function(){
        var valueInput = $("#buscar").val();
        if(valueInput != ""){
            callBuscar();
        }  
    });
    $("#buscar").keydown(function (e){
        if(e.keyCode == 13){
            var valueInput = $("#buscar").val();
            if(valueInput != ""){
                callBuscar();
            }
        }
    })
    
    $("#arrowPrevious").click(function(){
        $("#section"+currentPaginator).hide();
        currentPaginator--;
        $("#section"+currentPaginator).show();
        $("#paginador span").html("P&aacute;gina "+currentPaginator);
        if(currentPaginator == 1){
            $("#arrowPrevious").hide();
        }
        if(currentPaginator < totalPages){
            $("#arrowNext").show();
        }
    });
    
    $("#arrowNext").click(function(){
        $("#section"+currentPaginator).hide();
        currentPaginator++;
        $("#section"+currentPaginator).show();
        $("#paginador span").html("P&aacute;gina "+currentPaginator);
        if(totalPages == currentPaginator){
            $("#arrowNext").hide();
        }
        if(currentPaginator > 1){
            $("#arrowPrevious").show();
        }
    });
}

function callBuscar(){
    if(($("#logo").css("display") == "block")){
        $("#logo img").animate({"opacity":"0"},100,function(){
        $("#logo").animate({"height":"0px"},500, function(){
                $("#logo").css("display","none");
                $("#resultadosBuscador").text("");
                var stringBuscar = $("#buscar").val();
                 validateSearch = stringBuscar;
                $("#loading").show();
                $("#paginador").hide();
                buscar(stringBuscar);
                $("#logoBottom").show();
                $("#logoBottom").animate({"opacity":"1"},2000)
            })
         })
    }else{
        var stringBuscar = $("#buscar").val();
        validateSearch = stringBuscar;
        console.log(oldSearch);
        if(validateSearch != oldSearch){
            $("#resultadosBuscador").text("");
            $("#loading").show();
            $("#paginador").hide();
            buscar(stringBuscar);
        }
    } 
}

function buscar(stringBuscar){
        oldSearch = validateSearch;
	var url = "buscar.php?buscar="+stringBuscar+"&findComplete="+findComplete;
	$.getJSON(url, function (data) {
                $("#loading").hide();
                if(data.error){
                    errorConnection(data);
                    return;
                }
                resetPaginator();
		var totalData = data.length;
		var show = 5;
		var amountToSee = (totalData / show); 
		amountToSee = amountToSee.toString();
		amountToSee = amountToSee.split(".");
		if(amountToSee[1]){
                        if(amountToSee[0] == 0){
                            $("#arrowNext").hide();
                        }else{
                            $("#paginador").show();
                        }
			amountToSee = amountToSee[0];
			amountToSee++;
                        totalPages = amountToSee;
                        
		}else{
                        if(amountToSee[0] == 0){
                            $("#paginador").hide();
                            $.error = $('\
                                <div class="alert">\
                                    <img src="images/alert.png" /><br />\
                                    No se han encontrado resultados. Por favor inserte una nueva palabra\
                                </div>\
                                ');
                            $("#resultadosBuscador").append($.error);
                            $("#resultadosBuscador").fadeIn("fast");
                        }else{
                            totalPages = amountToSee;
                        }
                        
		}
		
		var current = 0;
		for(var s=1; s<=amountToSee; s++){
			$.createDiv = $('<div id="section'+s+'" class="itemResult"></div>');
			$("#resultadosBuscador").append($.createDiv);
			for(var i=(current * show); i<=((show * s)-1); i++){
                            if(data[i]){
                               $.result = $('\
				<div class="itemResultado">\
                                        <a href='+data[i].link+'>'+data[i].titulo+'</a><br/>\
                                        <div class="linkGreen">'+data[i].link+'</div><br/>\
                                        <div>'+data[i].descripcion+'</div><br/>\
				</div>\
				');
				$("#section"+s).append($.result);
				if(i == ((show * s)-1)){
					current++;
				} 
                            }
				
			}
                    if(amountToSee == s){
                        $("#resultadosBuscador, #paginador").fadeIn("fast");
                        $(".itemResultado").hover(
                            function () {
                                $(this).css("background","white");
                            }, 
                            function () {
                                $(this).css("background","transparent");
                            }
                        );
                    }
			
		}
		
	});
	
}

function resetPaginator(){
    totalPages = 0;
    currentPaginator = 1;
    $("#arrowPrevious").hide();
    $("#paginador span").html("P&aacute;gina "+currentPaginator);
    $("#arrowNext").show();
}

function errorConnection(data){
    if(data.error == "error_connect"){
        $.error = $('\
            <div class="alert">\
                <img src="images/error.png" /><br />\
                Error en la configuración con la base de datos, por favor verifique sus datos.<br>\
                <b>Recuede que los puedes modificar en el archivo "conexion.php"</b>.<br>\
                Estos son los datos que está actualmente en dicho archivo:<br><br>\
                <center><table style=" text-align: left;">\
                <tr><td><b>bd_host</b></td><td>'+data.bd_host+'<br></tr>\
                <tr><td><b>bd_usuario</b></td><td>'+data.bd_usuario+'<br></tr>\
                <tr><td><b>bd_password</b></td><td>'+data.bd_password+'<br></tr>\
                </table></center>\
            </div>\
            ');
        $("#resultadosBuscador").append($.error);
        $("#resultadosBuscador").fadeIn("fast");
    }
    if(data.error == "error_base"){
        $.error = $('\
            <div class="alert">\
                <img src="images/error.png" /><br />\
                Error en la selección de la base de datos, por favor verifique sus datos.<br>\
                <b>Recuede que los puedes modificar en el archivo "conexion.php"</b>.<br>\
                Estos son los datos que está actualmente en dicho archivo:<br><br>\
                <center><table style=" text-align: left;">\
                <tr><td><b>bd_host</b></td><td>'+data.bd_base+'<br></tr>\
                </table></center>\
            </div>\
            ');
        $("#resultadosBuscador").append($.error);
        $("#resultadosBuscador").fadeIn("fast");
    }
    if(data.error == "error_table"){
        $.error = $('\
            <div class="alert">\
                <img src="images/error.png" /><br />\
                Error en la selección de la tabla en la base de datos, por favor verifique sus datos.<br>\
                <b>Recuede que los puedes modificar en el archivo "buscar.php"</b>.<br>\
                Estos son los datos que está actualmente en dicho archivo:<br><br>\
                <center><table style=" text-align: left;">\
                <tr><td><b>Tabla</b></td><td>'+data.table+'<br></tr>\
                <tr><td><b>Campo</b></td><td>'+data.field+'<br></tr>\
                </table></center>\
            </div>\
            ');
        $("#resultadosBuscador").append($.error);
        $("#resultadosBuscador").fadeIn("fast");
    }
}