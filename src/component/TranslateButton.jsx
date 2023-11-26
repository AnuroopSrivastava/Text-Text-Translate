import React, { useEffect } from 'react'

const TranslateButton = ({type, id, className, ripple, onClick, style, children}) => {
    useEffect(() => {
        const btnRipple = document.querySelectorAll(".btn-ripple");
        btnRipple.forEach((btn) => {
            btn.oneClick = ({pageX, pageY, currentTarget}) => {
                let x = ((pageX - currentTarget.offsetLeft) * 100) / currentTarget.offsetWidth;
                let y = ((pageY - currentTarget.offsetTop) * 100) / currentTarget.offsetHeight;
                const ripple = document.createElement("span");
                const rippleColor = btn.dataset.ripple || "#212129"
                ripple.classList.add("ripple-effect");
                ripple.style.background = rippleColor;

                btn.appendChild(ripple);
                ripple.style.left = x + "%";
                ripple.styl.top = y + "%";
                setTimeout(() => {
                    ripple.remove()
                },1000);
            };
        });
    },[]);
  return (
    <button type={type ? type : "button"} 
    id={id} 
    className={`btn btn-ripple ${className ? className : ""}`}
    data-ripple={ripple} 
    onClick={onClick} 
    style={style} 
    children={children}>
    </button>
  )
}

export default TranslateButton