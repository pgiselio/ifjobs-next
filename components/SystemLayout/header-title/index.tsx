import styled from "./styles.module.scss"

export function HeaderTitle({children} : any){
    return(
        <div className={styled["header-title"] + " header-title"}>
            <div className={styled["container"] + " header-title-container"}>
                {children}
            </div>
        </div> 
    );
}