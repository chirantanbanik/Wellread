import React ,{useState,useEffect} from 'react';
import pre from '../assets/preloader.json';
import Lottie from 'lottie-react';
import App from '../App';
function Preloader() {
    const [loading,setLoading]=useState(false);
    useEffect(()=>{
        setLoading(true);
        setTimeout(() =>{
            setLoading(false)
        },2000)
    },[])
return (
     
            loading ?
            <div className='flex justify-center items-center'>
                <div> 
                    <Lottie className="relative top-[8rem]" animationData={pre}/> 
                </div>
            </div>
            
             :
            //Rest Code
                <App/>
          
               

  );
}
export default Preloader;