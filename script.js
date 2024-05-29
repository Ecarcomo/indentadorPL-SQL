 // Variables para controlar el nivel de indentación
    let indentLevel = 0;
    const indentSize = 8; // Espacios por nivel de indentación
    const indentChar = ' ';

// Variables de procedimiento
    let  key = '';
    let  lastKey = '';

//elementos de manipulacion
    const input = document.getElementById('input-sql');
    const output = document.getElementById('output-sql');
    const IN_size = document.getElementById('size-indent');
    const IN_indStruc = document.getElementById('indentarEstructura');
    const IN_indQuery = document.getElementById('indentarQuerys');

//--------FNs de ejecucion directa----------
 function reset(){
            document.querySelectorAll('input').forEach((x)=> x.checked=false);
            document.querySelectorAll('[name="size-indent"]')[0].value=8;
}

function indentarSQL() {

    // Divide la entrada por líneas
    const lines = input.value.split('\n');
    
    if(IN_indStruc.checked) indentarEstructura(lines);
    // if(IN_indQuery.checked) indentarQuerys(lines);
    
}


//-------FNs de Operaciones------


/*
Objetivo: Indentar Estructura de procedimiento de PL/SQL
*/
function indentarEstructura(lines){
    // Palabras clave para detectar cambio de indentación
    const keyWords = ['BEGIN', 'IF','ELSE','LOOP','CASE', 'DECLARE','IS','END', 'END IF', 'END LOOP', 'END CASE'];
    
    // Almacena las líneas procesadas
    const indentedLines = lines.map((line,index) => {
        // Limpia la línea y quita los espacios innecesarios
        line = line.trim();

        // Verifica si la línea contiene una palabra clave para disminuir la indentación
        if (key = keyWords.find(keyword => line.toUpperCase().startsWith(keyword))) {

            //En cada CASE del switch configuramos el comportamiento de la indentacion segun la  keyWord
            switch(key){
                case 'DECLARE':
                        line = lineaIndentada(line);
                        indentLevel += 1;
                    break; 
                case 'IS':
                        line = lineaIndentada(line);
                        indentLevel += 1;
                    break;  
                case 'BEGIN':
                        if (lastKey == 'DECLARE' || lastKey == 'IS' ){
                            indentLevel -= 1;
                        }
                        line = lineaIndentada(line);
                        indentLevel += 1;
                    break;
                case 'END':
                        indentLevel -= 1;
                        line = lineaIndentada(line);
                    break;
                case 'IF':
                        line = lineaIndentada(line);
                        indentLevel += 1;
                    break; 
                case 'ELSE':
                        indentLevel -= 1;
                        line = lineaIndentada(line);
                        indentLevel += 1;
                    break;            
            }
        }
        else    line = lineaIndentada(line);
        
        return line;
       
    });

    // Une las líneas indentadas y las coloca en el textarea de salida
    output.value = indentedLines.join('\n');

    // reinicio nivel de indentacion
    indentLevel = 0;
}


/*
Objetivo: Indentar sentencias SQL sel tipo SELECT,UPDATE,DELETE,MERGE,INSERT
*/
function indentarQuerys(lines){
}



//-------FNs Reutulisables---------
function lineaIndentada(line){
    if(indentLevel<0)   indentLevel=0;
    if(key)             lastKey = key;
    return indentChar.repeat(indentLevel * indentSize) + line;
}