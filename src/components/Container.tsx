
function Container(props: any){
    return (
        <div id={props.id}>
            {props.children}
        </div>
    )
}

export default Container;