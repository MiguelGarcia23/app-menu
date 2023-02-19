import Chart from 'chart.js/auto';
import { Bar } from "react-chartjs-2";


const ChartHomeDash = ({ chartData, title }) => {

    return (

        <div className='w-100 py-4 px-4 bg-transparent border border-warning border-3 mx-auto mb-4' style={{ maxWidth: '800px' }}>

            <h2 className='fs-3 text-center m-0 mb-2'>{ title }</h2>

            <Bar
                data={ chartData }
                options={{
                    plugins: {
                        title: {
                            display: false
                        },
                        legend: {
                            display: false
                        }
                    }
                }}
            />

        </div>

    )
}

export default ChartHomeDash;