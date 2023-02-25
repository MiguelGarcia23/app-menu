import React from 'react';

import authenticatedWidth from './AuthenticatedWidth';

const authenticatedRouteClient = ( Component ) => {

    class AuthenticatedRouteClient extends React.Component {

        state = {
            loading: true,
        };

        componentDidMount() {

            let client = JSON.parse( localStorage.getItem( 'cliente' ) );
            let nameClient = client ? client.nombre : undefined;

            if ( nameClient ) {
                this.setState({ loading: false });
            } else {
                window.history.back(); 
            }

        }

        render() {
            const { loading } = this.state;

            if ( loading ) {
                return <div />;
            }

            return <Component {...this.props} />;
        }
    }

    return authenticatedWidth( AuthenticatedRouteClient );
};

export default authenticatedRouteClient;