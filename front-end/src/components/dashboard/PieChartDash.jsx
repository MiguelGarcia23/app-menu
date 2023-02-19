import Chart from 'chart.js/auto';
import { Pie } from "react-chartjs-2";


const ChartHomeDash = ({ chartData, title }) => {

    return (

        <div className='py-4 px-4 bg-transparent border border-warning border-3 mx-auto mb-4' style={{ width: '400px', height:'280px' }}>

            {/* <h2 className='text-center m-0 mb-2' style={{ fontSize: '1.25rem' }}>{ title }</h2> */}

            <Pie
                data={ chartData }
                options={{
                    plugins: {
                        title: {
                            display: false
                        }
                    }
                }}
                className='mx-auto'
            />

        </div>

    )
}

export default ChartHomeDash;