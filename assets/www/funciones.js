/* funcion para conectarnos al servidor*/
function consultarServidor(opc,pag) {
	var servidor='';
    /* Llamamos el funcion del cargando */
	crearCargando(pag);
	//Si hay conexión a Internet
	if (obtenerRed()) {
		//Prepara la petición dependiento de lo solicitado
		switch (opc){
			case "autenticar":
			var tipo=1;
			usu= $("#txtUsuario").val();
			contra= $("#txtPassword").val();
				$.ajax({
					url:'http://amoryamistadcnca.260mb.net/autenticar.php',
					type:'post',
					dataType: 'json',
					data:{tipo:tipo,usu:usu,contra:contra},
					beforeSend: function () {
                        /* Llamamos el funcion del cargando */
						crearCargando(pag);
                	},
                	success: function(data){
                		switch (data[1]){
						case '-1':
						    navigator.notification.alert("Debe digitar su Usuario y Password.",null,"Login");
						break;
						case '1':
							//Guarda el usuario autenticado
							window.localStorage.setItem("login", usu);
							location.href='home.html';
						break;
						default:
							navigator.notification.alert("Usuario y/o Password invalidos.",null,"Login");
					}
                	}


				});
				// var tipo=1;//tipo de  documento:cedula
				// usu= document.getElementById("txtUsuario").value;
				// var contra= document.getElementById("txtPassword").value;
				// var parametro = "usu="+usu+"&contra="+contra+"&tipo="+tipo;
				// servidor="http://amoryamistadcnca.260mb.net/autenticar.php";
			break;
			case "buscarOferta":
				var programa= document.getElementById("txtBuscar").value;
				var parametro = "prog="+programa;
				servidor="http://amoryamistadcnca.260mb.net/ofertas.php";
			break;
			//CERTIFICADOS Y CONSTANCIAS
			case "certificados":
			    var txtTipo=1;
			    var txtcodigo= document.getElementById("txtIdUsu").value;
				var parametro = "txtIdUsu="+txtcodigo+"&txtTipo="+txtTipo;
				servidor="http://amoryamistadcnca.260mb.net/consultarCertificado.php";
			break;
			
			case "formacion":
			    var txtcodigo= "1143";
				var parametro = "txtIdUsu="+txtcodigo;
				servidor="http://amoryamistadcnca.260mb.net/formacion.php";
			break;	
			
			case "actualizarDatos":
				var txtEstado= document.getElementById("estado").value;
				var txttelefono= document.getElementById("telefono").value;
				var txtEps= document.getElementById("EPS").value;
				var txtcontacto= document.getElementById("nomContacto").value;
				var txttelcontac= document.getElementById("telContacto").value;
				var txtparent= document.getElementById("parentesco").value;
				var txtempr= document.getElementById("empresa").value;
				var txtCargo=document.getElementById("CARGO").value;
				var txtfecCont= document.getElementById("fechaContacto").value;
				var parametro = "nomCont="+txtcontacto+"&telCont="+txttelcontac+"&parent="+txtparent+
				"&=empre" +txtempr+"&fechaCont="+txtfecCont+"&tel="+txttelefono+"&estadoCivil="+txtEstado+"&eps="+txtEps+"&cargo="+txtCargo;
				servidor="http://amoryamistadcnca.260mb.net/actualizarDatos.php";
			
			break;
			case "hojaVida":
				parametro="";
				servidor="http://amoryamistadcnca.260mb.net/hojavida.php";
			break
			
		}
		/*Creamos el objeto para la conexión*/
		peticion = obtenerXHR();
		/*Configuramos los datos para la conexión.[Método,archivo con script,asincrono(true)]*/
		peticion.open("POST", servidor, true);
		/*Le asignamos la función que procesará los datos que llegen*/
		peticion.onreadystatechange = procesarPeticion;
		/*Obligatorio cuando se usa POST*/
		peticion.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		/*Parámetros que se envían al servidor.Si son varios se separan con &.
		 Ej:id=10&nom=Rafa Perez*/
		/*Enviamos la petición de conexión con el servidor*/
		peticion.send(parametro);
		
	}else{
		eliminarCargando();
	}

}
/*CREA LA IMAGEN CARGANDO */
function crearCargando(pag){
		// CREAR IMAGEN
		var car = document.createElement("img");
		car.setAttribute('src','medios/loading.gif');
		car.id="cargando";
		var div=document.getElementById(pag);
		div.appendChild(car);
		Temporizador();
}
var timer;
/*TEMPORIZADOR*/
function Temporizador(){
	var car = document.getElementById("cargando");			
	timer=setTimeout("tiempoExcedido();",10000);
}
/* Elimina CARGANDO */
function eliminarCargando(){
	var car = document.getElementById("cargando");
	car.parentNode.removeChild(car);
	paraTimer();
}
function tiempoExcedido(){
  alert('Tiempo de espera excedido. Verifique conexión a Internet.');
  eliminarCargando();
  paraTimer();
}
function paraTimer(){
clearTimeout(timer);
}
/* Evaluar si ya inicio sesión */
function sesion(){
var login = window.localStorage.getItem("login");
	if(login=='null'){
		location.href='index.html';
	}else{
		location.href='home.html';
	}
}
/* cerrar sesión */
function cerrarSesion(){
	window.localStorage.setItem("login",null);
	location.href='index.html';
}
/*Función para procesar los datos que vengan del servidor*/
function procesarPeticion() {
	/** */
	var mensaje;
	if (peticion.readyState == 4) {
		if (peticion.status == 200) {
		    eliminarCargando();
			var datos = peticion.responseText;
			resp = datos.split("&_");
			/*AUTENTICACION*/
			if (resp[0]=='auten') {
					// switch (resp[1]){
					// 	case '-1':
					// 	    navigator.notification.alert("Debe digitar su Usuario y Password.","Login");
					// 	break;
					// 	case '1':
					// 		//Guarda el usuario autenticado
					// 		window.localStorage.setItem("login", usu);
					// 		location.href='home.html';
					// 	break;
					// 	default:
					// 		navigator.notification.alert("Usuario y/o Password invalidos.","Login");
					// }
			/*PROGRAMAS OFERTA*/
			}else if (resp[0]=='ofer'){
				switch (resp[1]){
                case '-1':
					 var conte = document.getElementById("contenido");
					 conte.innerHTML="RESULTADO DE LA B&Uacute;SQUEDA;";
					 conte.innerHTML="No se encontraron ofertas seg&uacute;n los criterios de b&uacute;squeda.";
                break;
                case '1':
                    var conte = document.getElementById("contenido");
					conte.innerHTML="RESULTADO DE LA B&Uacute;SQUEDA;";
					conte.innerHTML = '<br /><b>RESULTADO DE LA B&Uacute;SQUEDA:</b><br />'+resp[2];
					//Refrescamos los componentes adicionados  
					var btnCerti=$('a.btnAccion');
					btnCerti.button();
					/*$('#contenido').collapsibleset('refresh');*/
						
                break;
                default:
                     var conte = document.getElementById("contenido");
					 conte.innerHTML="<br><b>RESULTADO DE LA B&Uacute;SQUEDA:</b><br><font color='red'>No se encontraron ofertas seg&uacute;n los criterios de b&uacute;squeda.</font>";
                }
			/*CERTIFICADOS Y CONSTANCIAS*/
			}else if (resp[0]=='certi'){
				switch (resp[1]){
					case '-1':
						 var conte = document.getElementById("contenido");
						conte.innerHTML="<br /><b>RESULTADO DE LA B&Uacute;SQUEDA:</b><br /><font color='red'>No hay certificados asociados a este documento.</font>";
					break;
					case '1':
						var conte = document.getElementById("contenido");
						conte.innerHTML ='<br><b>RESULTADO DE LA B&Uacute;SQUEDA:</b><br>'+ resp[2];
						//Refrescamos los componentes adicionados  
						var btnCerti=$('a.btnAccion');
						btnCerti.button();						
					break;
				}
			/*MIS  CURSOS */
			}else if (resp[0]=='forma'){
			
				switch (resp[1]){
					case '-1':
						var conte = document.getElementById("contenidoForma");
						conte.innerHTML = '<b>No hay programas asociados a este documento.</b>';
					break;
					case '1':
						var conte = document.getElementById("contenidoForma");
						conte.innerHTML = resp[2];
						//Refrescamos los componentes adicionados  
						$('#contenido').collapsibleset('refresh');
					break;
				}
			
			/*ACTUALIZACION DE  DATOS */
			}else if (resp[0]=='datos'){
			
				switch (resp[1]){
					case '-1':
						var conte = document.getElementById("contenido");
						conte.innerHTML = '<b>Ocurrio un error  al actualizar los datos, intente de  nuevo.</b>';
					break;
					case '1':
					    var conte = document.getElementById("contenido");
						conte.innerHTML = resp[2];
						//Refrescamos los componentes adicionados  
						$('#contenido').collapsibleset('refresh');
						var btnCerti=$('a.btnAccion');
						btnCerti.button();
						alert("Actualizacion exitosa");
					break;
				}
			}else {
			navigator.notification.alert(msgText, null, "Servidor No Disponible. Vuelva a intentarlo! ");
		}
	}
  }
}
function msg(mens) {
	alert(mens);
}

function obtenerXHR() {
	var req = false;
	if (window.XMLHttpRequest) {
		req = new XMLHttpRequest();
	} else {
		if (ActiveXObject) {
			//Definimos un vector con las diferentes posibilidades
			var vectorVersiones = ["MSXML2.XMLhttp.5.0", "MSXML2.XMLhttp.4.0", "MSXML2.XMLhttp.3.0", "MSXML2.XMLhttp", "Microsoft.XMLhttp"];
			for (var i = 0; i < vectorVersiones.length; i++) {
				try {
					req = new ActiveXObject(vectorVersiones[i]);
					return req;
				} catch(e) {
				}
			}
		}
	}
	return req;
}

//fUNCIONES PARA CONOCER EL ESTADO DE LA RED

function obtenerRed() {
	var mensaje;
	//Se obtiene el estado de la red
	var estadoRed = navigator.network.connection.type;
	//Devuelve el estado de la red
	switch (estadoRed) {
		//Si está desconectado
		case Connection.NONE:
			alert("Estado: DESCONECTADO. Verifique su conexión a internet.");
			return false;
			break;

		//Si estamos conectados por WIFI o CABLE
		case Connection.WIFI:
		case Connection.ETHERNET:
			return true;
		break;

		//Si está conectado por el plan de datos celular
		case Connection.CELL:
		case Connection.CELL_2G:
		case Connection.CELL_3G:
		case Connection.CELL_4G:
			if (confirm("¿Desea utilizar su plan de datos?")) {
				return true;
			} else {
				return false;
			}
			break;
		//Estado DESCONOCIDO
		default:
			alert(" Estado:DESCONOCIDO. Verifique su conexión a internet.");
			return false;
			break;
	}
}

//--------FUNCIONES PARA LA MANPULACIÓN DE ARCHIVOS LOCALES--------------------
//Clase para trabajar con el Sistema de Archivo
function sistemaArchivo(){
	this.FS=null;//Variable que contiene el Sistema de Archivo(FS)
	this.crearFS=crearFS; //Método para tener acceso al FS
	this.escribirArchivo=escribirArchivo;//Método crear/modificar el archivo
	this.leerArchivo=leerArchivo;//Método leer el contenido del archivo
	this.fechaArchivo=fechaArchivo;//Método ver la fecha de modificación el archivo
}

function crearFS(){
	//Crea el sistema de archivo
	window.requestFileSystem(LocalFileSystem.TEMPORARY,0,function(fs){this.FS=fs; return true;},null);
}

//Escribir en el archivo temporal
function escribirArchivo(contenido){
	var nomArchivo;
	var fs=this.FS;
	fs.root.getFile(nomArchivo, 
		{create: true},
		function(file){
			file.createWriter(
				//Trata de escribir o crear el archivo que contendrá la información.
				function(escritor){
					escritor.writer(contenido);
				},
				//Si ocurre un error no hace nada
				null);
		},
		null);
}

//Función para leer los archivos locales que contienen los datos
function leerArchivo(pagina){
	var documento=pagina.split('.');
	documento[0]+='.txt';
	var fs=this.FS;
	fs.root.getFile(documento[0], 
		{create: false},
		function(archivo){
			archivo.file(
				//Trata de escribir o crear el archivo que contendrá la información.
				function(){
					//Objeto para leer el archivo 
					var lector = new FileReader();
					//Evento cuando finaliza de leer el archivo
					lector.onloadend = function(e) {
						//devuelve el contenido del archivo
						return e.target.result;
					};
					//Si ocurre un error devuelve 'false'
					function(e) {
						return false;
					};
					//Lee el contenido del archivo
					lector.readAsText(file);
				},
				//Si ocurre un error no hace nada
				null
			);
		},
		null
	);

}

//Verifica la fecha de modificación del archivo
function fechaArchivo(pagina){
	var documento=pagina.split('.');
	documento[0]+='.txt';
	var fs=this.FS;
	
	fs.root.getFile(documento[0], 
		{create: false},
		function(archivo){
			archivo.getMetadata(
			//Función para obtener la diferencia entre 
			//la fecha de creación y la actual.
			//Si el archivo está desactualizado (>15min), 
			//tomará la decisión de ir servidor. 
			function(propiedad){
				var fechaActual =new Date();
				var fechaModificacion =propiedad.modificationTime;
				var diferenciaFecha=fechaActual-fechaModificacion;
				if (diferenciaFecha<15){
					return true;
				}
				return false;
			},
			function(){return false});
		},
		null
	);
}

function accesoError(e) {
	var msgText;
	switch(e.code) {
		case FileError.NOT_FOUND_ERR:
			msgText = "Archivo no encontrado.";
			break;
		case FileError.SECURITY_ERR:
			msgText = "Error de Seguridad.";
			break;
		case FileError.ABORT_ERR:
			msgText = "Acción abortada.";
			break;
		case FileError.NOT_READABLE_ERR:
			msgText = "No se puede leer.";
			break;
		case FileError.ENCODING_ERR:
			msgText = "Error de codificaci&oacute;n.";
			break;
		case FileError.NO_MODIFICATION_ALLOWED_ERR:
			msgText = "Modificaci&oacute;n no permitida.";
			break;
		case FileError.INVALID_STATE_ERR:
			msgText = "Estado invalido.";
			break;
		case FileError.SYNTAX_ERR:
			msgText = "Error de sintaxis.";
			break;
		case FileError.INVALID_MODIFICATION_ERR:
			msgText = "Modificaci&ocaute;n no v&aacute;lida.";
			break;
		case FileError.QUOTA_EXCEEDED_ERR:
			msgText = "Sin espacio en cache.";
			break;
		case FileError.TYPE_MISMATCH_ERR:
			msgText = "No coinciden los tipos.";
			break;
		case FileError.PATH_EXISTS_ERR:
			msgText = "Ruta inexistente.";
			break;
		default:
			msgText = "Error desconocido.";
	}
	//Le decimos al usuario que pasó
	navigator.notification.alert(msgText, null, "Error de Archivo");
}

/*-----MANEJA EL ACCESO A LOS ARCHIVOS LOCALES------
 Este sistema trabaja como memoria cache, almacenando la información
 previamente consultada. Con esto se consigue mayor rapidez en el acceso a datos
 y activada el modo offline, en el que podemos navegar por la información en cache 
 sin estar conectado a internet. Al recuperar la conexión se actualiza el cache. 
 Se basa en la Clase sistemaArchivo y sus métodos para manipular los archivos.
 */
function manejadorDeContenido(opcion,pagina){
	manejadorArchivo= new sistemaArchivo;
	if (manejadorArchivo.crearFS()){
		switch(pagina){
			case 'ofertas.html':
				if (manejadorArchivo.leerArchivo(pagina)){
					var contenido=manejadorArchivo.leerArchivo(pagina);
				}else if (obtenerRed()){
					consultarServidor(opcion,pagina);
				}
				
			break;
			/*
			 Todas las opciones
			 */
		}
	}
}


 
/* Botón terminar de inscripcion */
function terminar(){
alert("Inscrito satisfactoriamente");
sesion();
}

function DescargarCert(){
location.href="http://amoryamistadcnca.260mb.net/certificados/emprendimientocert.pdf";
}

function DescargarCons(){
location.href="http://amoryamistadcnca.260mb.net/certificados/emprendimientocons.pdf";
}
/* Crea un menu lateral */
function crearMenuLateral(){
	// Crear la barra lateral
	var barra = document.createElement("div");
	barra.setAttribute('id','barraLateral');
	// Añadir la barra lateral a la pagina
	document.body.appendChild(barra);
	if (window.localStorage.getItem('idioma')=='en'){
		conte='<a data-theme="a" class="opcion" href="ayudaEnglish.html" onclick="eliminarBarraLateral();"><img src="medios/ayuda.png" widht="50px"><label>&nbsp;HELP</label></a>';
		conte+='<a data-theme="a" class="opcion" href="#"onclick="eliminarBarraLateral();tomarFoto(1);"><img src="medios/reco.png"><label>&nbsp;FACE LOGIN</label></a>';
		conte+='<a data-theme="a" class="opcion" href="#"onclick="eliminarBarraLateral();configIdioma();"><img src="medios/idiomas.png"><label>&nbsp;LANGUAGE</label></a>';
		conte+='<a data-theme="a" class="opcion" href="acercaDe.html"onclick="eliminarBarraLateral();"><img src="medios/infor.png"><label>&nbsp;ABOUT...</label></a>';
		conte+='<a data-theme="a" class="opcion" href="#"onclick="eliminarBarraLateral();cerrarSesion();"><img src="medios/salir.png"><label>&nbsp;END SESSION</label></a>';
		conte+='<a data-theme="a" class="opcion" href="#" onclick="eliminarBarraLateral();"><img src="medios/ocultar.png"><label>&nbsp;HIDE</label></a>';

	}else{
		conte='<a data-theme="a" class="opcion" href="ayuda.html" onclick="eliminarBarraLateral(),ayuda();;"><img src="medios/ayuda.png" widht="50px"><label>&nbsp;AYUDA</label></a>';
		conte+='<a data-theme="a" class="opcion" href="#"onclick="eliminarBarraLateral();tomarFoto(1);"><img src="medios/reco.png"><label>&nbsp;LOGIN FACIAL</label></a>';
		conte+='<a data-theme="a" class="opcion" href="#"onclick="eliminarBarraLateral();configIdioma();"><img src="medios/idiomas.png"><label>&nbsp;IDIOMA</label></a>';
		conte+='<a data-theme="a" class="opcion" href="acercaDe.html"onclick="eliminarBarraLateral();"><img src="medios/infor.png"><label>&nbsp;ACERCA DE...</label></a>';
		conte+='<a data-theme="a" class="opcion" href="#"onclick="eliminarBarraLateral();cerrarSesion();"><img src="medios/salir.png"><label>&nbsp;CERRAR SESI&Oacute;N</label></a>';
		conte+='<a data-theme="a" class="opcion" href="#" onclick="eliminarBarraLateral();"><img src="medios/ocultar.png"><label>&nbsp;OCULTAR</label></a>';

	}
	barra.innerHTML=conte;
	var opc=$('a.opcion');
	opc.button();
}
/* Elimina la barra lateral */
function eliminarBarraLateral(){
	var barra = document.getElementById("barraLateral");
	barra.parentNode.removeChild(barra);
}
//Almacenamiento local tipo clave=valor
//Esta opción se ejecuta al configurar el idioma 
function configIdioma(){
	
	if (window.localStorage.getItem('idioma')==null){
		window.localStorage.setItem('idioma','en');
		window.localStorage.setItem("Oferta", "COURSES");
		window.localStorage.setItem("Certificado","CERTIFICATES");
		window.localStorage.setItem("Centros","INSTITUTES");
		window.localStorage.setItem("TipoDocumento","Document Type");
		window.localStorage.setItem("txtUsuario","Users");
		window.localStorage.setItem("txtPassword", "Password");
		window.localStorage.setItem("Entrar","LOGIN");
		window.localStorage.setItem("Todosformacion","All courses");
		window.localStorage.setItem("craTecnicas", "Technical courses");
		window.localStorage.setItem("Tecnologicas","Technological courses");
		window.localStorage.setItem("CursosCortos","Short term courses");
		window.localStorage.setItem("formacionVirtual","Virtual education");
		window.localStorage.setItem("formacionEmpresas","Education for companies");
		window.localStorage.setItem("buscarProgramas","Search Programs");
		window.localStorage.setItem("Cuidad","City");
		window.localStorage.setItem("Buscar","SEARCH");
		window.localStorage.setItem("certificadoDigital", "Digital  Certification");
		window.localStorage.setItem("nomCentro","Institute Name");
		window.localStorage.setItem("Regional","Regional");
		window.localStorage.setItem("inico" , "HOME");
		window.localStorage.setItem("Aprendiz","Students");
		window.localStorage.setItem("Inscripcion", "Registration");
		window.localStorage.setItem("Formacion" , "Formation");
		window.localStorage.setItem("Registro" , "Registre");
		window.localStorage.setItem("Actualizar" , "Update");
		window.localStorage.setItem("Contactos" , "Contacts");
		window.localStorage.setItem("nomContacto" , "Contact Name");
		window.localStorage.setItem("telContacto" , "Contact Phone");
		window.localStorage.setItem("Parentesco" , "Relationship");
		window.localStorage.setItem("empresaLabora" , "Company where works");
		window.localStorage.setItem("fechaExpedicion" , "Date of issue of document");
		window.localStorage.setItem("datosBasicos" , "BASIC DATA");
		window.localStorage.setItem("infoPersonal" , "Personal information");
		window.localStorage.setItem("docIdentidad" , "Identity Document");
		window.localStorage.setItem("paisExpedicion" , "Country of issue of document");
		window.localStorage.setItem("departExpedicion" , "Issue department");
		window.localStorage.setItem("muniExpedicion" , "Issue municipality");
		window.localStorage.setItem("Nombres" , "Names");
		window.localStorage.setItem("primerApellido", "First last name");
		window.localStorage.setItem("SegundoApellido" , "Second last name");
		window.localStorage.setItem("fechaNacimiento" , "Date of birth");
		window.localStorage.setItem("lugarResidencia" , "PLACE OF RESIDENCE");
		window.localStorage.setItem("Pais" , "Country");
		window.localStorage.setItem("Departamento" , "Department");
		window.localStorage.setItem("Municipio" , "Municipality");
		window.localStorage.setItem("Zona" , "Zone");
		window.localStorage.setItem("Barrio" , "Neighborhood");
		window.localStorage.setItem("Direccion" , "Address");
		window.localStorage.setItem("Tel1" , "Phone 1");
		window.localStorage.setItem("Tel2" , "Phone 2");
		window.localStorage.setItem("Tel3" , "Phone 3");
		window.localStorage.setItem("guardar" , "SAVE");
		window.localStorage.setItem("misCursos" , "MY COURSES");
		window.localStorage.setItem("acercaDe" , "ABOUT...");
		window.localStorage.setItem("hojaVida" , "CURRICULUM VITAE");
	}
	if (window.localStorage.getItem('idioma')=='en'){
		if (confirm("Su idioma actual es: Ingles.\n¿Desea cambiarlo a Español?")) {
			window.localStorage.setItem('idioma','es');
			location.reload();
		}
	}else{
		if (confirm("Su idioma actual es: Español.\n¿Desea cambiarlo Ingles?")) {
			window.localStorage.setItem('idioma','en');
			location.reload();
		}
	}
}

function verificarIdioma(pag){
	//Verifica si la opción Idioma es: EN
	if (window.localStorage.getItem('idioma')=='en'){
		switch (pag){
			case 'pagInicio':
			    valor = window.localStorage.getItem("TipoDocumento");
				$("option#tipo").html(valor);
				valor = window.localStorage.getItem("txtUsuario");
				document.getElementById("txtUsuario").placeholder=valor
				valor = window.localStorage.getItem("txtPassword");
				document.getElementById("txtPassword").placeholder=valor
				valor = window.localStorage.getItem("Entrar");
				$("a.btnAccion").html(valor);
				valor = window.localStorage.getItem("Oferta");
				$("a#btnoferta").html(valor);
				valor = window.localStorage.getItem("Certificado");
				$("a#btncertificado").html(valor);
				valor = window.localStorage.getItem("Centros");
				$("a#btncentros").html(valor);
				valor = window.localStorage.getItem("Registro");
				$("a#registrarse").html(valor);
			break;
			case 'pagOferta':
				valor = window.localStorage.getItem("Oferta");
				$("#titulo").html(valor);
				valor = window.localStorage.getItem("buscarProgramas");
				document.getElementById("txtBuscar").placeholder=valor
				valor = window.localStorage.getItem("Buscar");
				$("#btnEnviar").html(valor);
			break;
			case 'pagCertificado':
				valor = window.localStorage.getItem("Certificado");
				$("#titulo").html(valor);
				valor = window.localStorage.getItem("docIdentidad");
				document.getElementById("txtIdUsu").placeholder=valor
				valor = window.localStorage.getItem("Buscar");
				$("#buscar").html(valor);
				
			break;
			case 'pagCentro':
				valor = window.localStorage.getItem("Centros");
				$("#titulo").html(valor);
			break;
			case 'pagHome':
				valor = window.localStorage.getItem("misCursos");
				$("a#btnCursos").html(valor);
				valor = window.localStorage.getItem("Oferta");
				$("a#btnoferta").html(valor);
				valor = window.localStorage.getItem("Certificado");
				$("a#btncertificado").html(valor);
				valor = window.localStorage.getItem("Centros");
				$("a#btncentros").html(valor);
				valor = window.localStorage.getItem("Registro");
				valor=valor.toUpperCase();
				$("a#btnRegistro").html(valor);
				valor = window.localStorage.getItem("hojaVida");
				$("a#btnHoja").html(valor);
			break;
			case 'pagActualizacion':
				valor = window.localStorage.getItem("TipoDocumento");
				$("option#tipo").html(valor);
				valor = window.localStorage.getItem("guardar");
				$("a#guardar").html(valor);
				
			break;
			case 'acercaDe':
				valor = window.localStorage.getItem("acercaDe");
				$("#acerca").html(valor);
			break;
		}
	}
}


/*cambiar color al collapsible*/
function cambiarColor(){
	var negro=$('div.col');
	negro.style.background="blue";
}
/* MAPAS */
 
    function cargarCombo(argument) {
      $.ajax({
        url: 'http://amoryamistadcnca.260mb.net/centrosform.php',
        dataType: 'json',
        async:false,
        success: function(data, textStatus, xhr){
         if (data !== null)
         {
            for (var i=0;i<data.length;i++)
            {
               $("#centros").append('<option value="'+data[i].latitud+','+data[i].longitud+'">'+data[i].nombre+'</option>');
            }
         }
         else
         {
            alert("No se pudo conectar al servidor");
         }
        },
        error:function(xhr, textStatus, errorThrown){
          alert("Error: "+errorThrown);
          alert( xhr.responseText);
        }
      });
    }
    function cargarMapa() {
         // Defina sus ubicaciones: el contenido HTML de la ventana de información, latitud, longitud
    var locations = [];
      $.ajax({
		url: 'http://amoryamistadcnca.260mb.net/centrosform.php',
        dataType: 'json',
        async:false,
        success: function(data, textStatus, xhr){
         if (data !== null)
         {
            for (var i=0;i<data.length;i++)
            {
               locations[i] = ['<h4>'+data[i].nombre+'</h4>'+data[i].direccion+"<br>Regional "+data[i].regional, data[i].latitud, data[i].longitud];
               // $("#centros").append('<option value="'+data[i].latitud+','+data[i].longitud+'">'+data[i].nombre+'</option>');
            }
         }
         else
         {
            alert("No se pudo conectar al servidor");
         }
        },
        error:function(xhr, textStatus, errorThrown){
          alert("Error: "+errorThrown);
          alert( xhr.responseText);
        }
      });
    
    // Setup the different icons and shadows
    var iconURLPrefix = 'http://maps.google.com/mapfiles/ms/icons/';
    
    var icons = [
      iconURLPrefix + 'red-dot.png',
      iconURLPrefix + 'green-dot.png',
      iconURLPrefix + 'blue-dot.png',
      iconURLPrefix + 'orange-dot.png',
      iconURLPrefix + 'purple-dot.png',
      iconURLPrefix + 'pink-dot.png',      
      iconURLPrefix + 'yellow-dot.png'
    ]
    var icons_length = icons.length;
    
    
    var shadow = {
      anchor: new google.maps.Point(15,33),
      url: iconURLPrefix + 'msmarker.shadow.png'
    };

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: new google.maps.LatLng(-37.92, 151.25),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      streetViewControl: false,
      panControl: false,
      zoomControlOptions: {
         position: google.maps.ControlPosition.LEFT_BOTTOM
      }
    });

    var infowindow = new google.maps.InfoWindow({
      maxWidth: 160
    });

    var marker;
    var markers = new Array();
    
    var iconCounter = 0;
    
    // Add the markers and infowindows to the map
    for (var i = 0; i < locations.length; i++) {  
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map,
        icon : icons[iconCounter],
        shadow: shadow
      });

      markers.push(marker);

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(locations[i][0]);
          infowindow.open(map, marker);
        }
      })(marker, i));
      
      iconCounter++;
      // We only have a limited number of possible icon colors, so we may have to restart the counter
      if(iconCounter >= icons_length){
         iconCounter = 0;
      }
    }

    function AutoCenter() {
      //  Create a new viewpoint bound
      var bounds = new google.maps.LatLngBounds();
      //  Go through each...
      $.each(markers, function (index, marker) {
        bounds.extend(marker.position);
      });
      //  Fit these bounds to the map
      map.fitBounds(bounds);
    }
    AutoCenter();
    }


//Funciones LOGIN FACIAL

var accionCamara=0;
function tomarFoto(accion) {
	//Acciones. 1:Config foto. 2:Autenticando
	if (window.localStorage.getItem('keyLogin')==null && accion==2){
		accion=1; //Configurar antes de usar login facil.
	}
	accionCamara=accion;
	navigator.camera.getPicture(CameraOK,CameraError,
		{quality: 50,destinationType: Camera.DestinationType.FILE_URI });
}
	
function CameraOK(rutaImagen) {
	var foto=document.getElementById('foto');
	capturarImagen(rutaImagen,accionCamara);
	foto.src = rutaImagen;
}
function CameraError(e) {
	navigator.notification.alert("onCameraError: " + e);
}
function capturarImagen(rutaImagen){
	var foto = document.getElementById("foto");
	//recojemos el canvas poniendo la id del canvas html5 para relacionarlo
	 var canvas = document.getElementById("facial");
	  //Cojemos la 2D para dibujar en él
	 var context = canvas.getContext("2d");
	  //creamos la nueva imagen 
	  var img = new Image(100,100);
	  //le decimos la ruta de la imagen.
	 img.src = foto.src;
	 //pasamos la imagen al 2d del canvas y se dibujará
	 //en 0 0 podemos poner las cordenadas de donde empezar a dibujar la imagen

		context.drawImage(img, 0, 0,100,100);
		analizarImagen();
}

function analizarImagen(){
	var suma=0;
	//seleccionamos el canvas 
	canvas = document.getElementById("facial");
	dibujo = canvas.getContext("2d");
	// Cogemos el ancho y alto del canvas
	/*width = parseInt(canvas.getAttribute("width"));
	height = parseInt(canvas.getAttribute("height"));*/

	//creamos un pixel array
	imageData = dibujo.getImageData(0,0,100,100);
	
	var acumula=0;
	var j=1;
	var contador=1;
	//for (i in imageData.data){
	for (i=2550; i<=40000;i++){
		if (j<4){
			acumula +=parseInt(imageData.data[i]);
			j++;
		}else{
			suma+=acumula/3;
			acumula=0;
			j=1;
		}
		if (contador<2000){
			contador++;
		}else{
			i+=2000;
			contador=1;
		}
	}
	
	dibujo.putImageData(imageData, 0, 0);
	canvas.innerHTML=dibujo.getImageData;
	switch (accionCamara){
		case 1:
			window.localStorage.setItem("keyLogin", parseInt(suma));
			navigator.notification.alert("Captura Satisfactoria: " +parseInt(suma));
			break;
		case 2:
			valorLogin=window.localStorage.getItem("keyLogin");
			if (parseInt(valorLogin)>parseInt(suma)){
				resul=parseInt(suma)/parseInt(valorLogin);
				resul*=100;
			}else{
				resul=parseInt(valorLogin)/parseInt(suma);
				resul*=100;
			}
			alert(resul);
			if (parseInt(resul)>=80){
				//Guarda el usuario autenticado
				window.localStorage.setItem("login", 1143);
				location.href='home.html';
			}else{
				alert('Usuario no autenticado:'+ resul)
			}
			break;
		
	}
}
