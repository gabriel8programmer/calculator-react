
function Button(props: any){
    return (
        <button 
            className={props.className}
            id={props.id}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    )
}

export default Button;