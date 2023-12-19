

function Button(props: any){
    return (
        <button className={props.classes} id={props.id}>
            {props.text}
        </button>
    )
}

export default Button;