export const handleResize = ({width, setWidth}) => {
    const { innerWidth } = window

    if (width !== innerWidth) {
        setWidth(innerWidth)
    }
}
