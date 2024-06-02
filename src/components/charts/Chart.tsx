import { LineChart } from "@mui/x-charts";

type Props = {
  days: any [],
  values: any []
}


const Chart: React.FC<Props> = (props) => {
    
  return <LineChart
    xAxis={[{ data:  props.days}]}
    series={[
      {
        data: props.values,
      },
    ]}
    width={500}
    height={300}
  />


}

export default Chart;

