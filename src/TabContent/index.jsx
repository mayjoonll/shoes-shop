function TabContent({tabState}){
  return(
    [
      <div>내용 1</div>,
      <div>내용 2</div>,
      <div>내용 3</div>,
    ][tabState]
  )
}
export default TabContent;