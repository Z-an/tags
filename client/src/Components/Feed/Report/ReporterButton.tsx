import React, {useState, Fragment} from 'react'
import Button from '@material-ui/core/Button'

import '../../../Styles/Reporter.css'
import { useMutation } from 'react-apollo-hooks'
import { REPORT } from '../../../Mutations/index'
import { connect } from 'react-redux'

const mapStateToProps = (state,ownProps) => {
    return { openModal: state.openModal, tagID: ownProps.tagID, tag: state.tags[ownProps.tagID].content }
}

export const ConnectedReporterButton: React.FC<any> = (props) => {
    const[open,toggleOpen] = useState(false)
    const[report,setReport] = useState('')

    const sendReport = useMutation(REPORT, {variables: { userId: "61usaCJd3YBqpmFOdbS8"
                                                        , tagId: props.tagID
                                                        , reportId: report } })
    
    const clickhandler = (report) => {
        setReport(report)
        toggleOpen(false)
        sendReport()
    }

    const toggler = () => {
        toggleOpen(true)
        console.log('hello')
    }


    return (
        <Fragment>
            <div className='report-button'>
                <Button onClick={() => props.toggleModal({tagID: props.tagID, type: 'report'})}>REPORT</Button>
            </div>
        </Fragment>
    )
}

const ReporterButton = connect(mapStateToProps)(ConnectedReporterButton)

export default ReporterButton