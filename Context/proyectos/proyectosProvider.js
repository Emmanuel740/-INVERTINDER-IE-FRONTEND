import React, {createContext,useState} from 'react';

export default ({ children }) =>{
    const [proyectos,setProyectos] = useState({});
    return (            
            <ProyectosContext.Provider value={[proyectos,setProyectos]}>
                {children}
            </ProyectosContext.Provider>  
    );
}

export const ProyectosContext = createContext();