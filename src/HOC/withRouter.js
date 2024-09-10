import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';

const withRouter = (WrappedComponent) => {
    return (props) => {
        return (
            <Router>
                <WrappedComponent {...props} />
            </Router>
        );
    };
}

export default withRouter;