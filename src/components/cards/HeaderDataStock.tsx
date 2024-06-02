import { Card, CardContent, Typography } from "@mui/material"

type Props = {
    identifier: string;
    currentPrice: any;
    priceChange: any;
    percentChange: any;
    lastUpdatedTimestamp: string

}

const HeaderDataStock: React.FC<Props> = (props) => {
    
    
    return <Card sx={{ minWidth: 275 }}>
    <CardContent> 
      <Typography fontSize={15} ml={7}>
        Identifier: {props.identifier}
      </Typography>
      <Typography fontSize={15}ml={7}>
        Current Price: {props.currentPrice}
      </Typography>
      <Typography fontSize={15}ml={7}>
        Price Change: {props.priceChange}
      </Typography>
      <Typography fontSize={15} ml={7}>
        Percent Change: {props.percentChange}%
      </Typography>
      <Typography fontSize={15} ml={7}>
        Last Updated Timestamp: {props.lastUpdatedTimestamp}
      </Typography>
        </CardContent>
    </Card>


}

export default HeaderDataStock;