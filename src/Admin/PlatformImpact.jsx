import {  Chart as ChartJS,ArcElement,Tooltip,Legend} from "chart.js"
import { Pie } from "react-chartjs-2"

ChartJS.register(ArcElement, Tooltip, Legend)

function PlatformImpactPie({
    completed,
    pending,
    verifiedNgos
}) {
    const data = {
        labels: [
            "Completed Donations",
            "Pending Donations",
            "Verified NGOs"
        ],
        datasets: [
            {
                data: [completed, pending, verifiedNgos],
                backgroundColor: [
                    "#22c55e",
                    "#facc15", 
                    "#3b82f6"  
                ],
                borderWidth: 1
            }
        ]
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top"
            }
        }
    }

    return <Pie data={data} options={options} />
}

export default PlatformImpactPie
