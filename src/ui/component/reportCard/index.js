import {ReportTemplate} from "./reportTemplate"
import {getAllProps} from "./props"

export const ReportCard = ({dataSource}) => {
    const allProps = getAllProps(dataSource)
    return <ReportTemplate allProps={allProps} />
}
