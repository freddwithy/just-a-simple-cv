interface ContainerProps {
    children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({
     children 
}) => {
  return (
    <div className="mx-auto">{children}</div>
  )
}

export default Container;