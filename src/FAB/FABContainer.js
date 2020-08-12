import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actionCreators from './actionCreators';

import FAB from './FAB';

const mapStateToProps =state =>({
    calendarSystem: state.appProperties.calendarSystem,
    firstDayOfWeek: state.appProperties.firstDayOfWeek,
    FABRaised: state.appUI.FABRaised,
});
const mapDispathToProps =dispath =>bindActionCreators(actionCreators,dispath);

const FABContainer =connect(mapStateToProps, mapDispathToProps) (FAB);

export default FABContainer;