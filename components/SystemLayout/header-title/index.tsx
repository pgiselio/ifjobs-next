import styled from "./styles.module.scss"

export function HeaderTitle({children} : any){
    return(
        <div className={styled["header-title"]}>
            <div className={styled["container"]}>
                {children}
            </div>
        </div> 
    );
}