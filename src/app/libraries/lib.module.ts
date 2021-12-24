export class Lib{
    
    public static getFormData(e , file = true){

        var data = {};
        if(file){
            data['file'] = [];
        }
        
        for(var i = 0; i < e.target.elements.length; i++){

            if( e.target.elements[i].type == 'checkbox' ){
                
                if( e.target.elements[i].checked ){
                    data[e.target.elements[i].name] = 1;
                }
            }else{
                
            if(e.target.elements[i].type == 'file'){
                
                if(e.target.elements[i].value != ''){
                    var selected_f = e.target.elements[i].files[0];
                    selected_f['input_name'] =e.target.elements[i].name;
                    if(file){
                        data['file'].push(selected_f);
                    }
                }
                
            }else{

                
                if(data.hasOwnProperty(e.target.elements[i].name)){
                    if(Lib.isJson(data[e.target.elements[i].name])){
                        data[e.target.elements[i].name] =  JSON.parse(data[e.target.elements[i].name]);
                    }
                    
                    if(!Array.isArray(data[e.target.elements[i].name])){
                        let vv = data[e.target.elements[i].name];
                        data[e.target.elements[i].name] = [];
                        data[e.target.elements[i].name].push(vv);
                    }
 
                    data[e.target.elements[i].name].push(e.target.elements[i].value);
                }else{
                    data[e.target.elements[i].name] = e.target.elements[i].value;
                } 
                
                
                if(Array.isArray(data[e.target.elements[i].name])){
                    data[e.target.elements[i].name] = JSON.stringify(data[e.target.elements[i].name]);
                }

            }
                
            }

        }

        return data;
    }

    public static isJson(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }


}