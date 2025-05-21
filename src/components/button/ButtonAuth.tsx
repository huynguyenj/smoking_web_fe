interface ButtonAuthProp extends React.ButtonHTMLAttributes<HTMLButtonElement>{
      type:'button'| 'submit'|'button',
      backgroundColor:string, 
      content:string, 
      contentColor: string
}
export default function ButtonAuth({content, backgroundColor, contentColor, type,...restButtonMethod}:ButtonAuthProp) {
  return (
    <button className={`${content} ${backgroundColor} ${contentColor} rounded-2xl`} type={type} {...restButtonMethod}>{content}</button>
  )
}
