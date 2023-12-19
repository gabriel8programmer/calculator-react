import Button from "./Button";

function Buttons(props: any){
    return (
        <div id="buttons">
            {
                props.buttons.map((button: any, index: number) => {
                    return <Button 
                        classes={`btn btn-${button.type}`}
                        id={button.id ?? `btn${index+1}`}
                        text={button.text}
                    />
                })
            }
        </div>
    )
}

export default Buttons;