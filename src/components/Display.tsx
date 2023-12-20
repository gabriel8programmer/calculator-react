

function Display(props: any){
    return (
        <div id="display">
            <span id="accumulator">{props.accumulator} {props.currentOperator}</span>
            <span id="expression">{props.expression}</span>
        </div>
    )
}

export default Display;