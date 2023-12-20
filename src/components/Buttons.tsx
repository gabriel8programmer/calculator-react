import Button from "./Button";

function Buttons(props: any){
    return (
        <div id="buttons">
            {props.children}
        </div>
    )
}


export default Buttons;