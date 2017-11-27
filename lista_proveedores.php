<!DOCTYPE html>
 <html lang="es">
    <head>
	 <link rel="stylesheet" href="css/estilo.css">
    <link href='http://fonts.googleapis.com/css?family=Nunito:400,300' rel='stylesheet' type='text/css'>
	<meta charset="iso-8859-1">
	<title>Proveedores</title>
	</head>
	 <body background="imagenes/images.jpg">
       <form method="get" name="form2" id="form2">
       
          Introduzca el nombre del proveedor a buscar
     
            <input name="nombres" type="text" id="nombres" size="" autocomplete="off" />
			
            <button type="submit" name="consultar" id="consultar">Consultar</button><br><br>
            <a href="lista_proveedores.php">Nueva Busqueda /</a> <a href="mostrar_proveedores.php"> Mostrar todos /</a> <a href="proveedores.php">Agregar Clientes</a>
          
       
    </form>
	<a href="index.html">Back</a>
	<br>
<?php 
	if(isset($_GET['consultar']))
	{
		if($_GET['nombres'] == ""){
		//echo "Debe Introducir el N&uacute;mero de Control para Realizar la B&uacute;squeda";
		?>
<script type="text/javascript">
			alert("Debe introducir  nombre o correo para realizar la búsqueda");	
		</script>
<?php
		} else
		{
		
		include('conexion.php');
	
       
		$nom = $_GET['nombres'];
		
		$sql="Select * from proveedores where nombre like '%$nom%' OR Direccion like '%$nom%' OR telefono like '%$nom%'";
		 
		$consulta=mysqli_query($conn,$sql);
		$nf=mysqli_num_rows($consulta);
		if($nf!=0)		
		{?>
<table border="1">
  <tr >
    <th>Id</th>
    <th>telefono</th>
    <th>nombre</th>
    <th>Eliminar</th>
	<th>Imprimir</th>
  </tr>
  <?php 	for ($i=0;$i<$nf;$i++)
        {
            $proveedores=mysqli_fetch_array($consulta);
            ?>
  <tr> 
	<td><?php echo $proveedores['id_proveedores'];?></td>	
	<td><?php echo $proveedores['telefono'];?></td>	
    <td><?php echo $proveedores['nombre'];?>   <?php echo $proveedores['Correo'];?></td>
    
	
<td><a href="proveedores_actualizar.php?id_proveedores=<?php echo $proveedores['id_proveedores']?>&telefono=<?php echo $proveedores['telefono']?>&nombre=<? echo $proveedores['nombre']?>&correo=<?php echo $proveedores['Correo']?>">Modificar</a></td>
	
	
 <td><a href="eliminar_proveedores.php?id_proveedores=<?php echo $proveedores['id_proveedores']?>">Eliminar</a></td>
 <td><a href="reporte_proveedores.php?id_proveedores=<?php echo $proveedores['id_proveedores']?>">Imprimir</a></td>
  </tr>
  <?php 		
         } // for de consulta general
        mysqli_close($conn)?>
</table>
<p>
  <?php }// if de nf	
		else{
			//echo "No Existe en la Base de Datos";?>
  <script type="text/javascript">
			alert("No existe en la base de datos");
  </script>
  
  <?php 
			}
      	 }// else
	}// si existe consultar 
	?>
  </tr>
  </table>
   </body>
<html>