import React,{useState} from 'react';
import {FaArrowCircleUp} from 'react-icons/fa';
// import {Button} from './Styles';

const ScrollButton=()=>{
    const [visible,setVisible] =useState(false)

    const toggleVisible=()=>{
        const scrolled= document.documentElement.scrollTop;
        if(scrolled>300){
            setVisible(true)
        }
        else if(scrolled<=300){
            setVisible(false)
        }
    };
    
    const scrollToTop=()=>{
        window.scrollTo({
            top:0,
            behavior:'smooth'
            
        });
    };
    window.addEventListener('scroll',toggleVisible);

    return(
        <button 
          className='  
          fixed bottom-5 right-5 font-size-3rem w-10  h-10 z-1 cursor-pointer  duration-200 hover:bg-blue-600 hover:text-blue-100 rounded-full text-blue-800 text-md font-bold'
          style={{display:visible?'inline' :'none'}}>
            <FaArrowCircleUp onClick={scrollToTop}
            style={{display:visible?'inline' :'none'}} className=' sm:text-2xl '/>
        </button>
    );
}
export default ScrollButton;