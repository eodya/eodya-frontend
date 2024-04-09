export function GridLayout({children,index} : {children : React.ReactNode,index : number}){
    return (
        <div className={`p-4 relative ${index !== 0 ? "after:h-[1px] after:w-[calc(328/360*100%)] after:absolute after:top-0 after:left-1/2 after:-translate-x-1/2 after:block after:bg-gray-100" : ""}`}>
            {children}
        </div>
    )
}