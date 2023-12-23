
import Button from "./Button";

function Buttons(props: any){
    return (
        <div id="buttons">
            {
                props.buttons.map((btnIndex: any, index: number) => {
                    return <Button className={`btn ${btnIndex.className}`}
                        id={btnIndex.id ?? `btn${index + 1}`}
                        key={index}
                        onClick={ (e: any) => { props.onClick(e) } }
                    >
                        {btnIndex.text}
                    </Button>
                })
            }
        </div>
    )
}


export default Buttons;