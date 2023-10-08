import { Circles } from 'react-loader-spinner'

const CustomLoader = _ => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
            <Circles
                height="80"
                width="80"
                color="#007acc"
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    )
}

export default CustomLoader;
